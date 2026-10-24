"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exhibit, VideoSource } from "@/data/types";
import { catalogNumber } from "@/data/exhibits";

type Side = "human" | "avian";
type AudioMode = "muted" | "human" | "avian";

type Mode =
  /** Both clips are self-hosted files we control: shared playback is real. */
  | "shared"
  /** At least one clip is a third-party embed: two independent players. */
  | "independent"
  /** At least one clip is still being selected. */
  | "draft";

function modeFor(a: VideoSource, b: VideoSource): Mode {
  if (a.kind === "placeholder" || b.kind === "placeholder") return "draft";
  if (a.kind === "selfHosted" && b.kind === "selfHosted") return "shared";
  return "independent";
}

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function embedUrl(v: VideoSource): string | undefined {
  if (!v.url) return undefined;
  if (v.kind === "youtube") {
    const p = new URLSearchParams({ rel: "0", modestbranding: "1", cc_load_policy: "1" });
    if (v.startAtSeconds) p.set("start", String(Math.floor(v.startAtSeconds)));
    if (v.endAtSeconds) p.set("end", String(Math.floor(v.endAtSeconds)));
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.url)}?${p}`;
  }
  if (v.kind === "vimeo") {
    const t = v.startAtSeconds ? `#t=${Math.floor(v.startAtSeconds)}s` : "";
    return `https://player.vimeo.com/video/${encodeURIComponent(v.url)}?dnt=1${t}`;
  }
  return undefined;
}

function DraftMedia({ side, accession, video, compact }: { side: Side; accession: string; video: VideoSource; compact?: boolean }) {
  return (
    <div className="draft-media" role="img" aria-label={`${side === "human" ? "Human" : "Avian"} footage not yet on file: ${video.sourceTitle}`}>
      <span className="draft-corner tl">{accession}</span>
      <span className="draft-corner br">Draft · No media</span>
      <div className="draft-inner">
        <svg className="draft-glyph" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="5" y="11" width="38" height="26" rx="1" />
          <path d="M5 16h38M5 32h38" />
          {[9, 15, 21, 27, 33, 39].map((x) => (
            <g key={x}>
              <rect x={x - 1} y="12.5" width="2" height="2" />
              <rect x={x - 1} y="33.5" width="2" height="2" />
            </g>
          ))}
          <path d="M14 20l20 8M34 20l-20 8" strokeDasharray="2 2" />
        </svg>
        <p className="eyebrow">Awaiting field observation</p>
        <p className="draft-title">Footage pending</p>
        {!compact && <p className="draft-note">{video.licenseNotes ?? video.sourceTitle}</p>}
      </div>
    </div>
  );
}

type PanelProps = {
  side: Side;
  title: string;
  caption: string;
  accession: string;
  video: VideoSource;
  muted: boolean;
  compact?: boolean;
  videoRef?: (el: HTMLVideoElement | null) => void;
};

function SpecimenPanel({ side, title, caption, accession, video, muted, compact, videoRef }: PanelProps) {
  const src = embedUrl(video);
  return (
    <figure className={`specimen-panel ${side}`} style={{ margin: 0 }}>
      <div className="panel-head">
        <span className="panel-kind">{side === "human" ? "Human" : "Avian"}</span>
        <span className="eyebrow">{title}</span>
      </div>
      <div className="media-frame">
        {video.kind === "placeholder" && <DraftMedia side={side} accession={accession} video={video} compact={compact} />}
        {video.kind === "selfHosted" && video.url && (
          <video
            ref={videoRef}
            src={video.url}
            poster={video.posterUrl}
            muted={muted}
            playsInline
            preload="metadata"
            controls={false}
            aria-label={`${side === "human" ? "Human" : "Avian"} specimen: ${video.sourceTitle}`}
          >
            {video.captionsUrl && <track kind="captions" src={video.captionsUrl} srcLang="en" label="English" default />}
          </video>
        )}
        {(video.kind === "youtube" || video.kind === "vimeo") && src && (
          <iframe
            src={src}
            title={`${side === "human" ? "Human" : "Avian"} specimen: ${video.sourceTitle}`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
      </div>
      {!compact && <figcaption className="panel-caption">{caption}</figcaption>}
    </figure>
  );
}

export function VideoDiptych({ exhibit, compact = false }: { exhibit: Exhibit; compact?: boolean }) {
  const hv = exhibit.human.video;
  const bv = exhibit.bird.video;
  const mode = modeFor(hv, bv);
  const acc = catalogNumber(exhibit.number);

  const humanEl = useRef<HTMLVideoElement | null>(null);
  const birdEl = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<AudioMode>("muted");
  const [loop, setLoop] = useState(true);
  const [t, setT] = useState(0);
  const [duration, setDuration] = useState(0);

  const pairs = useCallback(
    () =>
      [
        [humanEl.current, hv],
        [birdEl.current, bv],
      ] as const,
    [hv, bv],
  );

  const segLen = useCallback((el: HTMLVideoElement, v: VideoSource) => {
    const start = v.startAtSeconds ?? 0;
    const end = v.endAtSeconds ?? el.duration;
    return Math.max(0, end - start);
  }, []);

  // Shared timeline length is the shorter of the two configured segments.
  const refreshDuration = useCallback(() => {
    const lens = pairs()
      .filter(([el]) => el && Number.isFinite(el.duration))
      .map(([el, v]) => segLen(el!, v));
    if (lens.length === 2) setDuration(Math.min(...lens));
  }, [pairs, segLen]);

  const seekAll = useCallback(
    (offset: number) => {
      for (const [el, v] of pairs()) if (el) el.currentTime = (v.startAtSeconds ?? 0) + offset;
      setT(offset);
    },
    [pairs],
  );

  const playAll = useCallback(async () => {
    try {
      await Promise.all(pairs().map(([el]) => el?.play()));
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [pairs]);

  const pauseAll = useCallback(() => {
    for (const [el] of pairs()) el?.pause();
    setPlaying(false);
  }, [pairs]);

  useEffect(() => {
    if (mode !== "shared") return;
    const h = humanEl.current;
    if (!h) return;
    const onTime = () => {
      const offset = h.currentTime - (hv.startAtSeconds ?? 0);
      setT(offset);
      if (duration && offset >= duration) {
        if (loop) {
          seekAll(0);
        } else {
          pauseAll();
          seekAll(duration);
        }
      }
    };
    const onMeta = () => refreshDuration();
    h.addEventListener("timeupdate", onTime);
    h.addEventListener("loadedmetadata", onMeta);
    birdEl.current?.addEventListener("loadedmetadata", onMeta);
    refreshDuration();
    return () => {
      h.removeEventListener("timeupdate", onTime);
      h.removeEventListener("loadedmetadata", onMeta);
      birdEl.current?.removeEventListener("loadedmetadata", onMeta);
    };
  }, [mode, hv.startAtSeconds, duration, loop, seekAll, pauseAll, refreshDuration]);

  // Jump to configured start points once metadata is available.
  useEffect(() => {
    if (mode !== "shared") return;
    for (const [el, v] of pairs()) {
      if (!el) continue;
      const go = () => (el.currentTime = v.startAtSeconds ?? 0);
      if (el.readyState >= 1) go();
      else el.addEventListener("loadedmetadata", go, { once: true });
    }
  }, [mode, pairs]);

  return (
    <div>
      <div className="diptych">
        <SpecimenPanel
          side="human"
          title={exhibit.human.fictionalClassification ?? exhibit.human.name}
          caption={exhibit.human.caption}
          accession={`${acc}-H`}
          video={hv}
          muted={audio !== "human"}
          compact={compact}
          videoRef={(el) => { humanEl.current = el; }}
        />
        <SpecimenPanel
          side="avian"
          title={exhibit.bird.scientificName ?? (exhibit.bird.commonName === "TBD" ? "Species TBD" : exhibit.bird.commonName)}
          caption={exhibit.bird.caption}
          accession={`${acc}-A`}
          video={bv}
          muted={audio !== "avian"}
          compact={compact}
          videoRef={(el) => { birdEl.current = el; }}
        />
      </div>

      {!compact && mode === "shared" && (
        <div className="shared-controls" role="group" aria-label="Comparison playback">
          <div className="control-group">
            <button type="button" className="btn btn-primary btn-sm" onClick={playing ? pauseAll : playAll}>
              {playing ? "Pause both" : "Play both"}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                seekAll(0);
              }}
            >
              Restart comparison
            </button>
          </div>
          <div className="progress">
            <label htmlFor={`seek-${exhibit.id}`} className="visually-hidden">
              Comparison position
            </label>
            <span className="mono muted" aria-hidden="true">{fmt(t)}</span>
            <input
              id={`seek-${exhibit.id}`}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(t, duration || 0)}
              onChange={(e) => seekAll(Number(e.target.value))}
              aria-valuetext={`${fmt(t)} of ${fmt(duration)}`}
              disabled={!duration}
            />
            <span className="mono muted" aria-hidden="true">{fmt(duration)}</span>
          </div>
          <div className="control-group">
            <span className="control-label" id={`audio-${exhibit.id}`}>Audio</span>
            <div className="seg" role="group" aria-labelledby={`audio-${exhibit.id}`}>
              {(
                [
                  ["muted", "Both muted"],
                  ["human", "Human"],
                  ["avian", "Bird"],
                ] as const
              ).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={audio === value} onClick={() => setAudio(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="check">
            <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
            Loop segment
          </label>
        </div>
      )}

      {!compact && mode === "independent" && (
        <p className="playback-note">
          These specimens are held by different institutions whose players cannot be operated in
          tandem. Play each clip individually; begin with the human, then observe the bird.
        </p>
      )}

      {!compact && mode === "draft" && (
        <p className="playback-note">
          Footage for this exhibit is still being selected and licensed. Shared playback controls
          (play both, restart, alignment and audio selection) will appear here once both specimens
          are on file as controllable recordings.
        </p>
      )}
    </div>
  );
}

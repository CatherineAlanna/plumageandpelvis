"use client";

// Shared engine for the "30 second dance party" in the design mocks.
// The bird clip plays muted; the human clip plays with sound, so the
// human's music scores both dances. After 30 seconds both stop.
//
// Players are the publishers' own (YouTube IFrame API, Vimeo postMessage
// API). Nothing is downloaded or re-hosted.

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exhibit, VideoSource } from "@/data/types";

export const PARTY_SECONDS = 30;

type Ctl = {
  ready: Promise<void>;
  play: (withSound: boolean, at: number) => void;
  pause: () => void;
  destroy: () => void;
};

/* ---------- YouTube ---------- */

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  setVolume(v: number): void;
  seekTo(s: number, allowSeekAhead: boolean): void;
  destroy(): void;
};
type YTNamespace = { Player: new (el: HTMLElement, opts: unknown) => YTPlayer };
type YTWindow = Window & { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void };

let ytLoader: Promise<YTNamespace> | null = null;

function loadYouTube(): Promise<YTNamespace> {
  const w = window as YTWindow;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (!ytLoader) {
    ytLoader = new Promise((resolve) => {
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(w.YT as YTNamespace);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
  }
  return ytLoader;
}

function youTubeCtl(host: HTMLElement, v: VideoSource, title: string): Ctl {
  const mount = document.createElement("div");
  host.appendChild(mount);
  let player: YTPlayer | null = null;
  let dead = false;
  const ready = loadYouTube().then(
    (YT) =>
      new Promise<void>((resolve) => {
        if (dead) return;
        player = new YT.Player(mount, {
          videoId: v.videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            playsinline: 1,
            controls: 0,
            rel: 0,
            disablekb: 1,
            iv_load_policy: 3,
            start: Math.floor(v.startSeconds ?? 0),
          },
          events: {
            onReady: (e: { target: { getIframe(): HTMLIFrameElement } }) => {
              const f = e.target.getIframe();
              f.title = title;
              f.tabIndex = -1;
              resolve();
            },
          },
        });
      }),
  );
  return {
    ready,
    play(withSound, at) {
      if (!player) return;
      if (withSound) {
        player.unMute();
        player.setVolume(100);
      } else {
        player.mute();
      }
      player.seekTo(at, true);
      player.playVideo();
    },
    pause() {
      player?.pauseVideo();
    },
    destroy() {
      dead = true;
      try {
        player?.destroy();
      } catch {
        /* already gone */
      }
      host.replaceChildren();
    },
  };
}

/* ---------- Vimeo ---------- */

function vimeoCtl(host: HTMLElement, v: VideoSource, title: string): Ctl {
  const f = document.createElement("iframe");
  const p = new URLSearchParams({
    dnt: "1",
    controls: "0",
    muted: "1",
    playsinline: "1",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  f.src = `https://player.vimeo.com/video/${encodeURIComponent(v.videoId ?? "")}?${p}`;
  f.allow = "autoplay; fullscreen; picture-in-picture";
  f.title = title;
  f.tabIndex = -1;
  host.appendChild(f);
  const ready = new Promise<void>((resolve) => f.addEventListener("load", () => resolve(), { once: true }));
  const post = (method: string, value?: unknown) =>
    f.contentWindow?.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), "https://player.vimeo.com");
  return {
    ready,
    play(withSound, at) {
      post("setVolume", withSound ? 1 : 0);
      post("setCurrentTime", at);
      post("play");
    },
    pause() {
      post("pause");
    },
    destroy() {
      host.replaceChildren();
    },
  };
}

function makeCtl(host: HTMLElement, v: VideoSource, title: string): Ctl | null {
  if (!v.videoId) return null;
  if (v.provider === "youtube") return youTubeCtl(host, v, title);
  if (v.provider === "vimeo") return vimeoCtl(host, v, title);
  return null;
}

/* ---------- Hook ---------- */

export type PartyPhase = "idle" | "cueing" | "party";

export function useDanceParty(exhibit: Exhibit) {
  const birdHost = useRef<HTMLDivElement>(null);
  const humanHost = useRef<HTMLDivElement>(null);
  const ctls = useRef<{ bird: Ctl | null; human: Ctl | null }>({ bird: null, human: null });
  const timer = useRef<number | null>(null);
  const [phase, setPhase] = useState<PartyPhase>("idle");
  const [remaining, setRemaining] = useState(PARTY_SECONDS);

  const canParty = Boolean(exhibit.human.video.videoId && exhibit.bird.video.videoId);

  useEffect(() => {
    const b = birdHost.current;
    const h = humanHost.current;
    ctls.current = {
      bird: b ? makeCtl(b, exhibit.bird.video, `${exhibit.bird.species} courtship display`) : null,
      human: h ? makeCtl(h, exhibit.human.video, `${exhibit.human.performer}, ${exhibit.human.work}`) : null,
    };
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      ctls.current.bird?.destroy();
      ctls.current.human?.destroy();
      ctls.current = { bird: null, human: null };
    };
  }, [exhibit]);

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    ctls.current.bird?.pause();
    ctls.current.human?.pause();
    setPhase("idle");
    setRemaining(PARTY_SECONDS);
  }, []);

  const start = useCallback(async () => {
    const { bird, human } = ctls.current;
    if (!bird || !human) return;
    setPhase("cueing");
    await Promise.all([bird.ready, human.ready]);
    human.play(true, exhibit.human.video.startSeconds ?? 0);
    bird.play(false, exhibit.bird.video.startSeconds ?? 0);
    const endAt = performance.now() + PARTY_SECONDS * 1000;
    setPhase("party");
    setRemaining(PARTY_SECONDS);
    timer.current = window.setInterval(() => {
      const left = Math.max(0, (endAt - performance.now()) / 1000);
      setRemaining(left);
      if (left <= 0) stop();
    }, 100);
  }, [exhibit, stop]);

  const toggle = useCallback(() => {
    if (phase === "idle") void start();
    else stop();
  }, [phase, start, stop]);

  return { birdHost, humanHost, phase, remaining, canParty, toggle, stop };
}

export function youTubePoster(v: VideoSource): string | undefined {
  return v.provider === "youtube" && v.videoId ? `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg` : undefined;
}

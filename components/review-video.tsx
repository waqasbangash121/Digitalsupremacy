"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/reviews";
import "./review-video.css";

function time(value: number) {
  return Number.isFinite(value) ? `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, "0")}` : "0:00";
}

export default function ReviewVideo({ review, autoPlay = false }: { review: Review; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(autoPlay);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(autoPlay && review.playback !== "drive");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!loading || failed) return;
    const timeout = window.setTimeout(() => {
      videoRef.current?.pause();
      setFailed(true);
      setLoading(false);
    }, 20000);
    return () => window.clearTimeout(timeout);
  }, [loading, failed]);

  async function togglePlayback() {
    if (review.playback === "drive") { setStarted(true); return; }
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { video.pause(); return; }
    setStarted(true);
    setLoading(true);
    try { await video.play(); } catch (error) {
      setLoading(false);
      if (error instanceof DOMException && error.name === "NotAllowedError") setStarted(false);
      else if (!(error instanceof DOMException && error.name === "AbortError")) setFailed(true);
    }
  }

  async function fullscreen() {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frameRef.current?.requestFullscreen) await frameRef.current.requestFullscreen();
      else video?.webkitEnterFullscreen?.();
    } catch { /* Playback remains available if fullscreen is unavailable. */ }
  }

  return <div ref={frameRef} className="rv-video" aria-busy={loading}>
    {!failed && review.playback !== "drive" && <video ref={videoRef} src={`/api/review-video/${review.video}`} preload="none" autoPlay={autoPlay} playsInline aria-label={`${review.name} video review`}
      onLoadedMetadata={event => {
        const video = event.currentTarget;
        setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      }}
      onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onPlaying={() => setLoading(false)} onWaiting={() => setLoading(true)}
      onEnded={() => { setPlaying(false); setLoading(false); }}
      onVolumeChange={event => setMuted(event.currentTarget.muted)}
      onError={() => { setFailed(true); setLoading(false); setPlaying(false); }} />}
    {!started && !failed && <button type="button" className="rv-video-cover" onClick={togglePlayback} aria-label={`Watch ${review.name}'s video review`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://drive.google.com/thumbnail?id=${review.video}&sz=w1000`} alt="" loading="lazy"
        onError={event => { event.currentTarget.style.visibility = "hidden"; }} />
      <span className="rv-video-tag">CLIENT TESTIMONIAL</span>
      <span className="rv-play" aria-hidden="true">▶</span>
      <span className="rv-video-caption"><strong>{review.name}</strong><span>CLICK TO WATCH ↗</span></span>
    </button>}
    {started && !failed && review.playback !== "drive" && <>
      {loading && <span className="rv-video-status" role="status">Loading video…</span>}
      <div className="rv-video-controls">
        <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause video" : "Play video"}>{playing ? "Ⅱ" : "▶"}</button>
        <span className="rv-video-time">{time(position)} / {time(duration)}</span>
        <input type="range" min="0" max={duration || 0} step="0.1" value={position} disabled={!duration} aria-label="Seek video"
          aria-valuetext={`${time(position)} of ${time(duration)}`} onChange={event => { const value = Number(event.target.value); if (videoRef.current) videoRef.current.currentTime = value; setPosition(value); }} />
        <button type="button" aria-label={muted ? "Unmute video" : "Mute video"} onClick={() => { if (videoRef.current) videoRef.current.muted = !muted; }}>{muted ? "Unmute" : "Mute"}</button>
        <button type="button" onClick={fullscreen} aria-label="Toggle fullscreen">⛶</button>
      </div>
    </>}
    {(failed || (started && review.playback === "drive")) && <iframe src={`https://drive.google.com/file/d/${review.video}/preview`} title={`${review.name} video review`} allow="autoplay; fullscreen" allowFullScreen />}
  </div>;
}

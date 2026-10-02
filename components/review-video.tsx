"use client";

import { useState } from "react";
import type { Review } from "@/lib/reviews";

export default function ReviewVideo({ review }: { review: Review }) {
  const [playing, setPlaying] = useState(false);
  return <div className="rv-video">
    {playing ? <iframe src={`https://drive.google.com/file/d/${review.video}/preview`} title={`${review.name} video review`} allow="autoplay; fullscreen" allowFullScreen /> : <button type="button" className="rv-video-cover" onClick={() => setPlaying(true)} aria-label={`Watch ${review.name}'s video review`}>
      {/* Google Drive supplies the thumbnail from the original testimonial video. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://drive.google.com/thumbnail?id=${review.video}&sz=w1000`} alt="" loading="lazy" />
      <span className="rv-video-tag">CLIENT TESTIMONIAL</span>
      <span className="rv-play" aria-hidden="true">▶</span>
      <span className="rv-video-caption"><strong>{review.name}</strong><span>CLICK TO WATCH ↗</span></span>
    </button>}
  </div>;
}

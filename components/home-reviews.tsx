"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews, type Review } from "@/lib/reviews";
import "./home-reviews.css";

export default function HomeReviews() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!activeReview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeReview]);

  function openVideo(review: Review, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setLoaded(false);
    setActiveReview(review);
    dialogRef.current?.showModal();
  }

  function onClose() {
    setActiveReview(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return <>
    <div className="hr-grid">
      {reviews.map((review) => <article className={`hr-card${review.image ? " hr-quote-card" : ""}`} key={review.video}>
        {review.image ? <>
          <span className="hr-quote" aria-hidden="true">“</span>
          <blockquote>{review.quote}</blockquote>
        </> : <div className="hr-video-intro">
          <span className="hr-video-label">Client story</span>
          <h3>Hear from {review.name === "Dr. Suneel Dhand" ? "Dr. Dhand" : review.name.split(" ")[0]}.</h3>
          <p>A firsthand look at working with our team.</p>
        </div>}
        <div className="hr-author">
          {review.image ? <Image src={review.image} width={44} height={44} alt="" /> : <span className="hr-avatar" aria-hidden="true">{review.name.replace("Dr. ", "").split(" ").map(name => name[0]).slice(0, 2).join("")}</span>}
          <div><strong>{review.name}</strong><span>{review.role}</span></div>
        </div>
        <button className="hr-watch" type="button" aria-haspopup="dialog" aria-label={`Watch ${review.name}'s video review`} onClick={event => openVideo(review, event.currentTarget)}>
          <span className="hr-play" aria-hidden="true">▶</span>Watch video review<span className="hr-arrow" aria-hidden="true">↗</span>
        </button>
      </article>)}
    </div>
    <dialog className="hr-dialog" ref={dialogRef} aria-labelledby="hr-dialog-title" onClose={onClose} onClick={event => {
      if (event.target === event.currentTarget) {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }
    }}>
      <div className="hr-dialog-head">
        <div><p>Client video review</p><h3 id="hr-dialog-title">{activeReview?.name}</h3><span>{activeReview?.role}</span></div>
        <button className="hr-close" type="button" autoFocus aria-label="Close video review" onClick={() => dialogRef.current?.close()}>✕</button>
      </div>
      <div className="hr-player" aria-busy={activeReview !== null && !loaded}>
        {activeReview && <>
          {!loaded && <span className="hr-loading" role="status">Loading video…</span>}
          <iframe key={activeReview.video} src={`https://drive.google.com/file/d/${activeReview.video}/preview`} title={`${activeReview.name} video review`} allow="autoplay; fullscreen" allowFullScreen onLoad={() => setLoaded(true)} />
        </>}
      </div>
    </dialog>
  </>;
}

"use client";

import { useEffect } from "react";

function closestInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>(
        "[data-scroll-target], [data-open-url], [data-review-index], [data-review-action]",
      )
    : null;
}

export default function SiteInteractions() {
  useEffect(() => {
    const reviewTrack = document.querySelector<HTMLElement>("#reviewTrack");
    const reviewDots = Array.from(document.querySelectorAll<HTMLElement>(".sdot"));
    let currentReview = 0;
    let reviewTimer: number | undefined;

    const goToReview = (nextReview: number) => {
      if (!reviewTrack || reviewDots.length === 0) {
        return;
      }

      currentReview = ((nextReview % reviewDots.length) + reviewDots.length) % reviewDots.length;
      reviewTrack.style.transform = `translateX(-${currentReview * 100}%)`;

      reviewDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentReview);
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = closestInteractiveTarget(event.target);

      if (!target) {
        return;
      }

      const scrollTarget = target.dataset.scrollTarget;
      const openUrl = target.dataset.openUrl;
      const reviewIndex = target.dataset.reviewIndex;
      const reviewAction = target.dataset.reviewAction;

      if (scrollTarget) {
        event.preventDefault();
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (openUrl) {
        event.preventDefault();
        window.open(openUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (reviewIndex !== undefined) {
        event.preventDefault();
        goToReview(Number(reviewIndex));
        return;
      }

      if (reviewAction) {
        event.preventDefault();
        goToReview(currentReview + (reviewAction === "previous" ? -1 : 1));
      }
    };

    const clearReviewTimer = () => {
      if (reviewTimer !== undefined) {
        window.clearInterval(reviewTimer);
        reviewTimer = undefined;
      }
    };

    const startReviewTimer = () => {
      clearReviewTimer();

      if (reviewTrack && reviewDots.length > 1) {
        reviewTimer = window.setInterval(() => goToReview(currentReview + 1), 5500);
      }
    };

    document.addEventListener("click", onClick);

    if (reviewTrack) {
      reviewTrack.addEventListener("mouseenter", clearReviewTimer);
      reviewTrack.addEventListener("mouseleave", startReviewTimer);
      startReviewTimer();
    }

    return () => {
      document.removeEventListener("click", onClick);
      reviewTrack?.removeEventListener("mouseenter", clearReviewTimer);
      reviewTrack?.removeEventListener("mouseleave", startReviewTimer);
      clearReviewTimer();
    };
  }, []);

  return null;
}

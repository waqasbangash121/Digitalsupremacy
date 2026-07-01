"use client";

import { useEffect, useRef } from "react";

import type { LegacyPage } from "@/lib/legacy-page";

type LegacyPageClientProps = LegacyPage;

export default function LegacyPageClient({
  markup,
  styles,
}: LegacyPageClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    root.querySelectorAll<HTMLElement>("[data-scroll-target]").forEach((element) => {
      element.addEventListener(
        "click",
        () => {
          const targetId = element.dataset.scrollTarget;
          document.getElementById(targetId ?? "")?.scrollIntoView({
            behavior: "smooth",
          });
        },
        { signal },
      );
    });

    root.querySelectorAll<HTMLElement>("[data-open-url]").forEach((element) => {
      element.addEventListener(
        "click",
        () => {
          const url = element.dataset.openUrl;

          if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        },
        { signal },
      );
    });

    const reviewTrack = root.querySelector<HTMLElement>("#reviewTrack");
    const reviewDots = Array.from(root.querySelectorAll<HTMLElement>(".sdot"));
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

    root.querySelectorAll<HTMLElement>("[data-review-index]").forEach((element) => {
      element.addEventListener(
        "click",
        () => goToReview(Number(element.dataset.reviewIndex ?? 0)),
        { signal },
      );
    });

    root.querySelectorAll<HTMLElement>("[data-review-action]").forEach((element) => {
      element.addEventListener(
        "click",
        () => {
          const direction = element.dataset.reviewAction === "previous" ? -1 : 1;
          goToReview(currentReview + direction);
        },
        { signal },
      );
    });

    const startReviewTimer = () => {
      if (reviewTrack && reviewDots.length > 1) {
        reviewTimer = window.setInterval(() => goToReview(currentReview + 1), 5500);
      }
    };

    if (reviewTrack) {
      reviewTrack.addEventListener(
        "mouseenter",
        () => {
          if (reviewTimer) {
            window.clearInterval(reviewTimer);
            reviewTimer = undefined;
          }
        },
        { signal },
      );

      reviewTrack.addEventListener("mouseleave", startReviewTimer, { signal });
      startReviewTimer();
    }

    return () => {
      controller.abort();

      if (reviewTimer) {
        window.clearInterval(reviewTimer);
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}

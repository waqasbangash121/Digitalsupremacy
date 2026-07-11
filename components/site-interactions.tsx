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
    const sidebarLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#sidebarLinks a[href^='#']"),
    );
    const sidebarList = document.querySelector<HTMLElement>("#sidebarLinks");
    const policySections = sidebarLinks
      .map((link) => document.querySelector<HTMLElement>(link.hash))
      .filter((section): section is HTMLElement => section !== null);

    if (window.location.pathname === "/") {
      const navLinks = document.querySelector<HTMLUListElement>(".page--home .nav-links");
      const hasTemplatesLink = navLinks?.querySelector<HTMLAnchorElement>('a[href="/templates"]');

      if (navLinks && !hasTemplatesLink) {
        const templatesItem = document.createElement("li");
        const templatesLink = document.createElement("a");
        templatesLink.href = "/templates";
        templatesLink.textContent = "Templates";
        templatesItem.appendChild(templatesLink);

        const whyUsItem = navLinks.querySelector<HTMLAnchorElement>('a[href="/why-us"]')?.parentElement;
        navLinks.insertBefore(templatesItem, whyUsItem ?? null);
      }
    }

    let currentReview = 0;
    let reviewTimer: number | undefined;
    let activePolicySection = "";
    let policyFrame: number | undefined;

    const setActivePolicySection = (sectionId: string) => {
      if (sectionId === activePolicySection) return;
      activePolicySection = sectionId;

      sidebarLinks.forEach((link) => {
        const isActive = link.hash === "#" + sectionId;
        link.classList.toggle("active", isActive);

        if (isActive && sidebarList) {
          const nextTop =
            link.offsetTop - sidebarList.clientHeight / 2 + link.offsetHeight / 2;
          sidebarList.scrollTo({ top: nextTop, behavior: "smooth" });
        }
      });
    };

    const updatePolicySection = () => {
      policyFrame = undefined;
      if (policySections.length === 0) return;

      const readingLine = window.scrollY + window.innerHeight * 0.28;
      let currentSection = policySections[0];

      for (const section of policySections) {
        if (section.offsetTop <= readingLine) currentSection = section;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentSection = policySections[policySections.length - 1];
      }

      setActivePolicySection(currentSection.id);
    };

    const onPolicyScroll = () => {
      if (policyFrame === undefined) {
        policyFrame = window.requestAnimationFrame(updatePolicySection);
      }
    };

    const goToReview = (nextReview: number) => {
      if (!reviewTrack || reviewDots.length === 0) return;
      currentReview = ((nextReview % reviewDots.length) + reviewDots.length) % reviewDots.length;
      reviewTrack.style.transform = "translateX(-" + currentReview * 100 + "%)";
      reviewDots.forEach((dot, index) => dot.classList.toggle("active", index === currentReview));
    };

    const onClick = (event: MouseEvent) => {
      const target = closestInteractiveTarget(event.target);
      if (!target) return;

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

    if (policySections.length > 0) {
      window.addEventListener("scroll", onPolicyScroll, { passive: true });
      updatePolicySection();
    }

    if (reviewTrack) {
      reviewTrack.addEventListener("mouseenter", clearReviewTimer);
      reviewTrack.addEventListener("mouseleave", startReviewTimer);
      startReviewTimer();
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onPolicyScroll);
      reviewTrack?.removeEventListener("mouseenter", clearReviewTimer);
      reviewTrack?.removeEventListener("mouseleave", startReviewTimer);
      clearReviewTimer();
      if (policyFrame !== undefined) window.cancelAnimationFrame(policyFrame);
    };
  }, []);

  return null;
}

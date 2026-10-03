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
      const hasPortfolioLink = navLinks?.querySelector<HTMLAnchorElement>('a[href="/portfolio"]');

      if (navLinks && !hasPortfolioLink) {
        const portfolioItem = document.createElement("li");
        const portfolioLink = document.createElement("a");
        portfolioLink.href = "/portfolio";
        portfolioLink.textContent = "Portfolio";
        portfolioItem.appendChild(portfolioLink);

        const whyUsItem = navLinks.querySelector<HTMLAnchorElement>('a[href="/why-us"]')?.parentElement;
        navLinks.insertBefore(portfolioItem, whyUsItem ?? null);
      }
    }

    let currentReview = 0;

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
      const reviewCards = Array.from(reviewTrack.querySelectorAll<HTMLElement>(".review-card"));
      if (reviewCards.length === 0) return;
      const nextIndex = ((nextReview % reviewCards.length) + reviewCards.length) % reviewCards.length;
      if (nextIndex !== currentReview) {
        // Reload the outgoing cross-origin Drive player to stop its audio/video.
        const outgoingPlayer = reviewCards[currentReview]?.querySelector("iframe");
        if (outgoingPlayer) outgoingPlayer.src = outgoingPlayer.src;
      }
      currentReview = nextIndex;
      reviewTrack.style.transform = "none";
      const reviewCount = reviewCards.length;
      reviewCards.forEach((card, index) => {
        const relativeIndex = (index - currentReview + reviewCount) % reviewCount;
        card.classList.toggle("active", relativeIndex === 0);
        card.classList.toggle("previous", relativeIndex === reviewCount - 1);
        card.classList.toggle("next", relativeIndex === 1);
        card.classList.toggle("carousel-hidden", relativeIndex !== 0 && relativeIndex !== 1 && relativeIndex !== reviewCount - 1);
      });
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

    document.addEventListener("click", onClick);

    if (policySections.length > 0) {
      window.addEventListener("scroll", onPolicyScroll, { passive: true });
      updatePolicySection();
    }

    if (reviewTrack) {
      goToReview(0);
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onPolicyScroll);
      if (policyFrame !== undefined) window.cancelAnimationFrame(policyFrame);
    };
  }, []);

  return null;
}

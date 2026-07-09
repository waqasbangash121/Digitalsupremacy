"use client";

import { useEffect } from "react";

const TEMPLATES_URL =
  "https://drive.google.com/drive/folders/1QRNx3_kHrEX1gKVgDnlxBb_nxW60Rcgj?usp=sharing";

const CALENDLY_URL = "https://calendly.com/addyawan57/15min";

function closestInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>(
        "[data-scroll-target], [data-open-url], [data-review-index], [data-review-action]",
      )
    : null;
}

function removeLongDashes(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((node) => {
    node.textContent = node.textContent?.replace(/[—–]/g, " ");
  });
}

function normalizeHomepageContent() {
  const homePage = document.querySelector(".page--home");

  if (!homePage) {
    return;
  }

  homePage.querySelectorAll(".bullet-icon").forEach((icon) => {
    icon.remove();
  });

  homePage.querySelectorAll<HTMLAnchorElement>('a[href="#cases"]').forEach((link) => {
    link.href = "/case-studies";
  });

  homePage.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
  });

  homePage.querySelectorAll<HTMLElement>(".cal-header .btn-primary").forEach((button) => {
    button.textContent = "Schedule a meeting";
  });

  const youtubeLink = Array.from(homePage.querySelectorAll<HTMLAnchorElement>("a")).find(
    (link) => link.textContent?.trim().toLowerCase() === "youtube",
  );

  if (youtubeLink) {
    youtubeLink.textContent = "Blogger";
  }

  removeLongDashes(homePage);
}

function ensureTemplatesSection() {
  if (document.getElementById("templates")) {
    return;
  }

  const casesSection = document.getElementById("cases");
  const casesContainer = casesSection?.closest(".container");

  if (!casesContainer) {
    return;
  }

  const templatesContainer = document.createElement("div");
  templatesContainer.className = "container";
  templatesContainer.innerHTML = `
    <section class="section home-templates" id="templates">
      <p class="sec-label">Templates</p>
      <h2>See our work through the templates we build.</h2>
      <p style="font-size: 17px; color: var(--text-muted); margin-top: 14px; max-width: 560px;">
        Browse the email and creative templates prepared for the homepage.
      </p>
      <div class="template-grid">
        <article class="template-card">
          <div>
            <h3>Email templates</h3>
            <p>Campaign layouts, lifecycle email structures, and reusable brand-safe template systems.</p>
          </div>
          <a href="${TEMPLATES_URL}" target="_blank" rel="noopener noreferrer">Open templates</a>
        </article>
        <article class="template-card">
          <div>
            <h3>Retention systems</h3>
            <p>Flow-based templates that help brands follow up, educate, convert, and retain customers.</p>
          </div>
          <a href="${TEMPLATES_URL}" target="_blank" rel="noopener noreferrer">View systems</a>
        </article>
        <article class="template-card">
          <div>
            <h3>Brand examples</h3>
            <p>Examples of how the work can be adapted across DTC brands, launches, and ongoing campaigns.</p>
          </div>
          <a href="${TEMPLATES_URL}" target="_blank" rel="noopener noreferrer">See examples</a>
        </article>
      </div>
    </section>
  `;

  casesContainer.before(templatesContainer);
}

function ensureCalendlyEmbed() {
  const calendarBox = document.querySelector<HTMLElement>("#calendly .cal-box");

  if (!calendarBox || calendarBox.querySelector(".calendly-full-calendar")) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.className = "calendly-full-calendar";
  iframe.title = "Schedule a meeting with Digital Supremacy";
  iframe.src = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`;
  iframe.loading = "lazy";

  calendarBox.appendChild(iframe);
}

export default function SiteInteractions() {
  useEffect(() => {
    const reviewTrack = document.querySelector<HTMLElement>("#reviewTrack");
    const reviewDots = Array.from(document.querySelectorAll<HTMLElement>(".sdot"));
    let currentReview = 0;
    let reviewTimer: number | undefined;

    ensureTemplatesSection();
    ensureCalendlyEmbed();
    normalizeHomepageContent();

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
        const targetId = scrollTarget === "cases" ? "templates" : scrollTarget;
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
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

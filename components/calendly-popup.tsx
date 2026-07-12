"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const CALENDLY_URL =
  "https://calendly.com/addyawan57/15min?hide_event_type_details=1&hide_gdpr_banner=1";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function isCalendlyTrigger(element: Element | null) {
  if (!(element instanceof HTMLElement)) return false;

  if (element instanceof HTMLAnchorElement) {
    return element.href.includes("calendly.com/addyawan57/15min") || element.hash === "#calendly";
  }

  return element.dataset.scrollTarget === "calendly";
}

export default function CalendlyPopup() {
  const [open, setOpen] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const initializedRef = useRef(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const initializeWidget = useCallback(() => {
    if (
      typeof window === "undefined" ||
      initializedRef.current ||
      !widgetRef.current ||
      !window.Calendly
    ) {
      return;
    }

    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: widgetRef.current,
    });
    initializedRef.current = true;
    setWidgetReady(true);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger =
        event.target instanceof Element
          ? event.target.closest(
              "a[href*='calendly.com/addyawan57/15min'], a[href='#calendly'], [data-scroll-target='calendly']",
            )
          : null;

      if (!isCalendlyTrigger(trigger)) return;

      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
      initializeWidget();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [initializeWidget]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.classList.toggle("calendly-popup-open", open);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("calendly-popup-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={initializeWidget}
      />
      <div
        className={`calendly-popup${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Schedule a call"
      >
        <button
          className="calendly-popup-backdrop"
          type="button"
          aria-label="Close scheduler"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div className="calendly-popup-panel">
          <div className="calendly-popup-head">
            <div>
              <p>Schedule a call</p>
              <strong>Book your free 15-minute session</strong>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close scheduler"
              tabIndex={open ? 0 : -1}
            >
              x
            </button>
          </div>
          {!widgetReady && <div className="calendly-popup-loading">Loading scheduler...</div>}
          <div
            ref={widgetRef}
            className="calendly-inline-widget calendly-popup-widget"
            data-url={CALENDLY_URL}
          />
        </div>
      </div>
    </>
  );
}
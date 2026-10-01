"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ServicesDropdown({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const id = mobile ? "mobile-services-links" : "services-links";
  return <div ref={root} className={`services-dropdown${mobile ? " services-dropdown--mobile" : ""}`} onPointerEnter={(event) => {
    if (!mobile && event.pointerType === "mouse") setOpen(true);
  }} onPointerLeave={(event) => {
    if (!mobile && event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setOpen(false);
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button ref={trigger} type="button" className={`services-trigger${pathname.startsWith("/services") ? " active" : ""}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      {mobile && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>}
      <span>Services</span>
    </button>
    {open && <div id={id} className="services-dropdown-links">
      <Link href="/services/email-marketing" onClick={() => setOpen(false)} aria-current={pathname === "/services/email-marketing" ? "page" : undefined}>Email Marketing</Link>
      <Link href="/services/social-media-marketing" onClick={() => setOpen(false)} aria-current={pathname === "/services/social-media-marketing" ? "page" : undefined}>Social Media Marketing</Link>
    </div>}
  </div>;
}

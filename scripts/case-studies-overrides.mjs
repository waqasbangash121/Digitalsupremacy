const caseStudiesOverrides = String.raw`
/* Keep the normal site canvas black. */
.case-studies-page {
  background: var(--bg);
}

/* The brief requests light-gray treatment only for the two case-study sections. */
.case-studies-page > .container:has(.case-study) {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 0;
  background: transparent;
}

/* Black space separates the first case study from the second. */
.case-studies-page > .container:has(.case-study) + .container:has(.case-study) {
  padding-top: 72px;
}

.case-studies-page .case-study {
  width: 100%;
  margin: 0;
  padding: 80px 48px;
  border: 0;
  border-radius: 18px;
  background: #eceef0;
  color: #17181b;
}

/* Text that sits directly on the light-gray case-study panel. */
.case-studies-page .case-study .cs-title,
.case-studies-page .case-study .phase-title,
.case-studies-page .case-study .deliv-table td:first-child {
  color: #17181b;
}

.case-studies-page .case-study .cs-tag,
.case-studies-page .case-study .cs-story-title,
.case-studies-page .case-study .deliv-table th {
  color: #565a60;
}

.case-studies-page .case-study .cs-subtitle,
.case-studies-page .case-study .phase-desc,
.case-studies-page .case-study .deliv-table td {
  color: #5f646b;
}

.case-studies-page .case-study .cs-story-title,
.case-studies-page .case-study .deliv-table th,
.case-studies-page .case-study .deliv-table td {
  border-color: #d4d7da;
}

/* Preserve all existing card backgrounds and colors. Only former red figures become white. */
.case-studies-page .case-study .stat-item-val .highlight,
.case-studies-page .case-study .result-card-num.red {
  color: #ffffff;
}

/* Screenshot placement requested in the brief. */
.case-studies-page .case-study .screenshots-group {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  width: min(1120px, 100%);
  margin: 32px auto 44px;
}

.case-studies-page .case-study .screenshots-group.two-screenshots {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.case-studies-page .case-study .screenshot-label {
  color: #373a40;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.5;
  text-transform: uppercase;
}

.case-studies-page .case-study .screenshot-img,
.case-studies-page .case-study .screenshots-group.two-screenshots .screenshot-img,
.case-studies-page .case-study .screenshots-group.two-screenshots .screenshot-img.half {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  margin: 0;
  object-fit: contain;
  border: 1px solid #cbd0d4;
  border-radius: 12px;
  background: #17181b;
  box-shadow: 0 18px 38px rgba(15, 15, 16, 0.16);
}

/* Return to the original dark site treatment after the second study. */
.case-studies-page .cta-band {
  background: var(--bg);
}

@media (max-width: 700px) {
  .case-studies-page > .container:has(.case-study) {
    padding: 40px 16px 0;
  }

  .case-studies-page > .container:has(.case-study) + .container:has(.case-study) {
    padding-top: 48px;
  }

  .case-studies-page .case-study {
    padding: 56px 20px;
    border-radius: 14px;
  }

  .case-studies-page .case-study .screenshots-group.two-screenshots {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

export default caseStudiesOverrides;

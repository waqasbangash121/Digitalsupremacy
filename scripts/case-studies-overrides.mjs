const caseStudiesOverrides = String.raw`
/* Case-study presentation requested in the case studies brief. */
.case-studies-page {
  background: var(--bg);
}

/* Each case study is a full-width light-gray band. */
.case-studies-page > .container:has(.case-study) {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background: #eceef0;
}

/* Reset to black between the two separate case studies. */
.case-studies-page > .container:has(.case-study) + .container:has(.case-study) {
  border-top: 72px solid var(--bg);
}

.case-studies-page .case-study {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 80px 24px;
  border: 0;
  color: #17181b;
}

.case-studies-page .case-study .cs-header,
.case-studies-page .case-study .cs-story {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

.case-studies-page .case-study .cs-title,
.case-studies-page .case-study .phase-title,
.case-studies-page .case-study .col-block h3,
.case-studies-page .case-study .diff-block h3,
.case-studies-page .case-study .cs-closing,
.case-studies-page .case-study .deliv-table td:first-child {
  color: #17181b;
}

.case-studies-page .case-study .cs-tag,
.case-studies-page .case-study .cs-story-title,
.case-studies-page .case-study .col-block-label,
.case-studies-page .case-study .result-card-label,
.case-studies-page .case-study .cs-period-label {
  color: #565a60;
}

.case-studies-page .case-study .cs-subtitle,
.case-studies-page .case-study .phase-desc,
.case-studies-page .case-study .col-block li,
.case-studies-page .case-study .diff-list li,
.case-studies-page .case-study .result-card-sub,
.case-studies-page .case-study .stat-item-label,
.case-studies-page .case-study .cs-period-val,
.case-studies-page .case-study .deliv-table td {
  color: #5f646b;
}

.case-studies-page .case-study .cs-story-title,
.case-studies-page .case-study .deliv-table th,
.case-studies-page .case-study .deliv-table td,
.case-studies-page .case-study .cs-period,
.case-studies-page .case-study .col-block,
.case-studies-page .case-study .diff-block,
.case-studies-page .case-study .cs-closing {
  border-color: #d4d7da;
}

.case-studies-page .case-study .cs-period,
.case-studies-page .case-study .col-block,
.case-studies-page .case-study .diff-block,
.case-studies-page .case-study .cs-closing {
  background: #ffffff;
}

.case-studies-page .case-study .col-block li::before {
  background: #17181b;
}

.case-studies-page .case-study .col-block.solution li::before {
  background: var(--green);
}

.case-studies-page .case-study .phase-num {
  background: #17181b;
  border-color: #17181b;
  color: #ffffff;
}

.case-studies-page .case-study .diff-block {
  border-left-color: #17181b;
}

.case-studies-page .case-study .diff-list li::before,
.case-studies-page .case-study .cs-closing strong {
  color: #17181b;
}

/* Keep the results on dark cards and make former red figures white. */
.case-studies-page .case-study .stat-strip {
  max-width: 1120px;
  margin: 0 auto 56px;
  background: #303338;
  border-color: #303338;
  box-shadow: 0 18px 38px rgba(15, 15, 16, 0.12);
}

.case-studies-page .case-study .stat-item,
.case-studies-page .case-study .result-card {
  background: #17181b;
  border-color: #303338;
}

.case-studies-page .case-study .stat-item-val,
.case-studies-page .case-study .stat-item-val .highlight,
.case-studies-page .case-study .result-card-num.red {
  color: #ffffff;
}

.case-studies-page .case-study .stat-item-label,
.case-studies-page .case-study .result-card-label,
.case-studies-page .case-study .result-card-sub {
  color: #c4c7cc;
}

.case-studies-page .case-study .results-grid {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 28px;
}

.case-studies-page .case-study .result-card-num:not(.red):not(.green) {
  color: #ffffff;
}

/* Screenshot placement: one clear frame per image, with a responsive two-up layout when supplied. */
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

/* Return to the black site treatment once the final study ends. */
.case-studies-page .cta-band {
  background: var(--bg);
}

@media (max-width: 700px) {
  .case-studies-page > .container:has(.case-study) + .container:has(.case-study) {
    border-top-width: 48px;
  }

  .case-studies-page .case-study {
    padding: 56px 16px;
  }

  .case-studies-page .case-study .screenshots-group.two-screenshots {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

export default caseStudiesOverrides;

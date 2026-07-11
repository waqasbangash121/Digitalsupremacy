import type { CaseStudy } from "@/lib/db";

export default function CaseStudyView({ item, standalone = false }: { item: CaseStudy; standalone?: boolean }) {
  const tag = [item.industry, item.client_name].filter(Boolean).join(" · ");
  return (
    <article className="case-study" id={item.slug}>
      <div className="cs-header">
        <div>
          <div className="cs-tag">{tag || "Case Study"}</div>
          {standalone ? <h1 className="cs-title">{item.title}</h1> : <a className="cs-title cs-title-link" href={`/case-studies/${item.slug}`}>{item.title}</a>}
          {item.excerpt && <div className="cs-subtitle">{item.excerpt}</div>}
        </div>
        {item.project_period && <div className="cs-period"><div className="cs-period-label">Project period</div><div className="cs-period-val">{item.project_period}</div></div>}
      </div>

      {item.metrics.length > 0 && <div className="stat-strip">{item.metrics.map((metric,index)=><div className="stat-item" key={`${metric.label}-${index}`}><div className="stat-item-val"><span className={index % 2 ? "positive" : "highlight"}>{metric.value}</span></div><div className="stat-item-label">{metric.label}</div></div>)}</div>}

      {item.cover_image_url && <div className="screenshots-group"><div className="screenshot-label">Case study overview</div><img className="screenshot-img" src={item.cover_image_url} alt={`${item.title} overview`} /></div>}

      {(item.challenge || item.solution) && <div className="cs-story"><div className="cs-story-title">The situation</div><div className="two-col">
        {item.challenge && <div className="col-block"><div className="col-block-label">Where they were</div><h3>The challenge</h3><p>{item.challenge}</p></div>}
        {item.solution && <div className="col-block solution"><div className="col-block-label">What needed to change</div><h3>The approach</h3><p>{item.solution}</p></div>}
      </div></div>}

      {item.phases.length > 0 && <div className="cs-story"><div className="cs-story-title">How we did it</div><div className="phases">{item.phases.map((phase,index)=><div className="phase" key={`${phase.title}-${index}`}><div className="phase-num">{index+1}</div><div className="phase-content"><div className="phase-title">{phase.title}</div><div className="phase-desc">{phase.description}</div></div></div>)}</div></div>}

      {(item.results || item.images.length > 0) && <div className="cs-story"><div className="cs-story-title">The results</div>{item.results && <div className="diff-block"><h3>What changed</h3><p>{item.results}</p></div>}
        {item.images.map((image,index)=><div className="screenshots-group" key={`${image.caption}-${index}`}>{image.caption && <div className="screenshot-label">{image.caption}</div>}<img className="screenshot-img" src={image.url} alt={image.caption || `${item.title} evidence ${index+1}`} /></div>)}
      </div>}

      {item.closing && <div className="cs-closing">{item.closing}</div>}
    </article>
  );
}

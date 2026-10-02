import { ServiceVisual } from "@/components/service-visual";

export default function Capabilities() {
  return <div className="services-wrap">
    <div className="service-block" id="strategy">
      <div className="service-left">
        <div className="service-number">01</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="strategy" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Email Strategy</h2>
        <div className="service-tagline">Everything starts here.</div>

        <p className="service-intro">We don&apos;t send emails for the sake of it. We build a strategy that turns your email channel into a <strong>predictable revenue driver.</strong></p>
        <div className="list-group">
          <div className="list-group-title">What we do</div>
          <ul className="service-list">
            <li>Full account audit</li>
            <li>Revenue opportunity mapping</li>
            <li>Customer journey planning</li>
            <li>Segmentation strategy</li>
            <li>Campaign calendar planning</li>
            <li>Offer and positioning strategy</li>
            <li>AOV and LTV optimisation</li>
          </ul>
        </div>
        <div className="service-note">You&apos;re not getting random ideas. <strong>You&apos;re getting a system built to make money.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="flows">
      <div className="service-left">
        <div className="service-number">02</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="flows" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Flows &amp; Automations</h2>
        <div className="service-tagline">Your highest ROI channel, built to run 24/7.</div>

        <p className="service-intro">We design, write, and implement complete flow systems that <strong>capture revenue at every stage</strong> of the customer journey.</p>

        <div className="list-group">
          <div className="list-group-title">Core Flows</div>
          <ul className="service-list">
            <li>Welcome Flow</li>
            <li>Abandoned Cart</li>
            <li>Checkout Abandonment</li>
            <li>Browse Abandonment</li>
            <li>Post Purchase Flow</li>
            <li>Order Confirmation</li>
            <li>Shipping / Fulfilment Flow</li>
            <li>Review / UGC Request</li>
            <li>Cross-sell / Upsell Flow</li>
            <li>Repeat Purchase Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Advanced &amp; Retention Flows</div>
          <ul className="service-list">
            <li>VIP / High Value Customer Flow</li>
            <li>Winback Flow</li>
            <li>Re-engagement Flow</li>
            <li>Sunset Flow (list cleaning)</li>
            <li>Loyalty / Rewards Flow</li>
            <li>Back in Stock Flow</li>
            <li>Price Drop Flow</li>
            <li>Product Education Flow</li>
            <li>Subscription Nurture Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Subscription-Based Flows</div>
          <ul className="service-list">
            <li>Subscription Welcome Flow</li>
            <li>Refill Reminder Flow</li>
            <li>Renewal Reminder</li>
            <li>Subscription Upsell</li>
            <li>Subscription Cancellation Save Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Platform Integrations</div>
          <div className="tags">
            <span className="tag">Klaviyo</span>
            <span className="tag">Omnisend</span>
            <span className="tag">Shopify</span>
            <span className="tag">Recharge</span>
            <span className="tag">Skio</span>
            <span className="tag">Yotpo</span>
            <span className="tag">Attentive</span>
            <span className="tag">Gorgias</span>
            <span className="tag">Postscript</span>
          </div>
          <p style={{"fontSize":"13px","color":"var(--text-dim)","marginTop":"12px"}}>Custom event tracking included where needed.</p>
        </div>
      </div>
    </div>

    
    <div className="service-block" id="campaigns">
      <div className="service-left">
        <div className="service-number">03</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="campaigns" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Campaigns</h2>
        <div className="service-tagline">This is where we drive immediate revenue.</div>

        <p className="service-intro">We plan, design, and execute campaigns that <strong>convert without burning your list.</strong></p>

        <div className="list-group">
          <div className="list-group-title">Campaign Types</div>
          <ul className="service-list">
            <li>Product launches</li>
            <li>Promotions and sales</li>
            <li>New arrivals</li>
            <li>Restocks</li>
            <li>Seasonal campaigns</li>
            <li>Holiday campaigns (BFCM, Christmas)</li>
            <li>Clearance campaigns</li>
            <li>Limited drops</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Engagement &amp; Brand Campaigns</div>
          <ul className="service-list">
            <li>Educational emails</li>
            <li>Founder story</li>
            <li>Social proof / reviews</li>
            <li>Community building</li>
            <li>Content-driven emails</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Segmentation Strategy</div>
          <ul className="service-list single-col">
            <li>Highly engaged audience targeting</li>
            <li>Behaviour-based sends</li>
            <li>Purchase-based targeting</li>
            <li>Lifecycle segmentation</li>
          </ul>
        </div>

        <div className="service-note"><strong>Every campaign has a purpose. Every send is tied to revenue.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="deliverability">
      <div className="service-left">
        <div className="service-number">04</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="deliverability" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Deliverability</h2>
        <div className="service-tagline">If your emails don&apos;t land, nothing else matters.</div>

        <p className="service-intro">We make sure your emails <strong>actually reach the inbox.</strong></p>

        <div className="list-group">
          <div className="list-group-title">What we handle</div>
          <ul className="service-list">
            <li>Domain authentication (SPF, DKIM, DMARC)</li>
            <li>Sending reputation management</li>
            <li>List hygiene and suppression strategy</li>
            <li>Engagement-based sending</li>
            <li>Warm-up strategies</li>
            <li>Spam trigger avoidance</li>
            <li>Inbox placement optimisation</li>
            <li>Monitoring open rates and deliverability health</li>
          </ul>
        </div>

        <div className="service-note"><strong>You stay out of spam. Your revenue stays intact.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="leadgen">
      <div className="service-left">
        <div className="service-number">05</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="leadgen" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Lead Generation</h2>
        <div className="service-tagline">No list = no revenue.</div>

        <p className="service-intro">We build systems that consistently turn <strong>traffic into subscribers and buyers.</strong></p>

        <div className="list-group">
          <div className="list-group-title">What we do</div>
          <ul className="service-list">
            <li>High-converting popups and forms</li>
            <li>Exit intent offers</li>
            <li>Discount and lead magnet strategy</li>
            <li>Landing pages</li>
            <li>Funnel optimisation</li>
            <li>Traffic to email capture flows</li>
            <li>Conversion optimisation</li>
          </ul>
        </div>

        <div className="service-note"><strong>Your list grows with intent, not just volume.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="platform">
      <div className="service-left">
        <div className="service-number">06</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
        <ServiceVisual type="platform" />
      </div>
      <div className="service-right">
        <h2 className="service-title">Platform Management</h2>
        <div className="service-tagline">We handle your entire email platform so nothing breaks and everything performs.</div>

        <p className="service-intro">You don&apos;t manage tools. <strong>We manage the system.</strong></p>

        <div className="list-group">
          <div className="list-group-title">Platforms we work with</div>
          <div className="tags">
            <span className="tag">Klaviyo</span>
            <span className="tag">Omnisend</span>
            <span className="tag">Mailchimp</span>
            <span className="tag">ActiveCampaign</span>
          </div>
        </div>

        <div className="list-group">
          <div className="list-group-title">What we manage</div>
          <ul className="service-list">
            <li>Full account setup</li>
            <li>Flow builds and maintenance</li>
            <li>Campaign execution</li>
            <li>Segmentation</li>
            <li>Analytics and reporting</li>
            <li>A/B testing</li>
            <li>Ongoing optimisation</li>
          </ul>
        </div>
      </div>
    </div>

</div>;
}

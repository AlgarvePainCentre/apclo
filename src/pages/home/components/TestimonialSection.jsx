export default function TestimonialSection() {
  return (
    <section className="home-section-testimonial">
      <div className="home-section-testimonial-inner">
        <div className="home-section-testimonial-copy">
          <p className="home-section-testimonial-eyebrow">Real stories, real relief</p>
          <h2 className="home-section-testimonial-title">
            “Algarve Pain Centre gave me back the freedom to move without fear.”
          </h2>
          <p className="home-section-testimonial-body">
            After years of living around chronic spine pain, Ana arrived at Algarve Pain Centre exhausted,
            anxious, and worried about losing her independence.
          </p>
          <p className="home-section-testimonial-body">
            Working closely with our spine specialists, pain medicine doctors, and rehab team,
            she followed a tailored plan that combined minimally invasive treatments with guided
            recovery. Today, she is back to walking, working, and enjoying time with her family.
          </p>
          <p className="home-section-testimonial-author">
            Ana, 54 — spine pain patient at Algarve Pain Centre
          </p>
          <div className="home-section-testimonial-services">
            <div className="home-section-testimonial-pill">Comprehensive pain assessment</div>
            <div className="home-section-testimonial-pill">Minimally invasive procedures</div>
            <div className="home-section-testimonial-pill">Ongoing rehabilitation support</div>
          </div>
        </div>
        <div className="home-section-testimonial-media">
          <div className="home-section-testimonial-video-wrapper" aria-hidden="true">
            {/* A lower-back photo for Ana's spine-pain story. The clip that was
                here (post-43) is the head-pain video, with "Head Pain" in the frame. */}
            <img
              className="home-section-testimonial-video-el home-section-testimonial-photo"
              src="/assets/images/lumbar-cards/DiscogenicPain.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

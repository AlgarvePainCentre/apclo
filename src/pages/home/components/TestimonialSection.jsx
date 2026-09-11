import { useEffect, useRef } from 'react';

export default function TestimonialSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const play = () => {
      const dataSrc = el.getAttribute('data-src');
      if (dataSrc && !el.getAttribute('src')) el.setAttribute('src', dataSrc);
      el.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
          } else {
            try {
              el.pause();
            } catch {}
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            <video
              ref={videoRef}
              className="home-section-testimonial-video-el"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/assets/images/illustrative/services-home-min-1.webp"
              data-src="/assets/videos/post-43.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

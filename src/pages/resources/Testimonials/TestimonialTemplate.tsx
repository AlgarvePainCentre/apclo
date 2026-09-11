import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/pages/resources/testimonials/testimonials-shared.css';
import '../../../styles/layout/article-layout.css';
import SocialShare from '../../../components/SocialShare';
import ManagedEmbed from '../../../components/ManagedEmbed';

export type TestimonialTemplateProps = {
  title: string;
  intro: string;
  storyHeading: string;
  story: string;
  ytId: string;
  heroImage: string;
  next: { to: string; title: string };
};

/**
 * Shared layout for patient testimonial pages: hero, story + YouTube video,
 * social share and a "next testimonial" link. Mirrors the original bespoke
 * testimonial pages so the ported testimonials stay visually consistent.
 */
const TestimonialTemplate: React.FC<TestimonialTemplateProps> = ({
  title,
  intro,
  storyHeading,
  story,
  ytId,
  heroImage,
  next,
}) => {
  React.useEffect(() => {
    document.title = `${title} | Algarve Pain Centre`;
  }, [title]);

  return (
    <main className="testimonial-page-main">
      <header className="article-hero" aria-label={title}>
        <div className="article-hero-media">
          <img src={heroImage} alt="" aria-hidden="true" />
          <div className="article-hero-content">
            <h2>{title}</h2>
            <p>{intro}</p>
          </div>
        </div>
      </header>

      <section className="page-section testimonial-video" aria-labelledby="testimonial-heading">
        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2 id="testimonial-heading">{storyHeading}</h2>
            <p>{story}</p>
          </div>
          <div className="testimonial-video-frame" aria-label="Patient story video">
            <ManagedEmbed
              className="testimonial-iframe"
              src={`https://www.youtube-nocookie.com/embed/${ytId}`}
              title="Patient story video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              openHref={`https://www.youtube.com/watch?v=${ytId}`}
            />
          </div>
        </div>
        <SocialShare />
      </section>

      <section className="article-navigation-container" aria-label="Article navigation">
        <Link
          className="article-nav-item next"
          aria-label={`Next testimonial: ${next.title}`}
          to={next.to}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/illustrative/services-home-min-1.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Next Testimonial</span>
            <h2 className="article-nav-title">
              {next.title} <span className="arrow">→</span>
            </h2>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default TestimonialTemplate;

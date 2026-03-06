import React from 'react';
import './OvercomingSciaticaPain.css';

const OvercomingSciaticaPainPage: React.FC = () => {
  return (
    <main className="overcoming-sciatica-pain-page">
      <section className="page-section sciatica-info" aria-labelledby="sciatica-heading">
        <div className="section-content">
          <div className="section-text-col">
            <h2 id="sciatica-heading">Understanding Sciatica</h2>
            <p className="intro-text">
              Sciatica refers to pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks and down each leg. Typically, sciatica affects only one side of your body.
            </p>
            
            <div className="info-grid">
              <div className="info-item">
                <h3>Common Causes</h3>
                <p>Sciatica most commonly occurs when a herniated disk, bone spur on the spine or narrowing of the spine (spinal stenosis) compresses part of the nerve. This causes inflammation, pain and often some numbness in the affected leg.</p>
              </div>
              <div className="info-item">
                <h3>Symptoms</h3>
                <p>Pain can range from a mild ache to a sharp, burning sensation or excruciating pain. Sometimes it can feel like a jolt or electric shock. You may also feel numbness, tingling or muscle weakness in the affected leg or foot.</p>
              </div>
              <div className="info-item full-width">
                <h3>Treatment Options</h3>
                <p>Although the pain associated with sciatica can be severe, most cases resolve with non-operative treatments in a few weeks. People who have severe sciatica that's associated with significant leg weakness or bowel or bladder changes might be candidates for surgery.</p>
              </div>
            </div>
          </div>
          <div className="section-image-col">
            <figure>
              <img src="/assets/images/learn/9-radiating-pain.jpg" alt="Illustration of sciatic nerve pain radiating down the leg" loading="lazy" />
              <figcaption>Visual representation of sciatic nerve pathways and pain radiation.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="page-section testimonial-video" aria-labelledby="testimonial-heading">
        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2 id="testimonial-heading">Patient Stories: Ghislaine's Journey</h2>
            <p>
              Ghislaine Renault shares her personal experience of living with and healing from sciatica and chronic back pain. 
              Discover how the Algarve Pain Centre's proximity-based medical approach and personalized care helped her find relief and reclaim her well-being.
            </p>
          </div>
          <div className="video-responsive">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/bkbLgNoKhkY?si=sciatica-story" 
              title="How Ghislaine lived and healed Sciatica and Back Pain" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OvercomingSciaticaPainPage;

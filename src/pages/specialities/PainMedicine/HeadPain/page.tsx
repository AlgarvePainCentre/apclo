import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import './HeadPain.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const HeadPainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page head-pain-page">
      <section className="hero">
        <div className="hero-video" aria-hidden="true">
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/assets/videos/banner-consulta-2.mp4"
          />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Head pain</h1>
            <p className="hero-subtitle">
              Head pain is a common health problem with a global prevalence of 47%.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for head pain"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>

      {/* Treatments overview section - Main of the page */}
      <main className="page-main head-pain-main">

        <section className="page-section treatments-overview">
          <div className="treatments-overview-header">

            <h2 className="treatments-overview-title">
              Treatments for head pain
            </h2>

            <p className="treatments-overview-subtitle">
              At Algarve Pain Centre, we offer a comprehensive range of treatments for head pain. Our team of experienced pain medicine specialists is dedicated to providing personalized care and effective solutions to help you find relief and improve your quality of life.
            </p>

          </div>

        {/* Container - Head Pain - first */} 
          <div className="treatments-overview-layout">
            <article className="treatments-overview-card">
              <h3 className="treatments-overview-card-title">
                Head pain overview
              </h3>
              <div className="treatments-overview-card-accent" />
              <p className="treatments-overview-card-body">
                Head pain is a common health problem with a global prevalence of 
                47% (symptoms occurring at least once in the past year) and 
                women are disproportionately affected (3:1). Many factors, 
                like stress, anxiety, injury and migraine can lead to 
                headaches. In European populations, the annual sex-adjusted 
                prevalence for tension-type headache is 35%, for migraine is 38%, 
                but for cluster headache is only 0.15%. 
                <br />
                Consequently, sometimes the high frequency and intensity of 
                headaches affects a patient’s quality of life and a diagnosis and 
                effective treatment make a huge difference to the patient and can be 
                very rewarding for the clinician. 
              </p>
  
            {/* Container - Media */} 
            </article>
            <div className="treatments-overview-media" aria-hidden="true">
              <div className="treatments-overview-media-inner" style={{ objectFit: 'cover' }}>
                <video
                  className="treatments-overview-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src="/assets/videos/post-43.mp4"
                />
              </div>
            </div>
          </div>
        </section>



      {/* Container - Head Pain - second */}
        <section className="page-section head-pain-treatment">
          <h2>Specialised treatments for facial pain</h2>
          <p>
            In addition to head pain, we also offer specialised treatments for facial pain. Whether it&apos;s
            a minor irritation or a more severe condition, our pain medicine specialists use advanced
            techniques to provide effective relief and restore your natural beauty.
          </p>
        </section>  

        <section className="page-section head-pain-treatment">
          <h2>Treatments for other types of pain</h2>
          <p>
            At Algarve Pain Centre, we understand that pain can manifest in various forms. Whether it&apos;s
            back pain, joint pain or sports-related injuries, our team of pain medicine specialists is here
            to help you find the right treatment to manage your pain effectively.
          </p>
        </section>
        
      </main>
    </div>
  );
};

export default HeadPainPage;

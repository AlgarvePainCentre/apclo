import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialShare from '../../../../components/SocialShare';
import '../Article.css';

const ConqueringCervicalPainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Conquering Cervical Pain | Algarve Pain Centre';
  }, []);

  return (
    <div className="article-page">
      <header className="article-hero">
        <div className="article-hero-content">
          <h1>Conquering Cervical Pain</h1>
          <p className="article-subtitle">Effective strategies and advanced therapies for managing and overcoming persistent neck pain.</p>
        </div>
      </header>
      
      <main className="article-main">
        <SocialShare />
        <section className="article-section">
          <h2>Taking Control of Your Comfort</h2>
          <p>
            Living with cervical pain can be debilitating, affecting your work, sleep, and overall quality of life. However, with the right approach, it is possible to manage symptoms effectively and regain functionality. A combination of lifestyle modifications, physical therapy, and medical interventions can provide significant relief.
          </p>
        </section>

        <section className="article-section">
          <h2>Lifestyle Modifications</h2>
          <p>Small changes in your daily routine can make a big difference:</p>
          <ul>
            <li><strong>Ergonomics:</strong> Ensure your computer monitor is at eye level. Use a chair with proper lumbar support and keep your feet flat on the floor.</li>
            <li><strong>Posture Check:</strong> Frequently check your posture throughout the day. Keep your shoulders back and your ears aligned with your shoulders.</li>
            <li><strong>Sleep Position:</strong> Use a pillow that keeps your neck aligned with your spine. Sleeping on your back or side is generally better for your neck than sleeping on your stomach.</li>
            <li><strong>Breaks:</strong> Take frequent breaks from desk work. Stand up, stretch, and move around every hour.</li>
          </ul>
        </section>

        <section className="article-section">
          <h2>Exercises and Physical Therapy</h2>
          <p>
            Strengthening and stretching the neck muscles is crucial for recovery. A physical therapist can design a personalized program, but common exercises include:
          </p>
          <ul>
            <li><strong>Neck Tilts:</strong> Gently tilting your head forward and to the sides to stretch the neck muscles.</li>
            <li><strong>Shoulder Rolls:</strong> Rolling your shoulders backward and forward to release tension in the upper back and neck.</li>
            <li><strong>Resistance Exercises:</strong> Using your hand to provide resistance while pushing your head against it to build strength.</li>
          </ul>
        </section>

        <section className="article-section">
          <h2>Medical Interventions</h2>
          <p>
            When conservative measures aren't enough, medical treatments may be necessary. These can range from pharmacological management to minimally invasive procedures like:
          </p>
          <ul>
            <li><strong>Injections:</strong> Corticosteroid injections or nerve blocks can provide temporary pain relief and reduce inflammation.</li>
            <li><strong>Radiofrequency Ablation:</strong> A procedure that uses heat to reduce pain signals from specific nerves.</li>
            <li><strong>Surgery:</strong> In severe cases involving nerve compression or structural instability, surgical options may be considered.</li>
          </ul>
        </section>
      </main>

      <section className="article-navigation-container">
        <div className="article-nav-item prev" onClick={() => navigate('/resources/learn/cervical-pain')}>
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Post</span>
            <h2 className="article-nav-title"><span className="arrow">←</span> Cervical Pain</h2>
          </div>
        </div>
        <div className="article-nav-item next" onClick={() => navigate('/resources/learn/acute-and-chronic-pain')}>
          <div className="article-nav-content">
            <span className="article-nav-label">Next Post</span>
            <h2 className="article-nav-title">Understanding Acute and Chronic Pain <span className="arrow">→</span></h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConqueringCervicalPainPage;

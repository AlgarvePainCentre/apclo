import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialShare from '../../../../components/SocialShare';
import '../Article.css';

const AcuteAndChronicPainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Understanding Acute and Chronic Pain | Algarve Pain Centre';
  }, []);

  return (
    <div className="article-page">
      <header className="article-hero">
        <div className="article-hero-content">
          <h1>Understanding Acute and Chronic Pain</h1>
          <p className="article-subtitle">Exploring the key differences and personalized treatment plans for your specific needs.</p>
        </div>
      </header>
      
      <main className="article-main">
        <SocialShare />
        <section className="article-section">
          <h2>Two Different Types of Pain</h2>
          <p>
            Pain is the body's warning system, signaling that something is wrong. However, not all pain is the same. Understanding the difference between acute and chronic pain is essential for effective diagnosis and treatment. While they may feel similar, their causes, duration, and treatment approaches differ significantly.
          </p>
        </section>

        <section className="article-section">
          <h2>Acute Pain: The Body's Alarm</h2>
          <p>
            Acute pain is a normal response to injury or illness. It starts suddenly and is usually sharp in quality. It serves as a warning of disease or a threat to the body.
          </p>
          <ul>
            <li><strong>Duration:</strong> Short-term, typically lasting less than 3 to 6 months.</li>
            <li><strong>Cause:</strong> Usually identifiable, such as a cut, broken bone, surgery, or infection.</li>
            <li><strong>Resolution:</strong> Generally disappears once the underlying cause is treated or healed.</li>
            <li><strong>Treatment:</strong> Often involves medication, rest, and treating the source of the injury.</li>
          </ul>
        </section>

        <section className="article-section">
          <h2>Chronic Pain: Persistent Signals</h2>
          <p>
            Chronic pain persists despite the fact that the injury has healed. Pain signals remain active in the nervous system for weeks, months, or even years. It can have physical effects (tense muscles, limited mobility) and emotional effects (depression, anxiety).
          </p>
          <ul>
            <li><strong>Duration:</strong> Long-term, lasting more than 3 to 6 months.</li>
            <li><strong>Cause:</strong> Can be due to an ongoing condition (like arthritis or cancer), or may have no clear cause (neurogenic pain).</li>
            <li><strong>Resolution:</strong> May not be "curable" in the traditional sense but can be managed.</li>
            <li><strong>Treatment:</strong> Requires a multidisciplinary approach including medication, physical therapy, psychological support, and lifestyle changes.</li>
          </ul>
        </section>

        <section className="article-section">
          <h2>The Transition</h2>
          <p>
            Sometimes, acute pain can turn into chronic pain. This transition can happen if the initial injury doesn't heal correctly, or if pain signals sensitize the nervous system, making it more reactive. Early intervention and effective management of acute pain are crucial in preventing the development of chronic pain syndromes.
          </p>
        </section>
      </main>

      <section className="article-navigation-container">
        <div className="article-nav-item prev" onClick={() => navigate('/resources/learn/conquering-cervical-pain')}>
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Post</span>
            <h2 className="article-nav-title"><span className="arrow">←</span> Conquering Cervical Pain</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcuteAndChronicPainPage;

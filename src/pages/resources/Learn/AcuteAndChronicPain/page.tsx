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

        <section className="article-section acute-pain-split-section">
          <h2 className="acute-pain-title">What is Acute Pain?</h2>
          <div className="acute-pain-content-grid">
            <div className="acute-pain-image">
              <img src="/assets/images/learn/5-injuries.jpg" alt="Acute Pain" />
            </div>
            <div className="acute-pain-text">
              <p>
                Acute pain is the body's immediate response to injury or tissue damage. It serves as a warning signal, alerting you to stop whatever is causing harm. This type of pain is usually sudden and sharp. It can result from a variety of situations, such as:
              </p>
              
              <h3 className="acute-characteristics-title">Characteristics of Acute Pain</h3>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Short Duration</span>
                <p>Acute pain typically lasts less than six months and subsides once the underlying cause is treated or healed.</p>
              </div>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Identifiable Cause</span>
                <p>The source of acute pain is usually clear and identifiable.</p>
              </div>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Protective Function</span>
                <p>Acute pain has a purpose—it signals you to rest and avoid further injury.</p>
              </div>
            </div>
          </div>
        </section>



        <section className="article-section chronic-pain-split-section">
          <h2 className="chronic-pain-title">What is Chronic Pain?</h2>
          <div className="chronic-pain-content-grid">
            <div className="chronic-pain-image">
              <img src="/assets/images/learn/chronic-pain_algarve-pain-center_004.jpg" alt="Chronic Pain" />
            </div>
            <div className="chronic-pain-text">
              <p>
                Chronic pain is different. It persists long after the injury has healed, with pain signals remaining active in the nervous system for weeks, months, or even years. It can have profound physical and emotional effects, impacting daily life.
              </p>
              
              <h3 className="chronic-characteristics-title">Characteristics of Chronic Pain</h3>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Long Duration</span>
                <p>Chronic pain typically lasts more than 3 to 6 months, continuing beyond normal healing time.</p>
              </div>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Complex Causes</span>
                <p>It can be caused by an ongoing condition like arthritis, or may have no clear cause at all.</p>
              </div>
              
              <div className="characteristic-item">
                <span className="characteristic-title">Persistent Signals</span>
                <p>The nervous system remains in a state of high reactivity, even without active tissue damage.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="article-section key-differences-section">
          <h2>Key Differences Between Acute and Chronic Pain</h2>
          <p className="section-subtitle">Understanding the distinctions between acute and chronic pain is essential for proper treatment and management:</p>
          
          <div className="differences-grid">
            <div className="difference-card">
              <div className="difference-content">
                <h3>Duration</h3>
                <div className="pain-type">
                  <h4>Acute Pain</h4>
                  <p>Short-term, typically lasting less than 3 to 6 months.</p>
                </div>
                <div className="pain-type">
                  <h4>Chronic Pain</h4>
                  <p>Long-term, lasting more than 3 to 6 months.</p>
                </div>
              </div>
              <div className="difference-image">
                <img src="/assets/images/learn/chronic-pain_algarve-pain-center_005.jpg" alt="Duration difference" />
              </div>
            </div>

            <div className="difference-card">
              <div className="difference-content">
                <h3>Cause</h3>
                <div className="pain-type">
                  <h4>Acute Pain</h4>
                  <p>Usually identifiable (injury, surgery, infection).</p>
                </div>
                <div className="pain-type">
                  <h4>Chronic Pain</h4>
                  <p>Ongoing conditions or sometimes unknown causes.</p>
                </div>
              </div>
              <div className="difference-image">
                <img src="/assets/images/learn/5-injuries.jpg" alt="Cause difference" />
              </div>
            </div>

            <div className="difference-card">
              <div className="difference-content">
                <h3>Resolution</h3>
                <div className="pain-type">
                  <h4>Acute Pain</h4>
                  <p>Disappears when the underlying cause is healed.</p>
                </div>
                <div className="pain-type">
                  <h4>Chronic Pain</h4>
                  <p>Persists beyond healing; often managed rather than cured.</p>
                </div>
              </div>
              <div className="difference-image">
                <img src="/assets/images/learn/chronic-pain_algarve-pain-center_004.jpg" alt="Resolution difference" />
              </div>
            </div>

            <div className="difference-card">
              <div className="difference-content">
                <h3>Treatment</h3>
                <div className="pain-type">
                  <h4>Acute Pain</h4>
                  <p>Medication, rest, and treating the injury source.</p>
                </div>
                <div className="pain-type">
                  <h4>Chronic Pain</h4>
                  <p>Multidisciplinary: therapy, lifestyle changes, support.</p>
                </div>
              </div>
              <div className="difference-image">
                <img src="/assets/images/learn/DSC07600.jpg" alt="Treatment difference" />
              </div>
            </div>
          </div>
        </section>

        <section className="article-section diagnosis-section">
          <h2>Diagnosis</h2>
          <p className="section-subtitle">
            Determining whether your pain is still acute or has transitioned to chronic can be essential for proper management and treatment. Here's a guide to help you understand the nature of your pain based on several key questions.
          </p>

          <div className="diagnosis-grid">
            <div className="diagnosis-card">
              <h3>Limits your daily life and activities?</h3>
              <div className="diagnosis-divider"></div>
              <p>
                While acute pain can temporarily limit activities, it usually improves as the cause resolves. Chronic pain, however, tends to have a more significant and long-term impact on daily life, often leading to limitations in routine activities and physical function.
              </p>
            </div>

            <div className="diagnosis-card">
              <h3>Causes anxiety, depression or mood changes?</h3>
              <div className="diagnosis-divider"></div>
              <p>
                Acute pain can cause temporary distress, but chronic pain often leads to ongoing emotional and psychological issues such as anxiety, depression, and mood changes due to its persistent and debilitating nature.
              </p>
            </div>

            <div className="diagnosis-card">
              <h3>Affects your sleeping quality and appetite?</h3>
              <div className="diagnosis-divider"></div>
              <p>
                Sleep disturbances and changes in appetite can occur with both acute and chronic pain, but chronic pain is more likely to cause prolonged issues with sleep quality and appetite, further affecting overall well-being.
              </p>
            </div>
          </div>
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

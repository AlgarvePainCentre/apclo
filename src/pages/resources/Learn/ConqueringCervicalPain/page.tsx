import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialShare from '../../../../components/SocialShare';
import '../../../../styles/layout/article-layout.css';

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

      <section className="article-section understanding-pain-section">
        <div className="understanding-pain-header">
          <h2>Understanding Cervical Pain</h2>
          <p>There are seven vertebrae in the cervical spine, which extends from the base of the skull to your shoulders. These vertebrae support your head and allow for its range of motion. Numerous things can cause cervical pain, including:</p>
        </div>
        <div className="understanding-pain-grid">
          <div className="understanding-card">
            <img src="/assets/images/learn/2-muscle-tension.webp" alt="Muscle Tension" />
            <h3>Muscle Tension</h3>
            <div className="title-underline"></div>
            <p>This condition is frequently brought on by stress, bad posture, or extended periods of inactivity, leading to sore neck muscles and back and neck aches.</p>
          </div>
          <div className="understanding-card">
            <img src="/assets/images/learn/3-improper-posture.webp" alt="Physiotherapy" />
            <h3>Physiotherapy</h3>
            <div className="title-underline"></div>
            <p>Bending forward or slouching can put excessive strain on the neck muscles, causing back and neck discomfort.</p>
          </div>
          <div className="understanding-card">
            <img src="/assets/images/learn/4-disc-problems.webp" alt="Disc Problems" />
            <h3>Disc Problems</h3>
            <div className="title-underline"></div>
            <p>Herniated or degenerated discs, known as cervical spondylotic disease, can cause pain by pressing on nerves, leading to pain in the upper back neck.</p>
          </div>
          <div className="understanding-card">
            <img src="/assets/images/learn/5-injuries.webp" alt="Injuries" />
            <h3>Injuries</h3>
            <div className="title-underline"></div>
            <p>Whiplash or other trauma can lead to acute cervical pain and neck strain.</p>
          </div>
        </div>
      </section>

      <div className="article-main">
        <section className="article-section symptoms-section">
          <div className="symptoms-header">
            <h2>Symptoms of Cervical Pain</h2>
            <p>The following are typical signs of cervical pain:</p>
          </div>
          <div className="symptoms-grid">
            <div className="symptom-card">
              <div className="symptom-content">
                <h3>Stiffness</h3>
                <p>Having trouble moving your neck, particularly after spending a lot of time sitting still or resting, can cause back and neck soreness.</p>
              </div>
              <div className="symptom-image">
                <img src="/assets/images/learn/6-stiffness.webp" alt="Stiffness" />
              </div>
            </div>
            <div className="symptom-card">
              <div className="symptom-content">
                <h3>Headaches</h3>
                <p>These frequently begin in the neck and work their way up, often due to upper back cervical pain.</p>
              </div>
              <div className="symptom-image">
                <img src="/assets/images/learn/7-headaches.webp" alt="Headaches" />
              </div>
            </div>
            <div className="symptom-card">
              <div className="symptom-content">
                <h3>Reduced Range of Motion</h3>
                <p>Difficulty tilting or rotating your head due to cervical and neck pain.</p>
              </div>
              <div className="symptom-image">
                <img src="/assets/images/learn/8-reduced-range.webp" alt="Reduced Range of Motion" />
              </div>
            </div>
            <div className="symptom-card">
              <div className="symptom-content">
                <h3>Radiating Pain</h3>
                <p>Discomfort that radiates to your upper back or down your arms, leading to lower back pain and neck strain.</p>
              </div>
              <div className="symptom-image">
                <img src="/assets/images/learn/9-radiating-pain.webp" alt="Radiating Pain" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="article-section pain-medicine-section">
        <div className="pain-medicine-header">
          <h2>Pain Medicine</h2>
          <p>At our clinic, we specialize in Pain Medicine, a field dedicated to understanding and treating the causes of pain. Our approach involves a thorough evaluation of each patient to uncover the root of their pain and develop an effective treatment plan.</p>
        </div>
        
        <h3 className="services-subtitle">Our Services Include</h3>
        
        <div className="pain-medicine-grid">
          <div className="pain-medicine-card">
            <img src="/assets/images/learn/chronic-pain_algarve-pain-center_004.webp" alt="Medications" />
            <h3>Medications</h3>
            <div className="title-underline"></div>
            <p>Tailored prescriptions to manage pain effectively.</p>
          </div>
          <div className="pain-medicine-card">
            <img src="/assets/images/learn/chronic-pain_algarve-pain-center_005.webp" alt="Physiotherapy" />
            <h3>Physiotherapy</h3>
            <div className="title-underline"></div>
            <p>Customised physical therapy to improve mobility and reduce discomfort.</p>
          </div>
          <div className="pain-medicine-card">
            <img src="/assets/images/learn/chronic-pain_algarve-pain-center_008.webp" alt="Minimally Invasive Procedures" />
            <h3>Minimally Invasive Procedures</h3>
            <div className="title-underline"></div>
            <p>Advanced techniques to alleviate pain without major surgery.</p>
          </div>
        </div>
      </section>

      <section className="article-section treatment-approaches-section">
        <h2 className="section-title-center">Our Treatment Approaches</h2>
        <div className="treatment-approaches-grid">
          <div className="treatment-card">
            <div className="treatment-icon">
              <img src="/assets/images/Icons-Specialities/Asset-S1.webp" alt="Pharmacological Management" />
            </div>
            <h3>Pharmacological Management</h3>
            <p>Pharmacological Management pain is commonly part of the treatment and a wide range of medicine can be used to manage pain.</p>
          </div>
          <div className="treatment-card">
            <div className="treatment-icon">
              <img src="/assets/images/Icons-Specialities/Asset-S2.webp" alt="Corticosteroid Injection" />
            </div>
            <h3>Corticosteroid Injection</h3>
            <p>Corticosteroid medications are used to reduce pain and inflammation and can be taken oral or through an injection</p>
          </div>
          <div className="treatment-card">
            <div className="treatment-icon">
              <img src="/assets/images/Icons-Specialities/Asset-S3.webp" alt="Radio-frequency" />
            </div>
            <h3>Radio-frequency</h3>
            <p>Radio-frequency ablation is a minimally invasive procedure guided for ultrasound or fluoroscopy.</p>
          </div>
          <div className="treatment-card">
            <div className="treatment-icon">
              <img src="/assets/images/Icons-Specialities/Asset-S4.webp" alt="Cryoablation" />
            </div>
            <h3>Cryoablation</h3>
            <p>Cryoablation is a specialized technique that freezes nerves to stop pain signals.</p>
          </div>
        </div>
      </section>

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

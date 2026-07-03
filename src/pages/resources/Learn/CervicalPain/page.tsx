import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialShare from '../../../../components/SocialShare';
import '../../../../styles/layout/article-layout.css';

const CervicalPainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cervical Pain | Algarve Pain Centre';
  }, []);

  return (
    <div className="article-page">
      <header className="article-hero">
        <div className="article-hero-content">
          <h1>Cervical Pain</h1>
          <p className="article-subtitle">Understanding the causes, symptoms, and comprehensive treatment options for neck pain.</p>
        </div>
      </header>
      
      <main className="article-main">
        <SocialShare />
        <section className="article-section">
          <h2>What is Cervical Pain?</h2>
          <p>
            Cervical pain, commonly referred to as neck pain, is a discomfort located in the cervical spine—the area of the spine found in the neck. The cervical spine consists of seven vertebrae (C1-C7) separated by intervertebral discs that allow for movement and shock absorption.
          </p>
          <p>
            While often associated with poor posture or muscle strain, cervical pain can also be a symptom of underlying conditions affecting the bones, discs, nerves, or soft tissues of the neck.
          </p>
        </section>

        <section className="article-section">
          <h2>Common Causes</h2>
          <p>Several factors can contribute to the development of cervical pain:</p>
          <ul>
            <li><strong>Muscle Strain:</strong> Overuse, such as too many hours hunched over a computer or smartphone ("tech neck"), often triggers muscle strains.</li>
            <li><strong>Worn Joints:</strong> Just like the other joints in your body, your neck joints tend to wear down with age. Osteoarthritis causes the cushions (cartilage) between your bones (vertebrae) to deteriorate.</li>
            <li><strong>Nerve Compression:</strong> Herniated disks or bone spurs in the vertebrae of your neck can press on the nerves branching out from the spinal cord.</li>
            <li><strong>Injuries:</strong> Rear-end auto collisions often result in whiplash injury, which occurs when the head is jerked backward and then forward, straining the soft tissues of the neck.</li>
          </ul>
        </section>

        <section className="article-section">
          <h2>Symptoms</h2>
          <p>Signs and symptoms of cervical pain include:</p>
          <ul>
            <li>Pain that's often worsened by holding your head in one place for long periods, such as when driving or working at a computer.</li>
            <li>Muscle tightness and spasms.</li>
            <li>Decreased ability to move your head.</li>
            <li>Headache.</li>
            <li>Numbness, tingling, or weakness in the arm or hand (radiculopathy).</li>
          </ul>
        </section>

        <section className="article-section posture-correction">
          <h2>Posture Correction</h2>
          <p>Maintaining good posture can significantly reduce cervical pain:</p>
          
          <div className="posture-grid">
            <div className="posture-card">
              <div className="posture-content">
                <h3>Sitting</h3>
                <p>Keep your back straight and shoulders back. Ensure your feet are flat on the floor.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-1.webp" alt="Sitting posture" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Standing</h3>
                <p>Distribute your weight evenly on both feet. Avoid slouching.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-2.webp" alt="Standing posture" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Sleeping</h3>
                <p>Use a pillow that supports the natural curve of your neck.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-3.webp" alt="Sleeping posture" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Stretching and Exercising</h3>
                <p>Regularly stretching and strengthening your neck muscles can alleviate pain.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-4.webp" alt="Stretching and exercising" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Neck Stretching</h3>
                <p>Gently tilt your head forward, backward, and side to side to relieve back and neck discomfort.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-5.webp" alt="Neck stretching" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Strengthening Exercises</h3>
                <p>Perform chin tucks and shoulder shrugs to build muscle support and reduce upper back cervical pain.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/Artboard-1-1.webp" alt="Strengthening exercises" />
              </div>
            </div>
          </div>
        </section>

        <section className="article-section heat-ice-therapy">
          <h2>Heat and Ice Therapy</h2>
          <p>Applying heat or ice can help manage pain and inflammation:</p>
          
          <div className="posture-grid">
            <div className="posture-card">
              <div className="posture-content">
                <h3>Heat Packs</h3>
                <p>Use a warm towel or heating pad for 15-20 minutes to relax tight muscles.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/DSC06795-1.webp" alt="Heat Packs" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Ice Packs</h3>
                <p>Apply an ice pack wrapped in a cloth for 15-20 minutes to reduce inflammation.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/DSC06795-2.webp" alt="Ice Packs" />
              </div>
            </div>
          </div>
        </section>

        <section className="article-section ergonomics">
          <h2>Ergonomics</h2>
          <p>Creating an ergonomic workspace can prevent neck strain:</p>
          
          <div className="posture-grid">
            <div className="posture-card">
              <div className="posture-content">
                <h3>Desk Setup</h3>
                <p>Keep your computer at eye level. Use a chair that supports your lower back.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/DSC06650.webp" alt="Desk Setup" />
              </div>
            </div>

            <div className="posture-card">
              <div className="posture-content">
                <h3>Frequent Breaks</h3>
                <p>Take short breaks to stretch and move around.</p>
              </div>
              <div className="posture-image">
                <img src="/assets/images/learn/DSC06795.webp" alt="Frequent Breaks" />
              </div>
            </div>
          </div>
        </section>

        <section className="article-section myth-busting">
          <h2>Myth Busting</h2>
          <p>Let's debunk some common myths about cervical pain:</p>
          
          <div className="myth-grid">
            <div className="myth-card">
              <span className="myth-label">MYTH</span>
              <h3>Rest is always the best remedy</h3>
              <div className="myth-divider"></div>
              <p>While rest can help in the short term, too much inactivity can weaken muscles and exacerbate pain.</p>
            </div>

            <div className="myth-card">
              <span className="myth-label">MYTH</span>
              <h3>Only older adults get cervical pain</h3>
              <div className="myth-divider"></div>
              <p>Cervical pain can affect people of all ages, especially with the rise of "tech neck" from prolonged device use.</p>
            </div>

            <div className="myth-card">
              <span className="myth-label">MYTH</span>
              <h3>Neck cracking relieves pain permanently</h3>
              <div className="myth-divider"></div>
              <p>While it may provide temporary relief, habitual neck cracking can strain ligaments and lead to instability over time.</p>
            </div>
          </div>
        </section>
      </main>

      <section className="article-navigation-container">
        <div className="article-nav-item next" onClick={() => navigate('/resources/learn/conquering-cervical-pain')}>
          <div className="article-nav-content">
            <span className="article-nav-label">Next Post</span>
            <h2 className="article-nav-title">Conquering Cervical Pain <span className="arrow">→</span></h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CervicalPainPage;

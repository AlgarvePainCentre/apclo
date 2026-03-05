import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TipsForSelfCare.css';

// --- Interactive Components ---

const PhysicalWellnessChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Take a 10-minute walk', checked: false },
    { id: 2, text: 'Stretch for 5 minutes', checked: false },
    { id: 3, text: 'Stand up every hour', checked: false },
    { id: 4, text: 'Correct your posture', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="interactive-card">
      <h3>🏃‍♂️ Daily Movement Goals</h3>
      <div className="progress-bar-container" style={{ marginBottom: '1rem', background: '#e2e8f0', borderRadius: '4px', height: '8px' }}>
        <div style={{ width: `${progress}%`, background: 'var(--color-blue)', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }} />
      </div>
      <div className="checklist" role="group" aria-label="Daily Movement Goals Checklist">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`checklist-item ${item.checked ? 'checked' : ''}`}
            onClick={() => toggleItem(item.id)}
            role="checkbox"
            aria-checked={item.checked}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(item.id); } }}
          >
            <div className="checkbox" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b' }}>
        {progress === 100 ? 'Great job! You stayed active today!' : `${progress}% complete`}
      </p>
    </div>
  );
};

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { emoji: '😄', label: 'Happy', message: "That's wonderful! Keep that positive energy flowing." },
    { emoji: '😐', label: 'Neutral', message: "A balanced state is a good place to be." },
    { emoji: '😫', label: 'Stressed', message: "Take a deep breath. It's okay to take a break." },
    { emoji: '😢', label: 'Sad', message: "Be gentle with yourself today. You are doing your best." },
    { emoji: '😴', label: 'Tired', message: "Listen to your body. Rest is productive too." },
  ];

  return (
    <div className="interactive-card">
      <h3>🧠 Mood Check-in</h3>
      <div className="mood-grid" role="group" aria-label="Select your current mood">
        {moods.map(mood => (
          <button
            key={mood.label}
            type="button"
            className={`mood-btn ${selectedMood === mood.label ? 'selected' : ''}`}
            onClick={() => setSelectedMood(mood.label)}
            aria-label={`I feel ${mood.label}`}
            aria-pressed={selectedMood === mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="mood-message" role="status">
          {moods.find(m => m.label === selectedMood)?.message}
        </div>
      )}
    </div>
  );
};

const HydrationTracker: React.FC = () => {
  const [glasses, setGlasses] = useState(0);
  const goal = 8;

  return (
    <div className="interactive-card">
      <h3>💧 Hydration Tracker</h3>
      <div className="water-tracker">
        <div className="water-visual" role="img" aria-label={`Hydration progress: ${glasses} out of ${goal} glasses`}>
          {Array.from({ length: goal }).map((_, i) => (
            <span 
              key={i} 
              className={`water-glass ${i < glasses ? 'filled' : ''}`}
              onClick={() => setGlasses(i + 1)}
              role="button"
              aria-label={`Mark ${i + 1} glasses drank`}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setGlasses(i + 1); } }}
            >
              🥤
            </span>
          ))}
        </div>
        <div className="water-controls">
          <button type="button" onClick={() => setGlasses(Math.max(0, glasses - 1))} disabled={glasses === 0} aria-label="Decrease water count">-</button>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 1rem' }} aria-live="polite">{glasses} / {goal}</span>
          <button type="button" onClick={() => setGlasses(Math.min(goal, glasses + 1))} disabled={glasses === goal} aria-label="Increase water count">+</button>
        </div>
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          Drinking enough water improves energy and focus.
        </p>
      </div>
    </div>
  );
};

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      const cycle = () => {
        setPhase('Inhale');
        timerRef.current = setTimeout(() => {
          setPhase('Hold');
          timerRef.current = setTimeout(() => {
            setPhase('Exhale');
          }, 2000); // Hold for 2s
        }, 4000); // Inhale for 4s
      };
      
      cycle();
      const interval = setInterval(cycle, 10000); // Total 10s cycle (4+2+4)
      return () => {
        clearInterval(interval);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      setPhase('Inhale');
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isActive]);

  return (
    <div className="interactive-card">
      <h3>🌬️ 4-7-8 Breathing</h3>
      <div 
        className={`breathing-circle ${isActive ? (phase === 'Inhale' ? 'inhale' : phase === 'Exhale' ? 'exhale' : '') : ''}`}
        aria-live="polite"
        role="status"
      >
        {isActive ? phase : 'Ready?'}
      </div>
      <div className="breathing-controls">
        <button className="btn-primary" type="button" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Stop' : 'Start Breathing'}
        </button>
      </div>
    </div>
  );
};

const SleepHygieneChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Stop caffeine 6 hours before bed', checked: false },
    { id: 2, text: 'Dim lights 1 hour before sleep', checked: false },
    { id: 3, text: 'Put phone away', checked: false },
    { id: 4, text: 'Room temperature cool (18-20°C)', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="interactive-card">
      <h3>😴 Bedtime Routine</h3>
      <div className="checklist" role="group" aria-label="Bedtime Routine Checklist">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`checklist-item ${item.checked ? 'checked' : ''}`}
            onClick={() => toggleItem(item.id)}
            role="checkbox"
            aria-checked={item.checked}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(item.id); } }}
          >
            <div className="checkbox" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialConnection: React.FC = () => {
  const [goalSet, setGoalSet] = useState(false);
  
  return (
    <div className="interactive-card">
      <h3>🤝 Connection Goal</h3>
      {!goalSet ? (
        <div style={{ textAlign: 'center' }}>
          <p>Who will you connect with today?</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
            <button className="btn-primary" type="button" onClick={() => setGoalSet(true)}>Call a Friend</button>
            <button className="btn-primary" type="button" onClick={() => setGoalSet(true)}>Family Dinner</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <p style={{ fontSize: '3rem', margin: 0 }} role="img" aria-label="Star">🌟</p>
          <p>Commitment made! Connecting with others boosts oxytocin and lowers stress.</p>
          <button 
            type="button" 
            style={{ marginTop: '1rem', textDecoration: 'underline', background: 'none', border: 'none', color: 'var(--color-blue)', cursor: 'pointer', fontSize: '1rem', padding: '1rem' }} 
            onClick={() => setGoalSet(false)}
          >
            Reset Goal
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

const TipsForSelfCarePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'physical', label: 'Physical Wellness' },
    { id: 'mental', label: 'Mental Health' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'sleep', label: 'Sleep Hygiene' },
    { id: 'stress', label: 'Stress Management' },
    { id: 'social', label: 'Social Connections' },
  ];

  return (
    <main className="tips-for-self-care-page">
      {/* Hero Section */}
      <section className="self-care-hero">
        <video 
          className="self-care-hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
          src="/assets/videos/banner-consulta-2.mp4" 
        />
        <div className="self-care-hero-content">
          <h1>Tips for Self-Care</h1>
          <p>Empower your recovery and enhance your daily life with actionable guidance for your mind and body.</p>
        </div>
      </section>

      {/* Navigation */}
      <nav className="self-care-nav" aria-label="Self-care topics">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section 1: Physical Wellness */}
      <section id="physical" className="self-care-section">
        <div className="section-container">
          <div className="section-content">
            <h2>Physical Wellness</h2>
            <p>
              Taking care of your body is fundamental to overall well-being. Regular movement, 
              even if gentle, helps maintain flexibility, strength, and energy levels. 
              Listen to your body and engage in activities that feel good.
            </p>
            <ul>
              <li>Aim for at least 30 minutes of moderate activity daily.</li>
              <li>Incorporate stretching to improve circulation and reduce tension.</li>
              <li>Take regular breaks if you have a sedentary job.</li>
            </ul>
          </div>
          <PhysicalWellnessChecklist />
        </div>
      </section>

      {/* Section 2: Mental Health */}
      <section id="mental" className="self-care-section">
        <div className="section-container">
          <MoodTracker />
          <div className="section-content">
            <h2>Mental Health</h2>
            <p>
              Your mental health is just as important as your physical health. 
              Practicing mindfulness and acknowledging your emotions can help you navigate 
              life's challenges with greater resilience.
            </p>
            <p>
              Take time each day to check in with yourself. Journaling, meditation, 
              or simply sitting in silence can provide clarity and peace.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Nutrition */}
      <section id="nutrition" className="self-care-section">
        <div className="section-container">
          <div className="section-content">
            <h2>Nutrition & Hydration</h2>
            <p>
              What you eat and drink fuels your body and mind. A balanced diet rich in 
              whole foods supports immune function and energy levels. Hydration is key 
              for cognitive function and physical performance.
            </p>
            <ul>
              <li>Eat a rainbow of fruits and vegetables.</li>
              <li>Limit processed foods and added sugars.</li>
              <li>Drink water consistently throughout the day.</li>
            </ul>
          </div>
          <HydrationTracker />
        </div>
      </section>

      {/* Section 4: Sleep Hygiene */}
      <section id="sleep" className="self-care-section">
        <div className="section-container">
          <SleepHygieneChecklist />
          <div className="section-content">
            <h2>Sleep Hygiene</h2>
            <p>
              Quality sleep is the foundation of health. It allows your body to repair 
              and your brain to process information. Establishing a consistent sleep 
              routine can significantly improve your sleep quality.
            </p>
            <p>
              Try to go to bed and wake up at the same time every day, even on weekends. 
              Create a relaxing pre-sleep ritual to signal to your body that it's time to wind down.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Stress Management */}
      <section id="stress" className="self-care-section">
        <div className="section-container">
          <div className="section-content">
            <h2>Stress Management</h2>
            <p>
              Chronic stress can take a toll on your health. Learning to manage stress 
              through relaxation techniques can lower blood pressure, reduce anxiety, 
              and improve mood.
            </p>
            <p>
              Deep breathing exercises, like the 4-7-8 technique, can activate your 
              parasympathetic nervous system and induce a state of calm.
            </p>
          </div>
          <BreathingExercise />
        </div>
      </section>

      {/* Section 6: Social Connections */}
      <section id="social" className="self-care-section">
        <div className="section-container">
          <SocialConnection />
          <div className="section-content">
            <h2>Social Connections</h2>
            <p>
              Humans are social creatures. Strong relationships and a sense of community 
              are vital for emotional well-being. Connecting with others can provide support, 
              reduce feelings of loneliness, and increase happiness.
            </p>
            <p>
              Make an effort to reach out to friends and family. Join a club or group 
              that shares your interests. Quality connections matter more than quantity.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section" id="learn">
          <div className="section-header">
            <h2>Learn</h2>
            <p>Expert advice, research updates, and health news.</p>
          </div>
          <div className="learn-grid">
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/specialities/head/head-1.jpg" 
                  alt="Person touching their neck in pain" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 15, 2024</span>
                  <span className="learn-read-time">5 min read</span>
                </div>
                <h3>Cervical Pain</h3>
                <p>Learn about the causes, symptoms, and comprehensive treatment options for cervical spine pain to restore mobility and comfort.</p>
                <button className="learn-read-more" onClick={() => navigate('/specialities/pain-medicine/cervical-spine-pain')} aria-label="Read more about Cervical Pain">
                  Read More
                </button>
              </div>
            </article>
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/treatment-img/SpinePain.jpg" 
                  alt="Detailed view of spine structure" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 10, 2024</span>
                  <span className="learn-read-time">7 min read</span>
                </div>
                <h3>Conquering Cervical Pain</h3>
                <p>Discover effective strategies and advanced therapies for managing and overcoming persistent cervical pain in your daily life.</p>
                <button className="learn-read-more" onClick={() => navigate('/resources/learn/blog')} aria-label="Read more about Conquering Cervical Pain">
                  Read More
                </button>
              </div>
            </article>
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/treatment-img/KneePain.jpg" 
                  alt="Person holding their knee in pain" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 5, 2024</span>
                  <span className="learn-read-time">6 min read</span>
                </div>
                <h3>Understanding Acute and Chronic Pain</h3>
                <p>Explore the key differences between acute and chronic pain and how personalized treatment plans can address your specific needs.</p>
                <button className="learn-read-more" onClick={() => navigate('/resources/learn/blog')} aria-label="Read more about Understanding Acute and Chronic Pain">
                  Read More
                </button>
              </div>
            </article>
          </div>
        </section>
    </main>
  );
};

export default TipsForSelfCarePage;

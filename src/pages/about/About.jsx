import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './About.css';

const doctorsData = [
  // Large Cards (Top Row)
  {
    id: 'miguel-costa',
    name: 'Dr. Miguel Costa',
    roles: ['Physical Rehabilitation', 'Sports Medicine'],
    image: '/assets/images/learn/DSC06650.jpg',
    isLarge: true,
    bio: 'Dr. Miguel Costa is a leading specialist in Physical Rehabilitation and Sports Medicine with over 15 years of experience helping athletes and patients recover from complex injuries. His approach combines cutting-edge rehabilitation techniques with a deep understanding of biomechanics.',
    education: [
      'Medical Degree - University of Lisbon',
      'Specialization in Physical Medicine and Rehabilitation',
      'Post-graduate in Sports Medicine'
    ],
    experience: '15+ Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    id: 'ricardo-frada',
    name: 'Dr. Ricardo Frada',
    roles: ['Orthopaedic Surgery'],
    image: '/assets/images/learn/DSC06665.jpg',
    isLarge: true,
    bio: 'Dr. Ricardo Frada is a renowned Orthopaedic Surgeon specializing in joint replacement and arthroscopic surgery. He is dedicated to providing personalized care plans that focus on restoring mobility and improving quality of life for his patients.',
    education: [
      'Medical Degree - University of Porto',
      'Specialization in Orthopaedic Surgery',
      'Fellowship in Joint Reconstruction'
    ],
    experience: '12+ Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#', facebook: '#' }
  },
  {
    id: 'miguel-batista',
    name: 'Dr. Miguel Batista',
    roles: ['Neuroradiology'],
    image: '/assets/images/learn/DSC06687.jpg',
    isLarge: true,
    bio: 'Dr. Miguel Batista is an expert in Neuroradiology, focusing on the diagnosis and treatment of disorders affecting the nervous system. His precise diagnostic skills are crucial in formulating effective treatment strategies for chronic pain conditions.',
    education: [
      'Medical Degree - University of Coimbra',
      'Specialization in Neuroradiology',
      'Advanced Training in Interventional Radiology'
    ],
    experience: '10+ Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#', twitter: '#' }
  },
  // Small Cards (Bottom Grid)
  {
    id: 'lisa-budruus',
    name: 'Dr. Lisa Budruus',
    roles: ['Orthopaedic Surgery', 'Manual Therapy'],
    isLarge: false,
    bio: 'Dr. Lisa Budruus combines her expertise in Orthopaedic Surgery with Manual Therapy to offer comprehensive musculoskeletal care. She believes in a holistic approach to pain management.',
    education: ['Medical Degree - University of Munich', 'Specialization in Orthopaedics'],
    experience: '8 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'joao-moreira',
    name: 'Dr. João Moreira',
    roles: ['Sports Medicine', 'Physical Medicine & Rehabilitation'],
    isLarge: false,
    bio: 'Dr. João Moreira specializes in sports injuries and rehabilitation, helping patients return to their peak performance levels safely and effectively.',
    education: ['Medical Degree - University of Lisbon'],
    experience: '6 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'jonathan-rios',
    name: 'Dr. Jonathan Rios',
    roles: ['Sports Medicine', 'Physical Medicine & Rehabilitation'],
    isLarge: false,
    bio: 'Dr. Jonathan Rios is dedicated to sports medicine and rehabilitation, focusing on non-surgical treatments for musculoskeletal conditions.',
    education: ['Medical Degree - University of Lisbon'],
    experience: '7 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'jaime-pamplona',
    name: 'Dr. Jaime Pamplona',
    roles: ['Neuroradiology'],
    isLarge: false,
    bio: 'Dr. Jaime Pamplona is a specialist in Neuroradiology with a focus on advanced imaging techniques to diagnose complex pain conditions.',
    education: ['Medical Degree - University of Porto'],
    experience: '11 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'edgar-semedo',
    name: 'Dr. Edgar Semedo',
    roles: ['Anesthesiologist'],
    isLarge: false,
    bio: 'Dr. Edgar Semedo is an experienced Anesthesiologist specializing in pain management and perioperative care.',
    education: ['Medical Degree - University of Coimbra'],
    experience: '14 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'javier-duran',
    name: 'Dr. Javier Duran',
    roles: ['Neuroradiology'],
    isLarge: false,
    bio: 'Dr. Javier Duran brings extensive experience in Neuroradiology, contributing to the precise diagnosis and treatment planning for our patients.',
    education: ['Medical Degree - University of Madrid'],
    experience: '9 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'tomas-teixeira',
    name: 'Tomás Teixeira',
    roles: ['Physiotherapist'],
    isLarge: false,
    bio: 'Tomás Teixeira is a dedicated Physiotherapist with a passion for helping patients regain mobility and strength through personalized therapy plans.',
    education: ['Degree in Physiotherapy'],
    experience: '5 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { instagram: '#' }
  },
  {
    id: 'joao-encarnacao',
    name: 'João Encarnação',
    roles: ['Physiotherapist'],
    isLarge: false,
    bio: 'João Encarnação specializes in musculoskeletal physiotherapy, utilizing manual therapy and exercise prescription to treat pain and dysfunction.',
    education: ['Degree in Physiotherapy'],
    experience: '4 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'goncalo-verissimo',
    name: 'Gonçalo Veríssimo',
    roles: ['Physiotherapist'],
    isLarge: false,
    bio: 'Gonçalo Veríssimo focuses on sports physiotherapy and rehabilitation, helping athletes of all levels prevent and recover from injuries.',
    education: ['Degree in Physiotherapy'],
    experience: '6 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { instagram: '#' }
  },
  {
    id: 'jaqueline-lopes',
    name: 'Jaqueline Lopes',
    roles: ['Occupational Therapist'],
    isLarge: false,
    bio: 'Jaqueline Lopes is an Occupational Therapist dedicated to helping patients achieve independence in their daily activities through therapeutic interventions.',
    education: ['Degree in Occupational Therapy'],
    experience: '7 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'hugo-baltazar',
    name: 'Hugo Baltazar',
    roles: ['Occupational Therapist'],
    isLarge: false,
    bio: 'Hugo Baltazar specializes in occupational therapy, focusing on ergonomic assessments and workplace injury prevention.',
    education: ['Degree in Occupational Therapy'],
    experience: '8 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'susana-mestre',
    name: 'Susana Mestre',
    roles: ['Speech Therapist'],
    isLarge: false,
    bio: 'Susana Mestre is a Speech Therapist who works with patients to assess and treat speech, language, and swallowing disorders.',
    education: ['Degree in Speech Therapy'],
    experience: '10 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  },
  {
    id: 'catarina-prudencio',
    name: 'Catarina Prudêncio',
    roles: ['Clinical Process Manager'],
    isLarge: false,
    bio: 'Catarina Prudêncio manages clinical processes, ensuring smooth operations and high-quality patient care coordination.',
    education: ['Degree in Health Management'],
    experience: '6 Years',
    contact: { email: 'info@algarvepaincentre.com', phone: '+351 915 915 001' },
    social: { linkedin: '#' }
  }
];

const DoctorSidebar = ({ doctor, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!doctor) return null;

  return (
    <>
      <div 
        className={`doctor-sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`doctor-sidebar ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${doctor.name}`}
      >
        <button 
          className="sidebar-close-btn" 
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="sidebar-content">
          <div className="sidebar-header">
            {doctor.image && (
              <div className="sidebar-image-wrapper">
                <img src={doctor.image} alt={doctor.name} />
              </div>
            )}
            <h2 className="sidebar-name">{doctor.name}</h2>
            <div className="sidebar-roles">
              {doctor.roles.map((role, idx) => (
                <span key={idx} className="sidebar-role">{role}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-body">
            <div className="sidebar-section">
              <h3>About</h3>
              <p>{doctor.bio}</p>
            </div>

            <div className="sidebar-section">
              <h3>Education</h3>
              <ul className="sidebar-list">
                {doctor.education.map((edu, idx) => (
                  <li key={idx}>{edu}</li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>Experience</h3>
              <p>{doctor.experience}</p>
            </div>

            <div className="sidebar-section">
              <h3>Contact</h3>
              <p className="contact-item">
                <span className="contact-label">Email:</span> 
                <a href={`mailto:${doctor.contact.email}`}>{doctor.contact.email}</a>
              </p>
              <p className="contact-item">
                <span className="contact-label">Phone:</span> 
                <a href={`tel:${doctor.contact.phone}`}>{doctor.contact.phone}</a>
              </p>
            </div>

            {doctor.social && Object.keys(doctor.social).length > 0 && (
              <div className="sidebar-section">
                <h3>Connect</h3>
                <div className="sidebar-social-links">
                  {doctor.social.linkedin && (
                    <a href={doctor.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {doctor.social.twitter && (
                    <a href={doctor.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                  )}
                  {doctor.social.facebook && (
                    <a href={doctor.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                  )}
                  {doctor.social.instagram && (
                    <a href={doctor.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function About() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    const heroVideoEl = heroVideoRef.current;
    if (!heroEl || !heroVideoEl) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion || isMobile) {
      return undefined;
    }

    let ticking = false;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;
      const heroRect = heroEl.getBoundingClientRect();
      const heroProgress = Math.min(Math.max(heroRect.top / viewportHeight, -1), 1);
      const heroOffset = heroProgress * -110;
      heroVideoEl.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      heroVideoEl.style.transform = '';
    };
  }, []);

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    // Small delay to allow component to mount before animating in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSidebarOpen(true);
      });
    });
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedDoctor(null), 300); // Wait for transition
  };

  const largeCards = doctorsData.filter(d => d.isLarge);
  const smallCards = doctorsData.filter(d => !d.isLarge);

  return (
    <div className="page">
      <Navbar />
      <section className="hero" ref={heroRef}>
        <div className="hero-video" aria-hidden="true" ref={heroVideoRef}>
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/assets/videos/banner-About.mp4"
          />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">About Algarve Pain Centre</h1>
            <p className="hero-subtitle">
              Learn more about the team, mission and values behind your care.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Specialised care, built around your life.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment to meet our team"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main">

        <section className="page-section the-centre">
          <div className="section-content">

             <div className="section-text-col">

                <div className="section-title-col">
                  <h2>Who we are</h2>
                </div>
                <div className="section-text-col">
                  <p>Our clinic has a group of professionals specialized in different areas of health such as Pain Medicine, Sports Medicine, Physical Medicine and Rehabilitation.</p>
                  <p>Our professionals focus on fundamental values, such as quality and safety, empathy, teamwork, integrity, inclusion and innovation, as we believe that this is the only way we will be able to provide better healthcare and have a greater and better impact on our patients’ lives.</p>
                </div>

                <div className="section-title-col">
                  <h2>The centre</h2>
                </div>
                <div className="section-text-col">
                  <p>Located in one of the most beautiful regions of Portugal and one of the most luxurious tourist developments in Europe, our clinic is located inside Family Medical Centre from Dr. Thomas Kaiser, at Av. do Mar, Vale do Lobo, Algarve, We have all the necessary facilities for your well-being.</p>
                </div>

            </div>

            <div className="section-video-col">
              <video
                alt="Vale do Lobo Algarve" loading="lazy"
                className="section-image-el"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/assets/videos/clinica-2.mov"
              />

            </div>
          
          </div>
        </section>

        <section className="page-section team-section">

           <div className="team-grid-top">
              {largeCards.map(doctor => (
                <div 
                  key={doctor.id} 
                  className="team-card-large clickable-card"
                  onClick={() => handleCardClick(doctor)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(doctor);
                    }
                  }}
                  aria-label={`View details for ${doctor.name}`}
                >
                   <div className="team-image-wrapper">
                      <img src={doctor.image} alt={doctor.name} loading="lazy" />
                   </div>
                   <div className="team-info">
                      <h3>{doctor.name}</h3>
                      {doctor.roles.map((role, idx) => (
                        <p key={idx} className="team-role">{role}</p>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           <div className="team-grid-bottom">
              {smallCards.map(doctor => (
                <div 
                  key={doctor.id} 
                  className="team-card-small clickable-card"
                  onClick={() => handleCardClick(doctor)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(doctor);
                    }
                  }}
                  aria-label={`View details for ${doctor.name}`}
                >
                   <h3>{doctor.name}</h3>
                   {doctor.roles.map((role, idx) => (
                     <p key={idx}>{role}</p>
                   ))}
                </div>
              ))}
           </div>
        </section>
      </main>
      <Footer />
      <DoctorSidebar 
        doctor={selectedDoctor} 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
      />
    </div>
  );
}

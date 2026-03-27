import { useNavigate } from 'react-router-dom';
import { doctorsData } from '../../data/doctorsData';
import '../home/Home.css';
import './About.css';

export default function About() {
  const navigate = useNavigate();

  const handleCardClick = (doctor) => {
    navigate(`/doctor/${doctor.id}`);
  };

  const largeCards = doctorsData.filter(d => d.isLarge);
  const smallCards = doctorsData.filter(d => !d.isLarge);

  return (
    <div className="about-page">
      <header className="psx-hero about-hero" aria-label="About hero section">
        <div className="psx-hero-backdrop video-bg" aria-hidden="true">
          <video
            className="psx-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/illustrative/services-home-min-1.jpg"
          >
            <source src="/assets/videos/banner-About.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">About</p>
          <h1 className="psx-hero-title">About Algarve Pain Centre</h1>
          <p className="psx-hero-subtitle">
            Learn more about the team, mission and values behind your care.
          </p>
          <div className="psx-hero-actions">
            <button
              type="button"
              className="psx-btn-primary"
              aria-label="Book an appointment to meet our team"
              onClick={() => navigate('/contact')}
            >
              <span>Book an appointment</span>
            </button>
          </div>
        </div>
      </header>
      <main className="page-main">

        <section className="page-section the-centre">
          <div className="section-content">

             <div className="section-text-col">

                <div className="section-title-col">
                  <h2 className="title"
                  >Who we are</h2>
                </div>
                <div className="section-text-col">
                  <p>Our clinic has a group of professionals specialized in different areas of health such as Pain Medicine, Sports Medicine, Physical Medicine and Rehabilitation.</p>
                  <p>Our professionals focus on fundamental values, such as quality and safety, empathy, teamwork, integrity, inclusion and innovation, as we believe that this is the only way we will be able to provide better healthcare and have a greater and better impact on our patients’ lives.</p>
                </div>

                <div className="section-title-col">
                  <h2 className="title">The centre</h2>
                </div>
                
                <div className="mobile-video-container">
                  <img
                    className="section-image-el"
                    src="/assets/images/illustrative/pain-medicine-algarve-min.jpg"
                    alt="Vale do Lobo Algarve"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="section-text-col">
                  <p>Located in one of the most beautiful regions of Portugal and one of the most luxurious tourist developments in Europe, our clinic is located inside Family Medical Centre from Dr. Thomas Kaiser, at Av. do Mar, Vale do Lobo, Algarve, We have all the necessary facilities for your well-being.</p>
                </div>

            </div>

            <div className="section-video-col">
              <img
                className="section-image-el"
                src="/assets/images/illustrative/pain-medicine-algarve-min.jpg"
                alt="Vale do Lobo Algarve"
                loading="lazy"
                decoding="async"
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
    </div>
  );
}

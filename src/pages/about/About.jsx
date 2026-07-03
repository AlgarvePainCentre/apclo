import { Link, useNavigate } from 'react-router-dom';
import { doctorsData } from '../../data/doctorsData';
import '../../styles/layout/site-sections.css';
import '../../styles/pages/about-page.css';

export default function About() {
  const navigate = useNavigate();

  const largeCards = doctorsData.filter(d => d.isLarge);
  const doctorsById = new Map(doctorsData.map((doctor) => [doctor.id, doctor]));
  const getDoctor = (id) => doctorsById.get(id);

  const teamCategories = [
    {
      id: 'medicina-dor-desportiva',
      title: 'Medicina da Dor e Medicina Desportiva',
      meta: { label: 'Diretor Clínico', doctorId: 'miguel-costa' },
      groups: [
        {
          id: 'medicina-dor-desportiva',
          doctorIds: ['miguel-costa', 'gisela-leandro'],
        },
      ],
    },
    {
      id: 'neuroradiologia',
      title: 'Neuroradiologia',
      groups: [
        {
          id: 'intervencao-minimamente-invasiva-coluna',
          title: 'Intervenção Minimamente Invasiva da Coluna',
          doctorIds: ['miguel-batista'],
        },
      ],
    },
    {
      id: 'clinica-geral',
      title: 'Clínica Geral e Medicina 3.0',
      groups: [{ id: 'clinica-geral', doctorIds: ['nuno-lica'] }],
    },
    {
      id: 'ortopedia',
      title: 'Ortopedia',
      groups: [
        {
          id: 'coluna',
          title: 'Coluna',
          doctorIds: ['ricardo-frada', 'pedro-sousa-neves', 'joao-ricardo-soares'],
        },
        {
          id: 'anca-e-joelho',
          title: 'Anca e Joelho',
          doctorIds: ['joao-ricardo-soares', 'tiago-bessa'],
        },
        {
          id: 'ombro',
          title: 'Ombro',
          doctorIds: ['diogo-gomes'],
        },
        {
          id: 'pe-e-tornozelo',
          title: 'Pé e Tornozelo',
          doctorIds: ['joao-vide'],
        },
      ],
    },
    {
      id: 'enfermeira',
      title: 'Enfermeira',
      groups: [{ id: 'enfermeira', doctorIds: ['joana-madeira', 'joana-ferreira', 'raquel-antao'] }],
    },
    {
      id: 'dor-cronica',
      title: 'Consultor em Dor Crónica',
      groups: [{ id: 'dor-cronica', doctorIds: ['javier-duran', 'edgar-semedo'] }],
    },
  ];

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
            poster="/assets/images/illustrative/services-home-min-1.webp"
          >
            <source src="/assets/videos/banner-About.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
            <source src="/assets/videos/banner-About.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
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
                    src="/assets/images/illustrative/pain-medicine-algarve-min.webp"
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
                src="/assets/images/illustrative/pain-medicine-algarve-min.webp"
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
                <Link
                  key={doctor.id} 
                  className="team-card-large clickable-card"
                  to={`/doctor/${doctor.id}`}
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
                </Link>
              ))}
           </div>

           <div className="team-grid-bottom">
              {teamCategories.map((category) => (
                <section key={category.id} className="team-category" aria-labelledby={`team-category-${category.id}`}>
                  <header className="team-category-header">
                    <h3 className="team-category-title" id={`team-category-${category.id}`}>
                      {category.title}
                    </h3>
                    {category.meta ? (
                      (() => {
                        const metaDoctor = getDoctor(category.meta.doctorId);
                        if (!metaDoctor) return null;
                        return (
                          <p className="team-category-meta">
                            <span className="team-category-meta-label">{category.meta.label}:</span>{' '}
                            <Link
                              to={`/doctor/${metaDoctor.id}`}
                              className="team-category-meta-link"
                              aria-label={`View details for ${metaDoctor.name}`}
                            >
                              {metaDoctor.name}
                            </Link>
                          </p>
                        );
                      })()
                    ) : null}
                  </header>
                  {category.groups.map((group) => (
                    <div key={group.id} className="team-subcategory">
                      {group.title ? <h4 className="team-subcategory-title">{group.title}</h4> : null}
                      <div className="team-category-grid">
                        {group.doctorIds.map((doctorId) => {
                          const doctor = getDoctor(doctorId);
                          if (!doctor) return null;
                          return (
                            <Link
                              key={`${group.id}-${doctor.id}`}
                              className="team-card-small clickable-card"
                              to={`/doctor/${doctor.id}`}
                              aria-label={`View details for ${doctor.name}`}
                            >
                              <h5 className="team-card-name">{doctor.name}</h5>
                              <div className="team-card-tags">
                                {doctor.roles.map((role, idx) => (
                                  <span key={idx} className="team-card-tag">
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </section>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
}

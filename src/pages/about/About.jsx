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
      title: 'Pain Medicine and Sports Medicine',
      meta: { label: 'Clinical Director', doctorId: 'miguel-costa' },
      groups: [
        {
          id: 'medicina-dor-desportiva',
          doctorIds: ['miguel-costa', 'gisela-leandro'],
        },
      ],
    },
    {
      id: 'neuroradiologia',
      title: 'Neuroradiology',
      groups: [
        {
          id: 'intervencao-minimamente-invasiva-coluna',
          title: 'Minimally Invasive Spine Intervention',
          doctorIds: ['miguel-batista'],
        },
      ],
    },
    {
      id: 'clinica-geral',
      title: 'General Practice and Medicine 3.0',
      groups: [{ id: 'clinica-geral', doctorIds: ['nuno-lica'] }],
    },
    {
      id: 'ortopedia',
      title: 'Orthopaedics',
      groups: [
        {
          id: 'coluna',
          title: 'Spine',
          doctorIds: ['ricardo-frada', 'pedro-sousa-neves', 'joao-ricardo-soares'],
        },
        {
          id: 'anca-e-joelho',
          title: 'Hip and Knee',
          doctorIds: ['joao-ricardo-soares', 'tiago-bessa'],
        },
        {
          id: 'ombro',
          title: 'Shoulder',
          doctorIds: ['diogo-gomes'],
        },
        {
          id: 'pe-e-tornozelo',
          title: 'Foot and Ankle',
          doctorIds: ['joao-vide'],
        },
      ],
    },
    {
      id: 'enfermeira',
      title: 'Nursing',
      groups: [{ id: 'enfermeira', doctorIds: ['joana-madeira', 'joana-ferreira', 'raquel-antao'] }],
    },
    {
      id: 'dor-cronica',
      title: 'Chronic Pain Consultant',
      groups: [{ id: 'dor-cronica', doctorIds: ['javier-duran', 'edgar-semedo'] }],
    },
  ];

  return (
    <div className="about-page">
      <header className="psx-hero about-hero" aria-label="About hero section">
            <div className="psx-hero-backdrop video-bg" aria-hidden="true">
              <video className="psx-hero-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/images/illustrative/services-home-min-1.webp">
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
              <div className="section-copy-surface">
                <p className="section-kicker">Multidisciplinary care in the Algarve</p>

                <div className="section-copy-block">
                  <div className="section-title-col">
                    <h2 className="title">Who we are</h2>
                  </div>
                  <div className="section-body-col">
                    <p>Our clinic has a group of professionals specialized in different areas of health such as Pain Medicine, Sports Medicine, Physical Medicine and Rehabilitation.</p>
                    <p>Our professionals focus on fundamental values, such as quality and safety, empathy, teamwork, integrity, inclusion and innovation, as we believe that this is the only way we will be able to provide better healthcare and have a greater and better impact on our patients’ lives.</p>
                  </div>
                </div>

                <div className="section-feature-list" role="list" aria-label="Core clinic values">
                  <span className="section-feature-chip" role="listitem">Safety-first care</span>
                  <span className="section-feature-chip" role="listitem">Empathy and teamwork</span>
                  <span className="section-feature-chip" role="listitem">Modern rehabilitation</span>
                </div>

                <div className="section-copy-block section-copy-block-centre">
                  <div className="section-title-col">
                    <h2 className="title">The centre</h2>
                  </div>

                  <div className="mobile-video-container">
                    <div className="section-video-frame">
                      <video
                        className="section-video-el"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster="/assets/images/illustrative/pain-medicine-algarve-min.webp"
                        aria-label="Vale do Lobo clinic environment"
                      >
                        <source src="/assets/videos/test.mp4" type="video/mp4" />
                      </video>
                      <div className="section-video-overlay" aria-hidden="true">
                        <p className="section-video-eyebrow">Family Medical Centre</p>
                        <p className="section-video-stat">Vale do Lobo</p>
                        <p className="section-video-meta">A calm, welcoming space designed around comfort, access and continuity of care.</p>
                      </div>
                    </div>
                  </div>

                  <div className="section-body-col">
                    <p>Located in one of the most beautiful regions of Portugal and one of the most luxurious tourist developments in Europe, our clinic is located inside Family Medical Centre from Dr. Thomas Kaiser, at Av. do Mar, Vale do Lobo, Algarve, We have all the necessary facilities for your well-being.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-video-col">
              <div className="section-video-frame">
                <video
                  className="section-video-el"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/assets/images/illustrative/pain-medicine-algarve-min.webp"
                  aria-label="Vale do Lobo clinic environment"
                >
                  <source src="/assets/videos/test.mp4" type="video/mp4" />
                </video>
                <div className="section-video-overlay" aria-hidden="true">
                  <p className="section-video-eyebrow">Family Medical Centre</p>
                  <p className="section-video-stat">Vale do Lobo</p>
                  <p className="section-video-meta">A calm, welcoming space designed around comfort, access and continuity of care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="our-team" className="page-section team-section">
           <header className="team-section-header">
              <p className="team-section-eyebrow">Meet the people behind your care</p>
              <h2 className="team-section-title">Our Team Members</h2>
              <p className="team-section-subtitle">
                A multidisciplinary group of specialists working together to deliver expert, coordinated care across pain medicine, rehabilitation and spine health.
              </p>
           </header>

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

           <div className="home-centers" role="region" aria-labelledby="about-centers-title">
              <header className="home-centers-header">
                <p className="home-centers-eyebrow">Our network</p>
                <h3 id="about-centers-title" className="home-centers-title">Our Centers</h3>
                <p className="home-centers-subtitle">
                  Explore our specialist centres in the Algarve and contact our team for appointments and referrals.
                </p>
              </header>

              <ul className="home-centers-grid" role="list" aria-label="Medical centres">
                <li className="home-centers-item" role="listitem">
                  <Link
                    to="/contact"
                    className="home-centers-card"
                    aria-label="Contact Algarve Spine Center"
                  >
                    <article className="home-centers-card-inner">
                      <div className="home-centers-card-media" aria-hidden="true">
                        <img
                          src="/assets/SpineCenter.webp"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="home-centers-card-mediaImage"
                        />
                      </div>
                      <div className="home-centers-card-logoWrap">
                        <img
                          src="/assets/asc-preto.svg"
                          alt="Algarve Spine Center"
                          loading="lazy"
                          decoding="async"
                          className="home-centers-card-logo"
                        />
                        <span className="sr-only">Algarve Spine Center</span>
                      </div>
                      <p className="home-centers-card-body">
                        Spine diagnostics, minimally invasive interventions, and surgical pathways coordinated by our team.
                      </p>
                      <span className="home-centers-card-cta" aria-hidden="true">Contact centre →</span>
                    </article>
                  </Link>
                </li>
                <li className="home-centers-item" role="listitem">
                  <Link
                    to="/contact"
                    className="home-centers-card"
                    aria-label="Contact Algarve Medical Center"
                  >
                    <article className="home-centers-card-inner">
                      <h4 className="home-centers-card-title">Algarve Medical Center</h4>
                      <p className="home-centers-card-body">
                        Multidisciplinary consultations with fast access to imaging, rehabilitation, and follow-up care.
                      </p>
                      <span className="home-centers-card-cta" aria-hidden="true">Contact centre →</span>
                    </article>
                  </Link>
                </li>
                <li className="home-centers-item" role="listitem">
                  <Link
                    to="/contact"
                    className="home-centers-card"
                    aria-label="Contact Algarve Pain Centre"
                  >
                    <article className="home-centers-card-inner">
                      <h4 className="home-centers-card-title">Algarve Pain Centre</h4>
                      <p className="home-centers-card-body">
                        Evidence-based pain medicine with integrated rehabilitation and long-term care planning.
                      </p>
                      <span className="home-centers-card-cta" aria-hidden="true">Contact centre →</span>
                    </article>
                  </Link>
                </li>
                <li className="home-centers-item" role="listitem">
                  <Link
                    to="/contact"
                    className="home-centers-card"
                    aria-label="Contact Algarve Migraine & Neurotherapy Centre"
                  >
                    <article className="home-centers-card-inner">
                      <h4 className="home-centers-card-title">Algarve Migraine &amp; Neurotherapy Centre</h4>
                      <p className="home-centers-card-body">
                        Dedicated migraine and headache care, with neurotherapy pathways and preventive treatment planning.
                      </p>
                      <span className="home-centers-card-cta" aria-hidden="true">Contact centre →</span>
                    </article>
                  </Link>
                </li>
              </ul>
           </div>
        </section>
      </main>
    </div>
  );
}

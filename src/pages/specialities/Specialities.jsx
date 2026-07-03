import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/layout/specialities-layout.css';
import '../../styles/pages/specialities/specialities-sections.css';
import { useHeroParallax } from '../../app/useHeroParallax';

export default function Specialities() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroContentMotionRef = useRef(null);
  const navigate = useNavigate();
  const strokeTopics = [
    {
      id: 'stroke-rehabilitation',
      title: 'Rehabilitation',
      to: '/specialities/stroke-medicine/rehabilitation',
      images: [
        {
          src: '/assets/images/illustrative/stroke-rehabilitation-min.webp',
          alt: 'A clinician supporting stroke rehabilitation exercises.',
          title: 'Rehab Session',
          detail: 'Build strength, balance and confidence through graded, task-based practice.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.webp',
          alt: 'Physiotherapy care focused on restoring movement and strength.',
          title: 'Physiotherapy',
          detail: 'Improve mobility, gait and endurance with structured progression and feedback.',
        },
        {
          src: '/assets/images/illustrative/Occupational-Therapy-min.webp',
          alt: 'Occupational therapy supporting daily activity independence.',
          title: 'Daily Function',
          detail: 'Support independence at home with adaptive strategies and real-world training.',
        },
      ],
      summary:
        'Stroke rehabilitation focuses on restoring movement, balance, speech and daily independence after neurological injury. Goals include improving strength, coordination and safe mobility while addressing fatigue, pain and cognitive changes. A coordinated plan helps patients progress with measurable milestones, supports families through education, and reduces complications by promoting early activity, structured therapy and continuity of care across recovery stages.',
    },
    {
      id: 'stroke-clinical-and-secondary-prevention-of-stroke',
      title: 'Clinical and Secondary Prevention of Stroke',
      to: '/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke',
      images: [
        {
          src: '/assets/images/illustrative/stroke-prevention-min.webp',
          alt: 'Clinical follow-up focused on stroke prevention and long-term risk reduction.',
          title: 'Prevention Review',
          detail: 'Clarify causes, set targets, and reduce the risk of recurrent stroke.',
        },
        {
          src: '/assets/images/illustrative/prevention-min.webp',
          alt: 'Health screening and prevention planning for long-term wellbeing.',
          title: 'Risk Screening',
          detail: 'Track blood pressure, cholesterol and lifestyle factors with clear goals.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.webp',
          alt: 'Coordinated clinic services supporting ongoing monitoring and prevention.',
          title: 'Ongoing Follow‑up',
          detail: 'Coordinate care plans and medication checks to support long-term safety.',
        },
      ],
      summary:
        'Secondary prevention aims to reduce the risk of another stroke through careful medical review and long-term risk management. It includes identifying the stroke cause, optimising blood pressure, cholesterol and diabetes control, and tailoring antithrombotic therapies when appropriate. Follow-up also targets lifestyle factors such as smoking cessation, activity and diet, helping patients understand warning signs and adhere to treatment safely.',
    },
    {
      id: 'stroke-feeding-autonomy',
      title: 'Feeding Autonomy',
      to: '/specialities/stroke-medicine/feeding-autonomy',
      images: [
        {
          src: '/assets/images/illustrative/Nutrition-min-1.webp',
          alt: 'Nutrition support for recovery and maintaining adequate intake.',
          title: 'Recovery Nutrition',
          detail: 'Maintain energy and protein intake to support healing and participation in rehab.',
        },
        {
          src: '/assets/images/illustrative/nutrition-min.webp',
          alt: 'A balanced nutrition plan supporting energy and rehabilitation goals.',
          title: 'Meal Planning',
          detail: 'Adapt food choices to appetite, fatigue and medical goals while staying practical.',
        },
        {
          src: '/assets/images/illustrative/Home-Care-min.webp',
          alt: 'Home care support for safe routines and daily recovery needs.',
          title: 'Home Support',
          detail: 'Build safe routines for eating and drinking with caregiver guidance when needed.',
        },
      ],
      summary:
        'Feeding autonomy addresses swallowing safety, nutrition and the skills needed to eat and drink independently after stroke. Clinical goals include reducing aspiration risk, maintaining hydration and supporting adequate calorie and protein intake for recovery. Therapy may involve swallow assessment, texture modifications and exercises, plus practical strategies for positioning and adaptive tools. Progress is monitored to improve safety, confidence and participation at meals.',
    },
    {
      id: 'stroke-speech-autonomy',
      title: 'Speech Autonomy',
      to: '/specialities/stroke-medicine/speech-autonomy',
      images: [
        {
          src: '/assets/images/illustrative/speech-therapy-min.webp',
          alt: 'Speech and language therapy supporting communication after stroke.',
          title: 'Speech Therapy',
          detail: 'Improve clarity and conversation skills with structured practice and strategies.',
        },
        {
          src: '/assets/images/illustrative/Speech-Therapy-min-1.webp',
          alt: 'A speech therapy session focused on clarity and language skills.',
          title: 'Language Skills',
          detail: 'Work on understanding, word finding and confidence in everyday situations.',
        },
        {
          src: '/assets/images/illustrative/post-stroke-min.webp',
          alt: 'Post-stroke follow-up supporting communication and daily function.',
          title: 'Care Continuity',
          detail: 'Coordinate therapy goals with daily life needs at home and in the community.',
        },
      ],
      summary:
        'Speech autonomy supports communication after stroke, including speech clarity, language skills and cognitive-communication challenges. Goals are to improve understanding, expression and confidence in everyday conversations, while reducing frustration for patients and families. Treatment can include speech and language therapy, compensatory strategies and communication aids when needed. Success is measured by functional participation at home, work and social settings, not only test scores.',
    },
    {
      id: 'stroke-post-stroke-depression-and-mood-disorders',
      title: 'Post-Stroke Depression and Mood Disorders',
      to: '/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders',
      images: [
        {
          src: '/assets/images/illustrative/mood-disorders-min.webp',
          alt: 'Support for mood and emotional wellbeing after stroke.',
          title: 'Mood Support',
          detail: 'Identify symptoms early and restore routines that support recovery engagement.',
        },
        {
          src: '/assets/images/illustrative/psychology-min.webp',
          alt: 'Psychology support focused on coping skills and recovery confidence.',
          title: 'Coping Skills',
          detail: 'Build practical strategies for anxiety, fear of movement and adjustment stress.',
        },
        {
          src: '/assets/images/illustrative/Psychology-min-1.webp',
          alt: 'Therapeutic support for anxiety, depression and adjustment after illness.',
          title: 'Therapeutic Care',
          detail: 'Strengthen resilience and reduce distress to improve participation in rehabilitation.',
        },
      ],
      summary:
        'Mood disorders after stroke are common and can slow recovery by reducing motivation, sleep quality and engagement with therapy. Clinical goals include recognising symptoms early, addressing anxiety or depression, and improving coping skills for patients and caregivers. Care may combine psychological support, structured routines, graded activity and, when appropriate, medication review. Treating mood effectively supports participation in rehabilitation and improves long-term quality of life.',
    },
    {
      id: 'stroke-medical-complications-post-stroke',
      title: 'Medical Complications Post Stroke',
      to: '/specialities/stroke-medicine/medical-complications-post-stroke',
      images: [
        {
          src: '/assets/images/illustrative/post-stroke-min.webp',
          alt: 'Medical follow-up after stroke to monitor health and recovery needs.',
          title: 'Medical Review',
          detail: 'Monitor symptoms, medications and safety to reduce avoidable setbacks.',
        },
        {
          src: '/assets/images/illustrative/Post-Stroke-min-1.webp',
          alt: 'Coordinated post-stroke care focused on safety and complication prevention.',
          title: 'Complication Prevention',
          detail: 'Address falls, infections, swallowing risks and pressure areas with early action.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.webp',
          alt: 'Clinic services supporting ongoing medical monitoring and recovery planning.',
          title: 'Care Coordination',
          detail: 'Keep teams aligned with a shared plan for follow-up, monitoring and escalation.',
        },
      ],
      summary:
        'Medical complications after stroke include infections, falls, pressure injuries, pain, medication side effects and swallowing-related aspiration risks. The clinical focus is early detection and proactive management to keep recovery on track and prevent avoidable hospital readmissions. Monitoring fatigue, nutrition, skin health and mobility safety is essential. Coordinated follow-up helps patients and families identify red flags, adjust treatments, and maintain stability during rehabilitation.',
    },
    {
      id: 'stroke-post-stroke-spasticity',
      title: 'Post Stroke Spasticity',
      to: '/specialities/stroke-medicine/post-stroke-spasticity',
      images: [
        {
          src: '/assets/images/illustrative/postural-therapy-min.webp',
          alt: 'Therapy focused on posture, tone and controlled movement after stroke.',
          title: 'Tone Management',
          detail: 'Reduce stiffness and protect movement quality with posture and positioning.',
        },
        {
          src: '/assets/images/illustrative/rehabilitation-min.webp',
          alt: 'Rehabilitation exercises supporting range of motion and functional recovery.',
          title: 'Range of Motion',
          detail: 'Maintain flexibility and prevent contractures with guided stretching and activity.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.webp',
          alt: 'Physiotherapy strategies to improve comfort and daily function.',
          title: 'Functional Practice',
          detail: 'Link tone control to walking, transfers and hand use for everyday goals.',
        },
      ],
      summary:
        'Post-stroke spasticity causes increased muscle tone and stiffness that can limit movement, impair hygiene and contribute to pain. Clinical goals are to preserve range of motion, improve function and reduce complications such as contractures. Management may include stretching, splinting, task-specific therapy and targeted medical treatments when indicated. Individualised plans focus on practical outcomes like walking, hand use and comfort in daily activities.',
    },
    {
      id: 'stroke-complex-regional-pain-syndrome',
      title: 'Complex Regional Pain Syndrome',
      to: '/specialities/stroke-medicine/complex-regional-pain-syndrome',
      images: [
        {
          src: '/assets/images/illustrative/Hand-and-Elbow-Pain-min.webp',
          alt: 'Upper limb pain and sensitivity management in rehabilitation settings.',
          title: 'Sensitivity Care',
          detail: 'Manage swelling and hypersensitivity while keeping the limb active and safe.',
        },
        {
          src: '/assets/images/illustrative/rehabilitation-min.webp',
          alt: 'Graded rehabilitation supporting movement and desensitisation strategies.',
          title: 'Graded Exposure',
          detail: 'Use paced movement and desensitisation to restore confident daily use.',
        },
        {
          src: '/assets/images/illustrative/pain-medicine-algarve-min.webp',
          alt: 'Specialist pain medicine care supporting complex pain conditions.',
          title: 'Specialist Review',
          detail: 'Combine rehabilitation and pain strategies to improve function and quality of life.',
        },
      ],
      summary:
        'Complex Regional Pain Syndrome (CRPS) is a severe pain condition that can follow injury or immobilisation and may occur after stroke-related weakness. It involves disproportionate pain with swelling, colour or temperature changes and sensitivity that limits function. Clinical goals include early recognition, graded movement and desensitisation, and restoring normal use of the limb. Coordinated care supports pain control, mobility and confidence in rehabilitation.',
    },
    {
      id: 'stroke-postural-and-motor-control-autonomy',
      title: 'Postural and Motor Control Autonomy',
      to: '/specialities/stroke-medicine/postural-and-motor-control-autonomy',
      images: [
        {
          src: '/assets/images/illustrative/postural-therapy-min.webp',
          alt: 'Balance and postural therapy supporting safe movement after stroke.',
          title: 'Balance Training',
          detail: 'Rebuild stability and confidence through safe, progressive balance practice.',
        },
        {
          src: '/assets/images/illustrative/stroke-rehabilitation-min.webp',
          alt: 'Task-based practice to improve coordination and confidence.',
          title: 'Motor Control',
          detail: 'Improve coordination with repetition, feedback and purposeful movement tasks.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.webp',
          alt: 'Strength and mobility training supporting transfers and walking.',
          title: 'Walking Skills',
          detail: 'Practice transfers and gait with strength work and appropriate supports.',
        },
      ],
      summary:
        'Postural and motor control autonomy focuses on balance, coordination and safe movement after stroke. Goals include improving trunk stability, transfers, gait quality and fall prevention through task-specific practice and progressive strengthening. Therapy emphasises repetition, feedback and safe challenge to rebuild confidence and independence. Plans are tailored to fatigue and cognitive load, and may include assistive devices or home adaptations to support daily mobility.',
    },
    {
      id: 'stroke-community-reintegration',
      title: 'Community Reintegration',
      to: '/specialities/stroke-medicine/community-reintegration',
      images: [
        {
          src: '/assets/images/illustrative/Home-Care-min.webp',
          alt: 'Home-based support helping recovery routines translate into daily life.',
          title: 'Home Readiness',
          detail: 'Translate therapy into routines that support independence and safety at home.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.webp',
          alt: 'Coordinated services supporting return to community and participation goals.',
          title: 'Participation Goals',
          detail: 'Plan step-by-step progress for work, hobbies, travel and social activities.',
        },
        {
          src: '/assets/images/illustrative/post-stroke-min.webp',
          alt: 'Follow-up care supporting independence and safe activity progression.',
          title: 'Ongoing Support',
          detail: 'Adjust plans as you progress to keep activity meaningful, safe and sustainable.',
        },
      ],
      summary:
        'Community reintegration supports returning to meaningful activities after stroke, including work, driving, hobbies and social participation. Clinical goals include identifying barriers, building endurance and addressing mobility, communication and confidence needs in real-world contexts. Rehabilitation may involve graded exposure, skills practice and home or workplace adaptations. Ongoing support helps patients navigate services, reduce isolation, and sustain independence while maintaining safety and wellbeing.',
    },
  ];
  const trackEvent = (event, params = {}) => {
    try {
      const payload = { event, ...params, ts: Date.now() };
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      }
    } catch {}
  };

  useHeroParallax({
    rootRef: heroRef,
    mediaRef: heroVideoRef,
    contentRef: heroContentMotionRef,
    mediaY: -100,
  });

  useEffect(() => {
    // SEO
    document.title = 'Specialities | Algarve Pain Centre';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Explore our specialized pain management services, including sports injuries, chronic pain, and musculoskeletal issues. Learn from experienced practitioners and get the support you need to manage your pain effectively.';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore our specialized pain management services, including sports injuries, chronic pain, and musculoskeletal issues. Learn from experienced practitioners and get the support you need to manage your pain effectively.';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = heroVideoRef.current;
    if (!heroEl || !videoLayer) return undefined;

    const videoEl = videoLayer.querySelector('video');
    if (!videoEl) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let didLoad = false;
    let io;

    const loadAndPlay = async () => {
      if (didLoad) return;
      didLoad = true;

      const sourceEls = Array.from(videoEl.querySelectorAll('source[data-src]'));
      if (sourceEls.length) {
        sourceEls.forEach((sourceEl) => {
          const dataSrc = sourceEl.getAttribute('data-src');
          if (dataSrc && !sourceEl.getAttribute('src')) {
            sourceEl.setAttribute('src', dataSrc);
          }
        });
        videoEl.load();
      } else {
        const dataSrc = videoEl.getAttribute('data-src');
        if (dataSrc) {
          videoEl.src = dataSrc;
        }
      }

      try {
        const maybePromise = videoEl.play();
        if (maybePromise && typeof maybePromise.then === 'function') {
          await maybePromise;
        }
      } catch {}
    };

    try {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry || !entry.isIntersecting) return;
          loadAndPlay();
          if (io) io.disconnect();
        },
        { threshold: 0.05 }
      );
      io.observe(heroEl);
    } catch {
      loadAndPlay();
    }

    return () => {
      if (io) io.disconnect();
    };
  }, []);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setVh);
    }
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setVh);
      }
    };
  }, []);

  const painMedicineAreas = [
    {
      title: 'Head Pain',
      to: '/specialities/pain-medicine/head-pain',
      iconSrc: '/assets/images/pain-medicine-icons/head-pain.webp',
      eventTo: 'head-pain',
    },
    {
      title: 'Cervical Spine Pain',
      to: '/specialities/pain-medicine/cervical-spine-pain',
      iconSrc: '/assets/images/pain-medicine-icons/cervical-spine-pain.webp',
      eventTo: 'cervical-spine-pain',
    },
    {
      title: 'Lumbar Spine Pain',
      to: '/specialities/pain-medicine/lumbar-spine-pain',
      iconSrc: '/assets/images/pain-medicine-icons/lumber-spine-pain.webp',
      eventTo: 'lumbar-spine-pain',
    },
    {
      title: 'Shoulder Pain',
      to: '/specialities/pain-medicine/shoulder-pain',
      iconSrc: '/assets/images/pain-medicine-icons/shoulder-pain.webp',
      eventTo: 'shoulder-pain',
    },
    {
      title: 'Hand and Elbow Pain',
      to: '/specialities/pain-medicine/hand-and-elbow-pain',
      iconSrc: '/assets/images/pain-medicine-icons/hand-spine-pain.webp',
      eventTo: 'hand-and-elbow-pain',
    },
    {
      title: 'Hip and Groin Pain',
      to: '/specialities/pain-medicine/hip-and-groin-pain',
      iconSrc: '/assets/images/pain-medicine-icons/hip-groin-pain.webp',
      eventTo: 'hip-and-groin-pain',
    },
    {
      title: 'Knee Pain',
      to: '/specialities/pain-medicine/knee-pain',
      iconSrc: '/assets/images/pain-medicine-icons/knee-pain.webp',
      eventTo: 'knee-pain',
    },
    {
      title: 'Thoracic Wall Pain',
      to: '/specialities/pain-medicine/thoracic-wall-pain',
      iconSrc: '/assets/images/pain-medicine-icons/thoracic-wall-pain.webp',
      eventTo: 'thoracic-wall-pain',
    },
    {
      title: 'Abdominal Wall Pain',
      to: '/specialities/pain-medicine/abdominal-wall-pain',
      iconSrc: '/assets/images/pain-medicine-icons/abdominal-wall-pain.webp',
      eventTo: 'abdominal-wall-pain',
    },
    {
      title: 'Pelvic & Gynaecological',
      to: '/specialities/pain-medicine/pelvic-and-gynaecological',
      iconSrc: '/assets/images/pain-medicine-icons/pelvic-pain.webp',
      eventTo: 'pelvic-and-gynaecological',
    },
    {
      title: 'Facial Pain',
      to: '/specialities/pain-medicine/facial-pain',
      iconSrc: '/assets/images/pain-medicine-icons/facial-pain.webp',
      eventTo: 'facial-pain',
    },
    {
      title: 'Foot and Ankle Pain',
      to: '/specialities/pain-medicine/foot-and-ankle-pain',
      iconSrc: '/assets/images/pain-medicine-icons/foot-pain.webp',
      eventTo: 'foot-and-ankle-pain',
    },
  ];

  const sportsMedicineServices = [
    {
      title: 'Injuries',
      to: '/specialities/sports-medicine/injuries',
      imgSrc: '/assets/images/illustrative/injuries-min.webp',
      eventTo: 'injuries',
    },
    {
      title: 'Prevention',
      to: '/specialities/sports-medicine/prevention',
      imgSrc: '/assets/images/illustrative/prevention-min.webp',
      eventTo: 'prevention',
    },
    {
      title: 'Rehabilitation',
      to: '/specialities/sports-medicine/rehabilitation',
      imgSrc: '/assets/images/illustrative/rehabilitation-min.webp',
      eventTo: 'rehabilitation',
    },
    {
      title: 'Performance',
      to: '/specialities/sports-medicine/performance',
      imgSrc: '/assets/images/illustrative/performance-min.webp',
      eventTo: 'performance',
    },
    {
      title: 'Psychology',
      to: '/specialities/sports-medicine/psychology',
      imgSrc: '/assets/images/illustrative/psychology-min.webp',
      eventTo: 'psychology',
    },
    {
      title: 'Nutrition',
      to: '/specialities/sports-medicine/nutrition',
      imgSrc: '/assets/images/illustrative/nutrition-min.webp',
      eventTo: 'nutrition',
    },
  ];

  return (
    <div className="psx-page home-page specialities-page">
      <section className="hero psx-hero" ref={heroRef}>
        <div className="hero-video psx-hero-backdrop" aria-hidden="true" ref={heroVideoRef}>
          <video
            className="specialities-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/illustrative/services-home-min-1.webp"
          >
            <source data-src="/assets/videos/Pain-Medicine-min.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
            <source data-src="/assets/videos/Pain-Medicine-min.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-content hero-content-centered" ref={heroContentMotionRef}>
          <div className="hero-center">
            <p className="psx-hero-eyebrow">Specialities</p>
            <h1 className="hero-title psx-hero-title">Specialities</h1>
            <p className="hero-subtitle psx-hero-subtitle">
              Explore our areas of expertise in pain medicine, rehabilitation and stroke care.
            </p>
            <button
              type="button"
              className="psx-btn-primary"
              aria-label="Book an appointment"
              onClick={() => {
                trackEvent('cta_click', { location: 'specialities-hero' });
                navigate('/contact');
              }}
            >
              <span>Book an appointment</span>
            </button>
          </div>
        </div>
      </section>

      <main className="home-main treatments-page">

        <section className="page-section treatments-feature treatments-feature-mi" aria-labelledby="speciality-pain-medicine">
          <div className="treatments-feature-inner treatments-feature-inner-grid">
            <div className="pain-area-grid-panel">
              <h3 className="pain-area-grid-title">Where do you feel pain?</h3>
              <ul className="pain-area-grid" role="list" aria-label="Pain areas">
                {painMedicineAreas.map((area) => (
                  <li key={area.to} className="pain-area-grid-item">
                    <Link
                      to={area.to}
                      className="pain-area-card"
                      aria-label={`Explore ${area.title}`}
                      onClick={() => trackEvent('nav_click', { location: 'specialities-pain-grid', to: area.eventTo })}
                    >
                      <span className="pain-area-card-icon" aria-hidden="true">
                        <img
                          src={area.iconSrc}
                          alt=""
                          width={72}
                          height={72}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="pain-area-card-label">{area.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section specialities-what-is-section" aria-labelledby="what-is-pain-medicine">
          <div className="specialities-what-is-inner">
            <div className="specialities-what-is-header">
              <h2 id="what-is-pain-medicine" className="specialities-what-is-title">
                What is<br />Pain Medicine?
              </h2>
            </div>
            <div className="specialities-what-is-content">
              <p>
                Pain Medicine is responsible for understanding and studying the mechanism underlying patient pain.
              </p>
              <p>
                The holistic assessment of the patient is crucial to understand the mechanism of pain and to treat it properly. The non-surgical treatments could include pharmacological medication, minimally invasive procedures and physiotherapy.
              </p>
              <p>
                To make a correct plan adjusted to you, we have with us an experienced team that is always available for you.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section treatments-feature treatments-feature-mi" aria-labelledby="speciality-sports-medicine">
          <div className="treatments-feature-inner treatments-feature-inner-grid">
            <div className="sports-care-grid-panel">
              <h3 className="sports-care-grid-title">Our care services</h3>
              <ul className="sports-care-grid" role="list" aria-label="Sports medicine services">
                {sportsMedicineServices.map((service) => (
                  <li key={service.to} className="sports-care-grid-item">
                    <Link
                      to={service.to}
                      className="sports-care-card"
                      aria-label={`Explore ${service.title}`}
                      onClick={() => trackEvent('nav_click', { location: 'specialities-sports-grid', to: service.eventTo })}
                    >
                      <div className="sports-care-card-content">
                        <h4 className="sports-care-card-title">{service.title}</h4>
                        <span className="sports-care-card-link">
                          Learn more
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11" strokeWidth="1.5" />
                            <path d="M10.5 8.5L14 12L10.5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                      <div className="sports-care-card-image" aria-hidden="true">
                        <img
                          src={service.imgSrc}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section specialities-what-is-section" aria-labelledby="the-concept-sports-medicine">
          <div className="specialities-what-is-inner">
            <div className="specialities-what-is-header">
              <h2 id="the-concept-sports-medicine" className="specialities-what-is-title">
                The concept
              </h2>
            </div>
            <div className="specialities-what-is-content">
              <p>
                Sports Medicine is responsible for understanding and studying sports performance under a scientific assessment. Sports injuries are commonly caused by direct impact, overuse or the application of force that is greater than the body part can structurally withstand. Bruises, sprains, strains and joint injuries are particularly common injuries in sports.
              </p>
              <p>
                The specialist in sports medicine should prevent and treat sports injuries, adjust the exercises features to the patient, through a biomechanical assessment enhance the athlete performance and know the benefits and harms of certain sports.
              </p>
              <p>
                Our medical team is all certified in sports medicine and has a lot of experience, having already worked in first division football clubs.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section treatments-feature treatments-feature-mi" aria-labelledby="speciality-stroke-medicine">
          <div className="treatments-feature-inner treatments-feature-inner-grid">
            <div className="sports-care-grid-panel stroke-care-grid-panel">
              <h3 className="sports-care-grid-title">Our treatment approaches</h3>
              <ul className="sports-care-grid stroke-care-grid" role="list" aria-label="Stroke medicine approaches">
                {strokeTopics.map((topic) => (
                  <li key={topic.id} className="sports-care-grid-item stroke-care-grid-item">
                    <Link
                      to={topic.to}
                      className="sports-care-card stroke-care-card"
                      aria-label={`Explore ${topic.title}`}
                      onClick={() => trackEvent('nav_click', { location: 'specialities-stroke-grid', to: topic.to })}
                    >
                      <div className="sports-care-card-content">
                        <h4 className="sports-care-card-title">{topic.title}</h4>
                        <span className="sports-care-card-link">
                          Learn more
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11" strokeWidth="1.5" />
                            <path d="M10.5 8.5L14 12L10.5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                      <div className="sports-care-card-image" aria-hidden="true">
                        <img
                          src={topic.images && topic.images.length > 0 ? topic.images[0].src : '/assets/images/illustrative/stroke-rehabilitation-min.webp'}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section specialities-what-is-section" aria-labelledby="the-concept-stroke-medicine">
          <div className="specialities-what-is-inner">
            <div className="specialities-what-is-header">
              <h2 id="the-concept-stroke-medicine" className="specialities-what-is-title">
                The concept
              </h2>
            </div>
            <div className="specialities-what-is-content">
              <p>
                Stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Early action can reduce brain damage and other complications.
              </p>
              <p>
                Often patients gets with sequelaes, like dysarthria, central facial palsy and loss of power or sensibility in the affected hemibody. Consequently, patients could get with less autonomy in daily living activities.
              </p>
              <p>
                Researchers have found that people who participate in a focused stroke rehabilitation program perform better than most people who don't have stroke rehabilitation. The goal will be to help the patient relearn skills that he lost when a stroke affected part of his brain.
              </p>
              <p>
                To achieve it, it is important to make an adjusted rehabilitation program to the patient composed of pharmacological treatment, physiotherapy, speech therapy, occupational therapy, prescription of orthosis and support products, minimally invasive procedures, like botulinum toxin injection, and others.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section specialities-treatment-approaches-section" aria-labelledby="specialities-treatment-approaches-title">
          <div className="specialities-treatment-approaches-inner">
            <header className="specialities-treatment-approaches-header">
              <h2 id="specialities-treatment-approaches-title" className="specialities-treatment-approaches-title">
                Our Treatment Approaches
              </h2>
              <p className="specialities-treatment-approaches-subtitle">
                We can help you at every level of your health journey.
              </p>
            </header>
            
            <div className="specialities-treatment-approaches-grid">
              <Link 
                to="/treatments#non-invasive" 
                className="specialities-treatment-approach-card"
                onClick={() => trackEvent('nav_click', { location: 'specialities-approaches', to: 'non-invasive' })}
              >
                <div 
                  className="specialities-treatment-approach-image specialities-treatment-approach-image-yellow"
                  style={{ backgroundImage: "url('/assets/images/Homepage/NonInvasive.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="specialities-treatment-approach-content">
                  <h3 className="specialities-treatment-approach-card-title">Non-Invasive<br/>Treatments</h3>
                  <div className="specialities-treatment-approach-divider"></div>
                  <p className="specialities-treatment-approach-body">
                    Quick and non-commiting steps we can take together to improve your health.
                  </p>
                  <span className="specialities-treatment-approach-link">
                    Learn more
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" strokeWidth="1.5" />
                      <path d="M10.5 8.5L14 12L10.5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>

              <Link 
                to="/treatments#minimally-invasive" 
                className="specialities-treatment-approach-card"
                onClick={() => trackEvent('nav_click', { location: 'specialities-approaches', to: 'minimally-invasive' })}
              >
                <div 
                  className="specialities-treatment-approach-image specialities-treatment-approach-image-yellow"
                  style={{ backgroundImage: "url('/assets/images/Homepage/MinimallyInvasive.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="specialities-treatment-approach-content">
                  <h3 className="specialities-treatment-approach-card-title">Minimally Invasive<br/>Treatments</h3>
                  <div className="specialities-treatment-approach-divider"></div>
                  <p className="specialities-treatment-approach-body">
                    Procedures with reduced surgical risks that promote quicker recovery times.
                  </p>
                  <span className="specialities-treatment-approach-link">
                    Learn more
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" strokeWidth="1.5" />
                      <path d="M10.5 8.5L14 12L10.5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>

              <Link 
                to="/treatments#surgical" 
                className="specialities-treatment-approach-card"
                onClick={() => trackEvent('nav_click', { location: 'specialities-approaches', to: 'surgical' })}
              >
                <div 
                  className="specialities-treatment-approach-image specialities-treatment-approach-image-yellow"
                  style={{ backgroundImage: "url('/assets/images/Homepage/Surgical.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="specialities-treatment-approach-content">
                  <h3 className="specialities-treatment-approach-card-title">Surgical<br/>Treatments</h3>
                  <div className="specialities-treatment-approach-divider"></div>
                  <p className="specialities-treatment-approach-body">
                    Comprehensive procedures tailored to address complex health issues with precision.
                  </p>
                  <span className="specialities-treatment-approach-link">
                    Learn more
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" strokeWidth="1.5" />
                      <path d="M10.5 8.5L14 12L10.5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-team">
          <div className="home-section-team-inner">
            <header className="home-section-team-header">
              <p className="home-section-team-eyebrow home-stories-eyebrow">Meet our clinicians</p>
              <h2 className="home-section-team-title home-stories-title">Your care team</h2>
              <p className="home-section-team-subtitle">
                Experienced specialists working together to relieve your pain.
              </p>
            </header>
            <div className="home-team-grid">
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-miguel-costa-algarve-pain-centre.webp" alt="Dr. Miguel Costa" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Costa</h3>
                  <p className="home-team-role">Physical Rehabilitation · Sports Medicine</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-miguel-batista-algarve-pain-centre.webp" alt="Dr. Miguel Baptista" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Baptista</h3>
                  <p className="home-team-role">Neuroradiology</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-ricardo-frada-algarve-pain-centre.webp" alt="Dr. Ricardo Frada" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Ricardo Frada</h3>
                  <p className="home-team-role">Orthopedic Surgery</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/illustrative/Physiotherapy-min.webp" alt="Physiotherapy Team" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Rehabilitation Team</h3>
                  <p className="home-team-role">Physiotherapy · Occupational Therapy</p>
                </div>
              </article>
            </div>
            <div className="home-team-cta">
              <Link
                to="/about"
                className="home-team-link"
                onClick={() => trackEvent('nav_click', { to: 'about', location: 'specialities-team' })}
              >
                Meet the full team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="page-section specialities-testimonials-section" aria-labelledby="specialities-testimonials-title">
          <div className="specialities-testimonials-inner">
            <header className="specialities-testimonials-header">
              <h2 id="specialities-testimonials-title" className="specialities-testimonials-title">
                Your opinion makes the difference
              </h2>
            </header>
            
            <div className="specialities-testimonials-grid">
              <article className="specialities-testimonial-card">
                <p className="specialities-testimonial-quote">
                  "The staff are all very professional, friendly, incredibly patient and they are there for you 24 hours a day. Follow up care is superb. I had numerous injections. came home within a few hours and am so glad that I had the procedure. It changed my life dramatically. I recommend them all very highly."
                </p>
                <div className="specialities-testimonial-author">
                  <div className="specialities-testimonial-author-info">
                    <div className="specialities-testimonial-name">Celeste Cutting</div>
                    <div className="specialities-testimonial-location">UK</div>
                  </div>
                </div>
              </article>

              <article className="specialities-testimonial-card">
                <p className="specialities-testimonial-quote">
                  "We were very impressed with the approach of you and your team with regard to the treatment that I received over the last two months. We experienced a very high level of knowledge and dedication from you and your colleagues which helped me to recover more quickly."
                </p>
                <div className="specialities-testimonial-author">
                  <div className="specialities-testimonial-author-info">
                    <div className="specialities-testimonial-name">Gerald Kraftman</div>
                    <div className="specialities-testimonial-location">Poland</div>
                  </div>
                </div>
              </article>

              <article className="specialities-testimonial-card">
                <p className="specialities-testimonial-quote">
                  "Indeed we have been greatly satisfied with your team and professional support over the past months. Great satisfaction with your team including the new facilities in the Center."
                </p>
                <div className="specialities-testimonial-author">
                  <div className="specialities-testimonial-author-info">
                    <div className="specialities-testimonial-name">Jean-François Cristau</div>
                    <div className="specialities-testimonial-location">France</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

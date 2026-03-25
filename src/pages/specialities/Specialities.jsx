import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../home/Home.css';

export default function Specialities() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroContentMotionRef = useRef(null);
  const navigate = useNavigate();
  const opinionTrackRef = useRef(null);
  const [opinionActiveSlide, setOpinionActiveSlide] = useState(0);
  const [isOpinionDragging, setIsOpinionDragging] = useState(false);
  const opinionActiveSlideRef = useRef(0);
  const opinionAutoplayRef = useRef({
    hover: false,
    focus: false,
    dragging: false,
    interaction: false,
    inView: false,
  });
  const opinionAutoplayTimerRef = useRef(null);
  const opinionInteractionTimerRef = useRef(null);
  const opinionDragRef = useRef({
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const contactMapIframeRef = useRef(null);
  const strokeTopics = [
    {
      id: 'stroke-rehabilitation',
      title: 'Rehabilitation',
      to: '/specialities/stroke-medicine/rehabilitation',
      images: [
        {
          src: '/assets/images/illustrative/stroke-rehabilitation-min.jpg',
          alt: 'A clinician supporting stroke rehabilitation exercises.',
          title: 'Rehab Session',
          detail: 'Build strength, balance and confidence through graded, task-based practice.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.jpg',
          alt: 'Physiotherapy care focused on restoring movement and strength.',
          title: 'Physiotherapy',
          detail: 'Improve mobility, gait and endurance with structured progression and feedback.',
        },
        {
          src: '/assets/images/illustrative/Occupational-Therapy-min.jpg',
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
          src: '/assets/images/illustrative/stroke-prevention-min.jpg',
          alt: 'Clinical follow-up focused on stroke prevention and long-term risk reduction.',
          title: 'Prevention Review',
          detail: 'Clarify causes, set targets, and reduce the risk of recurrent stroke.',
        },
        {
          src: '/assets/images/illustrative/prevention-min.jpg',
          alt: 'Health screening and prevention planning for long-term wellbeing.',
          title: 'Risk Screening',
          detail: 'Track blood pressure, cholesterol and lifestyle factors with clear goals.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.jpg',
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
          src: '/assets/images/illustrative/Nutrition-min-1.jpg',
          alt: 'Nutrition support for recovery and maintaining adequate intake.',
          title: 'Recovery Nutrition',
          detail: 'Maintain energy and protein intake to support healing and participation in rehab.',
        },
        {
          src: '/assets/images/illustrative/nutrition-min.jpg',
          alt: 'A balanced nutrition plan supporting energy and rehabilitation goals.',
          title: 'Meal Planning',
          detail: 'Adapt food choices to appetite, fatigue and medical goals while staying practical.',
        },
        {
          src: '/assets/images/illustrative/Home-Care-min.jpg',
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
          src: '/assets/images/illustrative/speech-therapy-min.jpg',
          alt: 'Speech and language therapy supporting communication after stroke.',
          title: 'Speech Therapy',
          detail: 'Improve clarity and conversation skills with structured practice and strategies.',
        },
        {
          src: '/assets/images/illustrative/Speech-Therapy-min-1.jpg',
          alt: 'A speech therapy session focused on clarity and language skills.',
          title: 'Language Skills',
          detail: 'Work on understanding, word finding and confidence in everyday situations.',
        },
        {
          src: '/assets/images/illustrative/post-stroke-min.jpg',
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
          src: '/assets/images/illustrative/mood-disorders-min.jpg',
          alt: 'Support for mood and emotional wellbeing after stroke.',
          title: 'Mood Support',
          detail: 'Identify symptoms early and restore routines that support recovery engagement.',
        },
        {
          src: '/assets/images/illustrative/psychology-min.jpg',
          alt: 'Psychology support focused on coping skills and recovery confidence.',
          title: 'Coping Skills',
          detail: 'Build practical strategies for anxiety, fear of movement and adjustment stress.',
        },
        {
          src: '/assets/images/illustrative/Psychology-min-1.jpg',
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
          src: '/assets/images/illustrative/post-stroke-min.jpg',
          alt: 'Medical follow-up after stroke to monitor health and recovery needs.',
          title: 'Medical Review',
          detail: 'Monitor symptoms, medications and safety to reduce avoidable setbacks.',
        },
        {
          src: '/assets/images/illustrative/Post-Stroke-min-1.jpg',
          alt: 'Coordinated post-stroke care focused on safety and complication prevention.',
          title: 'Complication Prevention',
          detail: 'Address falls, infections, swallowing risks and pressure areas with early action.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.jpg',
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
          src: '/assets/images/illustrative/postural-therapy-min.jpg',
          alt: 'Therapy focused on posture, tone and controlled movement after stroke.',
          title: 'Tone Management',
          detail: 'Reduce stiffness and protect movement quality with posture and positioning.',
        },
        {
          src: '/assets/images/illustrative/rehabilitation-min.jpg',
          alt: 'Rehabilitation exercises supporting range of motion and functional recovery.',
          title: 'Range of Motion',
          detail: 'Maintain flexibility and prevent contractures with guided stretching and activity.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.jpg',
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
          src: '/assets/images/illustrative/Hand-and-Elbow-Pain-min.jpg',
          alt: 'Upper limb pain and sensitivity management in rehabilitation settings.',
          title: 'Sensitivity Care',
          detail: 'Manage swelling and hypersensitivity while keeping the limb active and safe.',
        },
        {
          src: '/assets/images/illustrative/rehabilitation-min.jpg',
          alt: 'Graded rehabilitation supporting movement and desensitisation strategies.',
          title: 'Graded Exposure',
          detail: 'Use paced movement and desensitisation to restore confident daily use.',
        },
        {
          src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg',
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
          src: '/assets/images/illustrative/postural-therapy-min.jpg',
          alt: 'Balance and postural therapy supporting safe movement after stroke.',
          title: 'Balance Training',
          detail: 'Rebuild stability and confidence through safe, progressive balance practice.',
        },
        {
          src: '/assets/images/illustrative/stroke-rehabilitation-min.jpg',
          alt: 'Task-based practice to improve coordination and confidence.',
          title: 'Motor Control',
          detail: 'Improve coordination with repetition, feedback and purposeful movement tasks.',
        },
        {
          src: '/assets/images/illustrative/Physiotherapy-min.jpg',
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
          src: '/assets/images/illustrative/Home-Care-min.jpg',
          alt: 'Home-based support helping recovery routines translate into daily life.',
          title: 'Home Readiness',
          detail: 'Translate therapy into routines that support independence and safety at home.',
        },
        {
          src: '/assets/images/illustrative/services-home-min-1.jpg',
          alt: 'Coordinated services supporting return to community and participation goals.',
          title: 'Participation Goals',
          detail: 'Plan step-by-step progress for work, hobbies, travel and social activities.',
        },
        {
          src: '/assets/images/illustrative/post-stroke-min.jpg',
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
  const fallbackSpecialityImageSrc = '/assets/images/illustrative/services-home-min-1.jpg';
  const handleSpecialityImageError = (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === 'true') {
      return;
    }
    img.dataset.fallbackApplied = 'true';
    img.src = fallbackSpecialityImageSrc;
  };

  const opinions = [
    {
      name: 'Celeste Cutting',
      location: 'United Kingdom',
      initials: 'CC',
      avatarSrc: '/assets/images/team/miguel-costa-min.jpg',
      quote:
        'The staff are all very professional, friendly, incredibly patient and they are there for you 24 hours a day.',
      service: 'In Pain Medicine',
    },
    {
      name: 'Jean‑François Cristau',
      location: 'France',
      initials: 'JC',
      avatarSrc: '/assets/images/team/Miguel-Baptista-min.jpg',
      quote:
        'Indeed we have been greatly satisfied with your team and professional support over the past months.',
      service: 'In Stroke Medicine',
    },
    {
      name: 'Gerald Kraftman',
      location: 'Poland',
      initials: 'GK',
      avatarSrc: '/assets/images/illustrative/pain-medicine-algarve-min.jpg',
      quote:
        'We are very impressed with the approach of you and your team, and the treatment received over the last two months.',
      service: 'In Pain Medicine',
    },
    {
      name: 'Carole Lee',
      location: 'The Netherlands',
      initials: 'CL',
      avatarSrc: '/assets/images/illustrative/Physiotherapy-min.jpg',
      quote:
        'After treatment and guided exercises I can now get on with my life with much less pain and more confidence.',
      service: 'In Rehabilitation',
    },
  ];

  const scrollToOpinionSlide = (index) => {
    const track = opinionTrackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll('[data-opinion-slide="true"]');
    const el = slides[index];
    if (!(el instanceof HTMLElement)) return;
    track.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  };

  const pauseOpinionAutoplayForInteraction = () => {
    opinionAutoplayRef.current.interaction = true;
    if (opinionInteractionTimerRef.current) {
      window.clearTimeout(opinionInteractionTimerRef.current);
    }
    opinionInteractionTimerRef.current = window.setTimeout(() => {
      opinionAutoplayRef.current.interaction = false;
    }, 9000);
  };

  const handleOpinionPrev = () => {
    const nextIndex = opinionActiveSlide === 0 ? opinions.length - 1 : opinionActiveSlide - 1;
    pauseOpinionAutoplayForInteraction();
    scrollToOpinionSlide(nextIndex);
  };

  const handleOpinionNext = () => {
    const nextIndex = opinionActiveSlide === opinions.length - 1 ? 0 : opinionActiveSlide + 1;
    pauseOpinionAutoplayForInteraction();
    scrollToOpinionSlide(nextIndex);
  };

  const handleOpinionDotClick = (index) => {
    pauseOpinionAutoplayForInteraction();
    scrollToOpinionSlide(index);
  };

  const handleOpinionKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleOpinionPrev();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleOpinionNext();
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      pauseOpinionAutoplayForInteraction();
      scrollToOpinionSlide(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      pauseOpinionAutoplayForInteraction();
      scrollToOpinionSlide(opinions.length - 1);
    }
  };

  const handleOpinionPointerDown = (e) => {
    const track = opinionTrackRef.current;
    if (!track) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    opinionDragRef.current.pointerId = e.pointerId;
    opinionDragRef.current.startX = e.clientX;
    opinionDragRef.current.scrollLeft = track.scrollLeft;
    opinionDragRef.current.moved = false;
    opinionAutoplayRef.current.dragging = true;
    pauseOpinionAutoplayForInteraction();
    setIsOpinionDragging(true);
    try {
      track.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handleOpinionPointerMove = (e) => {
    const track = opinionTrackRef.current;
    if (!track) return;
    if (opinionDragRef.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - opinionDragRef.current.startX;
    if (Math.abs(dx) > 4) {
      opinionDragRef.current.moved = true;
    }
    track.scrollLeft = opinionDragRef.current.scrollLeft - dx;
  };

  const handleOpinionPointerUp = (e) => {
    const track = opinionTrackRef.current;
    if (!track) return;
    if (opinionDragRef.current.pointerId !== e.pointerId) return;
    const shouldSnap = opinionDragRef.current.moved;
    opinionDragRef.current.pointerId = null;
    opinionAutoplayRef.current.dragging = false;
    setIsOpinionDragging(false);
    try {
      track.releasePointerCapture(e.pointerId);
    } catch {}
    if (!shouldSnap) return;
    const slides = Array.from(track.querySelectorAll('[data-opinion-slide="true"]')).filter(
      (el) => el instanceof HTMLElement,
    );
    if (slides.length === 0) return;
    const scrollPosition = track.scrollLeft;
    let closestIndex = 0;
    let minDiff = Number.POSITIVE_INFINITY;
    slides.forEach((el, index) => {
      const diff = Math.abs(el.offsetLeft - scrollPosition);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    scrollToOpinionSlide(closestIndex);
  };

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

  useEffect(() => {
    const track = opinionTrackRef.current;
    if (!track) return undefined;

    let raf = 0;
    const updateActive = () => {
      const slides = Array.from(track.querySelectorAll('[data-opinion-slide="true"]')).filter(
        (el) => el instanceof HTMLElement,
      );
      if (slides.length === 0) return;
      const scrollPosition = track.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      slides.forEach((el, index) => {
        const distance = Math.abs(el.offsetLeft - scrollPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setOpinionActiveSlide(closestIndex);
    };

    const onScroll = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(updateActive);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    updateActive();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const track = opinionTrackRef.current;
    if (!track) return;
    track.scrollLeft = 0;
    setOpinionActiveSlide(0);
  }, []);

  useEffect(() => {
    opinionActiveSlideRef.current = opinionActiveSlide;
  }, [opinionActiveSlide]);

  useEffect(() => {
    const track = opinionTrackRef.current;
    if (!track) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          opinionAutoplayRef.current.inView = entry.isIntersecting;
        });
      },
      { threshold: 0.35 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    if (opinionAutoplayTimerRef.current) {
      window.clearInterval(opinionAutoplayTimerRef.current);
    }

    opinionAutoplayTimerRef.current = window.setInterval(() => {
      const state = opinionAutoplayRef.current;
      if (!state.inView || state.hover || state.focus || state.dragging || state.interaction) return;
      const current = opinionActiveSlideRef.current;
      const next = current === opinions.length - 1 ? 0 : current + 1;
      scrollToOpinionSlide(next);
    }, 5500);

    return () => {
      if (opinionAutoplayTimerRef.current) {
        window.clearInterval(opinionAutoplayTimerRef.current);
        opinionAutoplayTimerRef.current = null;
      }
    };
  }, [opinions.length]);

  useEffect(() => {
    return () => {
      if (opinionInteractionTimerRef.current) {
        window.clearTimeout(opinionInteractionTimerRef.current);
        opinionInteractionTimerRef.current = null;
      }
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const vids = [
        heroVideoRef.current,
        ...Array.from(document.querySelectorAll('.treatment-card-video')),
      ].filter(Boolean);
      vids.forEach((v) => {
        try {
          v.pause();
        } catch {}
      });
      return undefined;
    }
    const videos = [
      heroVideoRef.current,
      ...Array.from(document.querySelectorAll('.treatment-card-video')),
    ].filter(Boolean);
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (!(el instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          const dataSrc = el.getAttribute('data-src');
          if (dataSrc && !el.getAttribute('src')) {
            el.setAttribute('src', dataSrc);
          }
          el.play().catch(() => {});
        } else {
          try {
            el.pause();
          } catch {}
        }
      });
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.25 });
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const iframe = contactMapIframeRef.current;
    if (!iframe) return undefined;
    if (!(iframe instanceof HTMLIFrameElement)) return undefined;

    const loadMap = () => {
      const dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && !iframe.getAttribute('src')) {
        iframe.setAttribute('src', dataSrc);
      }
    };

    if (!('IntersectionObserver' in window)) {
      loadMap();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadMap();
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(iframe);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = heroVideoRef.current;
    const contentLayer = heroContentMotionRef.current;
    if (!heroEl || !videoLayer || !contentLayer) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const hasRAF = typeof window.requestAnimationFrame === 'function';
    const supports3d =
      typeof window.CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('transform', 'translate3d(0,0,0)');
    if (prefersReducedMotion) return undefined;
    let animating = false;
    let rafId = 0;
    let io;
    const ratios = isMobile ? { content: -24 } : { content: -42 };
    videoLayer.style.transform = '';
    const applyTransform = (el, y) => {
      if (supports3d) {
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      } else {
        el.style.transform = `translateY(${y}px)`;
      }
    };
    const tick = () => {
      const vh = window.innerHeight || 1;
      const rect = heroEl.getBoundingClientRect();
      const progress = Math.min(Math.max(rect.top / vh, -1), 1);
      applyTransform(contentLayer, progress * ratios.content);
      animating = false;
    };
    const onScroll = () => {
      if (animating) return;
      animating = true;
      if (hasRAF) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setTimeout(tick, 16);
      }
    };
    const onResize = () => {
      onScroll();
    };
    const observe = () => {
      if (!('IntersectionObserver' in window)) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        onScroll();
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first && first.isIntersecting) {
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onResize, { passive: true });
            onScroll();
          } else {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (supports3d) {
              contentLayer.style.transform = 'translate3d(0, 0, 0)';
            } else {
              contentLayer.style.transform = 'translateY(0)';
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(heroEl);
    };
    observe();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (io) {
        io.disconnect();
      }
      contentLayer.style.transform = '';
      videoLayer.style.transform = '';
    };
  }, []);

  return (
    <div className="home-page specialities-page">
      <section className="hero psx-hero" ref={heroRef}>
        <div className="hero-video psx-hero-backdrop" aria-hidden="true" ref={heroVideoRef} />
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
          <header className="home-section-treatment-header treatments-section-header">
            <div className="home-section-treatment-header-content">
              <p className="home-section-treatment-eyebrow home-stories-eyebrow">Pain Medicine</p>
              <h2 className="home-section-treatment-title home-stories-title" id="speciality-pain-medicine">Pain Medicine</h2>
              <p className="home-section-treatment-subtitle">
                Specialist assessment and coordinated care plans for acute and chronic pain conditions.
              </p>
            </div>
          </header>
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media" aria-hidden="true">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/pain-medicine-algarve-min.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onError={handleSpecialityImageError}
              />
            </div>
            <div className="treatments-feature-copy">
              <h3 className="treatments-feature-title">Pain Medicine</h3>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Specialist assessment and management of acute and chronic pain conditions affecting the spine,
                joints and nerves, with an emphasis on restoring function and quality of life.
              </p>
              <p className="treatments-feature-body">
                Services include comprehensive clinical evaluation, medication optimisation, multidisciplinary
                rehabilitation planning, and image-guided interventions such as ultrasound-guided injections,
                radiofrequency and vertebroplasty when clinically indicated.
              </p>
              <p className="treatments-feature-body">
                Expertise spans headache and facial pain syndromes, cervicogenic pain, neuropathic pain,
                post-surgical pain, and complex musculoskeletal pain requiring coordinated care.
              </p>
              <Link
                to="/specialities/pain-medicine/lumbar-spine-pain"
                className="treatment-card-button"
                aria-label="Learn more about pain medicine"
                onClick={() => trackEvent('nav_click', { location: 'specialities-feature', to: 'pain-medicine' })}
              >
                <span>Explore pain medicine</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-discovery" aria-labelledby="specialities-discovery-title">
          <div className="home-section-discovery-inner">
            <div className="home-discovery-layout">
              <header className="home-discovery-header">
                <h2 id="specialities-discovery-title" className="home-discovery-title">
                  Pain Medicine Discovery
                </h2>
                <p className="home-discovery-subtitle">
                  Explore common pain areas and learn how tailored assessment and treatment can help.
                </p>
              </header>

              <div
                className="home-discovery-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="Pain medicine categories carousel"
              >
                <input
                  className="home-discovery-radio"
                  type="radio"
                  name="home-discovery"
                  id="home-discovery-1"
                  defaultChecked
                />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-2" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-3" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-4" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-5" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-6" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-7" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-8" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-9" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-10" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-11" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-12" />

                <div className="home-discovery-viewport">
                  <ul className="home-discovery-track" role="list">
                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/head-pain"
                        className="home-discovery-card"
                        aria-label="Explore head pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'head-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 4.5c3 0 5.5 2.5 5.5 5.6 0 2.4-1.5 4.4-3.6 5.2-.7 1.7-2.2 3.2-4 4.2-1.8-1-3.3-2.5-4-4.2-2.1-.8-3.6-2.8-3.6-5.2C2.3 7 5 4.5 8 4.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.9 10.4h6.2"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Head Pain</h3>
                        <p className="home-discovery-card-body">
                          Headache and migraine syndromes assessed with a plan for relief and prevention.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/cervical-spine-pain"
                        className="home-discovery-card"
                        aria-label="Explore cervical spine pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'cervical-spine-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10 4.5c.7-1 1.6-1.5 2-1.5s1.3.5 2 1.5v4.2c0 .8-.4 1.6-1 2.1l-1 .9-1-.9c-.6-.5-1-1.3-1-2.1V4.5Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.5 12.5h7M9 15.5h6M10 18.5h4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Cervical Spine Pain</h3>
                        <p className="home-discovery-card-body">
                          Neck pain and stiffness assessed with targeted rehabilitation and interventions.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/lumbar-spine-pain"
                        className="home-discovery-card"
                        aria-label="Explore lumbar spine pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'lumbar-spine-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9 3.8h6M9 7.2h6M9 10.6h6M9 14h6M10.2 17.4h3.6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Lumbar Spine Pain</h3>
                        <p className="home-discovery-card-body">
                          Low back pain assessed with evidence-based pathways for relief and function.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/shoulder-pain"
                        className="home-discovery-card"
                        aria-label="Explore shoulder pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'shoulder-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.2 13.4c0-2.6 2.1-4.7 4.8-4.7h.2c2.6 0 4.8 2.1 4.8 4.7v5.1H7.2v-5.1Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5.5v3.2"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Shoulder Pain</h3>
                        <p className="home-discovery-card-body">
                          Rotator cuff and joint pain managed to restore movement and strength.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/hand-and-elbow-pain"
                        className="home-discovery-card"
                        aria-label="Explore hand and elbow pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'hand-and-elbow-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.3 12.2v-5.1c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.2"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.7 11.3V6.6c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.7"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.1 11.5V7.2c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v6.6c0 2.7-1.6 4.8-4.6 4.8-2.7 0-4.1-1.5-4.6-3.3"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Hand and Elbow Pain</h3>
                        <p className="home-discovery-card-body">
                          Tendon and nerve-related pain affecting grip and daily function.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/hip-and-groin-pain"
                        className="home-discovery-card"
                        aria-label="Explore hip and groin pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'hip-and-groin-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10 4.5c.6 2 .5 3.9-.3 5.7l-1.2 2.6c-.3.7.2 1.5 1 1.5h2.4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M14 4.5c-.6 2-.5 3.9.3 5.7l1.2 2.6c.3.7-.2 1.5-1 1.5h-2.4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.2 18.7c0-1.6 1.3-2.9 2.8-2.9s2.8 1.3 2.8 2.9"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Hip and Groin Pain</h3>
                        <p className="home-discovery-card-body">
                          Hip and groin pain assessed to support walking comfort and return to activity.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/knee-pain"
                        className="home-discovery-card"
                        aria-label="Explore knee pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'knee-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.2 4.5c1.8 2.5 1.8 6.2 0 8.7-1.3 1.8-1.2 4.4.2 6.3"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M14.8 4.5c-1.8 2.5-1.8 6.2 0 8.7 1.3 1.8 1.2 4.4-.2 6.3"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.6 12.2h4.8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Knee Pain</h3>
                        <p className="home-discovery-card-body">
                          Knee pain and instability assessed to improve strength, control and movement.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/thoracic-wall-pain"
                        className="home-discovery-card"
                        aria-label="Explore thoracic wall pain"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-discovery', to: 'thoracic-wall-pain' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.5 5.5c0 3.3-2 4.8-2 7.4 0 4.3 3.1 7.1 6.5 7.1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M16.5 5.5c0 3.3 2 4.8 2 7.4 0 4.3-3.1 7.1-6.5 7.1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.8 11.2h6.4M8.4 14.2h7.2"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Thoracic Wall Pain</h3>
                        <p className="home-discovery-card-body">
                          Rib and chest wall pain assessed to ease breathing and movement discomfort.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/abdominal-wall-pain"
                        className="home-discovery-card"
                        aria-label="Explore abdominal wall pain"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-discovery', to: 'abdominal-wall-pain' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.3 5.2c-1.2 1.6-1.8 3.5-1.8 5.5 0 5 3.5 9.1 5.5 9.1s5.5-4.1 5.5-9.1c0-2-.6-3.9-1.8-5.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.2 11.2h5.6M9.8 14.3h4.4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Abdominal Wall Pain</h3>
                        <p className="home-discovery-card-body">
                          Abdominal wall nerve and muscle pain assessed for targeted relief.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/pelvic-and-gynaecological"
                        className="home-discovery-card"
                        aria-label="Explore pelvic and gynaecological pain"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-discovery', to: 'pelvic-and-gynaecological' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8 5.5c0 4.2-2.5 4.6-2.5 8.1 0 3.2 2.3 5.4 6.5 5.4s6.5-2.2 6.5-5.4C18.5 10.1 16 9.7 16 5.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.3 12.2h5.4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Pelvic &amp; Gynaecological Pain</h3>
                        <p className="home-discovery-card-body">
                          Persistent pelvic pain assessed with coordinated medical and rehabilitation care.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/facial-pain"
                        className="home-discovery-card"
                        aria-label="Explore facial pain"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-discovery', to: 'facial-pain' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 20.2c4.2 0 7.6-3.4 7.6-7.6S16.2 5 12 5 4.4 8.4 4.4 12.6s3.4 7.6 7.6 7.6Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M9.1 11.3h.01M14.9 11.3h.01"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.2 15.2c.8.7 1.8 1.1 2.8 1.1s2-.4 2.8-1.1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Facial Pain</h3>
                        <p className="home-discovery-card-body">
                          Facial pain syndromes assessed with specialist pathways for control and relief.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/foot-and-ankle-pain"
                        className="home-discovery-card"
                        aria-label="Explore foot and ankle pain"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-discovery', to: 'foot-and-ankle-pain' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.3 5.2c2.6 3.1 3.8 6 3.8 8.8v4.8c0 .9-.7 1.6-1.6 1.6H7.8c-1.1 0-2-.9-2-2 0-3 1.9-5.1 3.5-6.8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.1 14.2h3.1c1.1 0 2 .9 2 2 0 2.3-1.9 4.2-4.2 4.2h-1.3"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Foot and Ankle Pain</h3>
                        <p className="home-discovery-card-body">
                          Foot and ankle pain assessed to improve gait, loading and day-to-day comfort.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="home-discovery-controls" aria-label="Carousel controls">
                  <div className="home-discovery-arrows" aria-hidden="true">
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-12">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-2">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-2">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-1">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-3">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-3">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-2">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-4">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-4">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-3">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-5">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-5">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-4">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-6">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-6">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-5">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-7">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-7">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-6">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-8">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-8">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-7">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-9">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-9">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-8">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-10">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-10">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-9">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-11">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-11">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-10">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-12">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-12">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-11">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-1">›</label>
                    </div>
                  </div>

                  <div className="home-discovery-dots" aria-label="Choose a pain category">
                    <label className="home-discovery-dot" htmlFor="home-discovery-1" aria-label="Head pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-2" aria-label="Cervical spine pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-3" aria-label="Lumbar spine pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-4" aria-label="Shoulder pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-5" aria-label="Hand and elbow pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-6" aria-label="Hip and groin pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-7" aria-label="Knee pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-8" aria-label="Thoracic wall pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-9" aria-label="Abdominal wall pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-10" aria-label="Pelvic and gynaecological pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-11" aria-label="Facial pain" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-12" aria-label="Foot and ankle pain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section treatments-feature treatments-feature-mi" aria-labelledby="speciality-sports-medicine">
          <header className="home-section-treatment-header treatments-section-header">
            <div className="home-section-treatment-header-content">
              <p className="home-section-treatment-eyebrow home-stories-eyebrow">Sports medicine</p>
              <h2 className="home-section-treatment-title home-stories-title" id="speciality-sports-medicine">Sports Medicine</h2>
              <p className="home-section-treatment-subtitle">
                Diagnosis, rehabilitation and performance-focused care for sports injuries and overuse conditions.
              </p>
            </div>
          </header>
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media" aria-hidden="true">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/sports-medicine-min.jpeg"
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onError={handleSpecialityImageError}
              />
            </div>
            <div className="treatments-feature-copy">
              <h3 className="treatments-feature-title">Sports Medicine</h3>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Diagnosis and treatment of sports injuries and activity-related musculoskeletal conditions, from
                acute strains and tendon injuries to overuse syndromes and persistent joint pain.
              </p>
              <p className="treatments-feature-body">
                Services include return-to-sport assessments, functional rehabilitation programmes, targeted
                physiotherapy, injury prevention strategies, and performance optimisation guided by clinical
                examination and imaging where required.
              </p>
              <p className="treatments-feature-body">
                Our team supports athletes and active individuals with evidence-based protocols designed to reduce
                re-injury risk and improve biomechanics, strength, mobility and resilience.
              </p>
              <Link
                to="/specialities/sports-medicine/injuries"
                className="treatment-card-button"
                aria-label="Learn more about sports medicine"
                onClick={() => trackEvent('nav_click', { location: 'specialities-feature', to: 'sports-medicine' })}
              >
                <span>Explore sports medicine</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-discovery" aria-labelledby="specialities-sports-discovery-title">
          <div className="home-section-discovery-inner">
            <div className="home-discovery-layout">
              <header className="home-discovery-header">
                <h2 id="specialities-sports-discovery-title" className="home-discovery-title">
                  Sport Medicine Discovery
                </h2>
                <p className="home-discovery-subtitle">
                  Sports-focused assessment and rehabilitation—from injury care to performance optimisation.
                </p>
              </header>

              <div
                className="home-discovery-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="Sports medicine clinic services carousel"
              >
                <input
                  className="home-discovery-radio"
                  type="radio"
                  name="sports-discovery"
                  id="sports-discovery-1"
                  defaultChecked
                />
                <input className="home-discovery-radio" type="radio" name="sports-discovery" id="sports-discovery-2" />
                <input className="home-discovery-radio" type="radio" name="sports-discovery" id="sports-discovery-3" />
                <input className="home-discovery-radio" type="radio" name="sports-discovery" id="sports-discovery-4" />
                <input className="home-discovery-radio" type="radio" name="sports-discovery" id="sports-discovery-5" />
                <input className="home-discovery-radio" type="radio" name="sports-discovery" id="sports-discovery-6" />

                <div className="home-discovery-viewport">
                  <ul className="home-discovery-track" role="list">
                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/injuries"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine injuries"
                        onClick={() => trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'injuries' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9 6.6 6.6 9c-1 1-1 2.6 0 3.6l4.8 4.8c1 1 2.6 1 3.6 0l2.4-2.4c1-1 1-2.6 0-3.6L14.6 6.6c-1-1-2.6-1-3.6 0Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.3 10.1h.01M13.7 13.5h.01"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Injuries</h3>
                        <p className="home-discovery-card-body">
                          Assessment and treatment for acute strains, tendon issues and overuse injuries.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/prevention"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine prevention"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'prevention' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 3.2l7 3.4v6.2c0 4.6-3 8-7 9.9-4-1.9-7-5.3-7-9.9V6.6l7-3.4Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.2 12.2l1.9 1.9 3.7-4.1"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Prevention</h3>
                        <p className="home-discovery-card-body">
                          Screening and training strategies to reduce injury risk and improve durability.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/rehabilitation"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine rehabilitation"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'rehabilitation' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.2 10.4h9.6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9 8.8v3.2M15 8.8v3.2"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.4 17.8c1.2-.7 2.4-1.1 3.6-1.1 2.1 0 3.9 1 5.6 1.1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Rehabilitation</h3>
                        <p className="home-discovery-card-body">
                          Structured rehab to restore strength, control and a safe return to sport.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/performance"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine performance"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'performance' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.4 16.4a7.2 7.2 0 1 1 11.2 0"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 12.2l3 1.8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.2 18.6h5.6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Performance</h3>
                        <p className="home-discovery-card-body">
                          Performance testing and programmes to build speed, power and resilience.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/psychology"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine psychology"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'psychology' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 20c3.3 0 6-2.7 6-6 0-2.5-1.5-4.7-3.8-5.6-.4-2.8-2.7-4.8-5.6-4.8-3.2 0-5.6 2.6-5.6 5.7 0 1.2.4 2.4 1.1 3.3C6.5 13.1 6 14 6 15c0 2.8 2.3 5 6 5Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.3 14.2c.4-.7 1.1-1.1 1.7-1.1.9 0 1.6.7 1.6 1.6 0 .9-.6 1.4-1.6 1.7-.8.3-1.2.7-1.2 1.6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path d="M12 19.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Psychology</h3>
                        <p className="home-discovery-card-body">
                          Mental skills and support for confidence, focus and return-to-sport readiness.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/nutrition"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine nutrition"
                        onClick={() =>
                          trackEvent('nav_click', { location: 'specialities-sports-discovery', to: 'nutrition' })
                        }
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 8.2c-2.8 0-5.2 2.1-5.2 5.1 0 3.3 2.4 6.7 5.2 6.7s5.2-3.4 5.2-6.7c0-3-2.4-5.1-5.2-5.1Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8.2c0-2 1.2-3.7 3-4.7"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10.1 13.4h3.8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Nutrition</h3>
                        <p className="home-discovery-card-body">
                          Fueling plans to support recovery, body composition and training performance.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="home-discovery-controls" aria-label="Carousel controls">
                  <div className="home-discovery-arrows" aria-hidden="true">
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-6">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-2">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-2">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-1">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-3">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-3">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-2">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-4">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-4">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-3">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-5">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-5">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-4">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-6">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-6">
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-5">‹</label>
                      <label className="home-discovery-arrow" htmlFor="sports-discovery-1">›</label>
                    </div>
                  </div>

                  <div className="home-discovery-dots" aria-label="Choose a service">
                    <label className="home-discovery-dot" htmlFor="sports-discovery-1" aria-label="Injuries" />
                    <label className="home-discovery-dot" htmlFor="sports-discovery-2" aria-label="Prevention" />
                    <label className="home-discovery-dot" htmlFor="sports-discovery-3" aria-label="Rehabilitation" />
                    <label className="home-discovery-dot" htmlFor="sports-discovery-4" aria-label="Performance" />
                    <label className="home-discovery-dot" htmlFor="sports-discovery-5" aria-label="Psychology" />
                    <label className="home-discovery-dot" htmlFor="sports-discovery-6" aria-label="Nutrition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section treatments-feature treatments-feature-mi" aria-labelledby="speciality-stroke-medicine">
          <header className="home-section-treatment-header treatments-section-header">
            <div className="home-section-treatment-header-content">
              <p className="home-section-treatment-eyebrow home-stories-eyebrow">Stroke medicine</p>
              <h2 className="home-section-treatment-title home-stories-title" id="speciality-stroke-medicine">Stroke Medicine</h2>
              <p className="home-section-treatment-subtitle">
                Integrated rehabilitation and follow-up for neurological recovery and long-term independence.
              </p>
            </div>
          </header>
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media" aria-hidden="true">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/stroke-rehabilitation-min.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onError={handleSpecialityImageError}
              />
            </div>
            <div className="treatments-feature-copy">
              <h3 className="treatments-feature-title">Stroke Medicine</h3>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Integrated stroke rehabilitation and secondary prevention support, focused on improving mobility,
                communication, independence and long-term neurological recovery.
              </p>
              <p className="treatments-feature-body">
                Services include structured neurorehabilitation planning, physiotherapy and occupational therapy,
                speech and language therapy pathways, and coordinated follow-up to address spasticity, gait changes,
                pain, fatigue and functional limitations after stroke.
              </p>
              <p className="treatments-feature-body">
                Our multidisciplinary approach helps patients and families navigate recovery with clear goals,
                measurable progress and continuity of care across each stage of rehabilitation.
              </p>
              <Link
                to="/specialities/stroke-medicine/rehabilitation"
                className="treatment-card-button"
                aria-label="Learn more about stroke medicine"
                onClick={() => trackEvent('nav_click', { location: 'specialities-feature', to: 'stroke-medicine' })}
              >
                <span>Explore stroke medicine</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-mainpain-cards">
          <div className="home-section-mainpain-inner">
            <header className="home-section-treatment-header home-section-mainpain-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Explore specialities of Stroke Medicine</p>
                <h2 className="home-section-treatment-title">Where do you feel pain?</h2>
                <p className="home-section-treatment-subtitle">
                  Choose the area that best matches your pain to explore how we can help.
                </p>
              </div>
            </header>
            <div className="home-section-mainpain-grid">
              <nav className="stroke-topic-nav" aria-label="Stroke medicine topics">
                {strokeTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    to={topic.to}
                    className="stroke-topic-navLink"
                    aria-label={`Explore ${topic.title}`}
                    onClick={() => trackEvent('nav_click', { location: 'specialities-stroke-topics', to: topic.to })}
                    style={{
                      backgroundImage:
                        Array.isArray(topic.images) && topic.images.length > 0
                          ? `url(${topic.images[0].src})`
                          : undefined,
                    }}
                  >
                    {topic.title}
                  </Link>
                ))}
              </nav>
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
                  <img src="/assets/images/team/dr-miguel-costa-algarve-pain-centre.jpg" alt="Dr. Miguel Costa" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Costa</h3>
                  <p className="home-team-role">Physical Rehabilitation · Sports Medicine</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-miguel-batista-algarve-pain-centre.jpg" alt="Dr. Miguel Baptista" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Baptista</h3>
                  <p className="home-team-role">Neuroradiology</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-ricardo-frada-algarve-pain-centre.jpg" alt="Dr. Ricardo Frada" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Ricardo Frada</h3>
                  <p className="home-team-role">Orthopedic Surgery</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/illustrative/Physiotherapy-min.jpg" alt="Physiotherapy Team" loading="lazy" />
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

        <section className="home-section-treatment-cards">
          <div className="home-section-treatment-inner">
            <header className="home-section-treatment-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow home-stories-eyebrow">Clinically-led care plans</p>
                <h2 className="home-section-treatment-title home-stories-title">Our Treatment Approaches</h2>
                <p className="home-section-treatment-subtitle">
                  Evidence-based pathways from conservative care to advanced procedures—designed to relieve pain,
                  restore function and help you return to the activities you love.
                </p>
              </div>
            </header>
            <div className="home-section-treatment-grid">
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-non-invasive">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/illustrative/Physiotherapy-min.jpg"
                    alt="Physiotherapy session representing non-invasive pain treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Non‑invasive pain treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Manage back, neck and joint pain without surgery through physiotherapy, guided exercise and
                    personalised rehabilitation programmes that rebuild strength and flexibility.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key non-invasive modalities">
                    <span className="treatment-chip">Physiotherapy</span>
                    <span className="treatment-chip">Rehabilitation</span>
                    <span className="treatment-chip">Lifestyle coaching</span>
                  </div>
                  <Link
                    to="/treatments/non-invasive-treatments/physiotherapy"
                    className="treatment-card-button"
                    aria-label="Explore non-invasive pain treatment options"
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'non-invasive' })}
                  >
                    <span>Explore non‑invasive</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-minimally-invasive">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/illustrative/pain-medicine-algarve-min.jpg"
                    alt="Clinical pain procedure setting representing minimally invasive treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Minimally invasive procedures</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Targeted interventions with smaller incisions and faster recovery—such as ultrasound‑guided injections,
                    radiofrequency and vertebroplasty—performed by experienced specialists.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key minimally invasive techniques">
                    <span className="treatment-chip">Ultrasound‑guided</span>
                    <span className="treatment-chip">Radiofrequency</span>
                    <span className="treatment-chip">Vertebroplasty</span>
                  </div>
                  <Link
                    to="/treatments/minimally-invasive-treatments/vertebroplasty"
                    className="treatment-card-button"
                    aria-label="See minimally invasive procedure options"
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'minimally-invasive' })}
                  >
                    <span>Explore minimally invasive</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-surgical">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/illustrative/Lumber-Spine-Pain-min.jpg"
                    alt="Spine-related imagery representing surgical spine treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Surgical spine treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    When surgery is the right choice, our spine surgeons perform precise procedures—including tubular
                    microsurgery and decompression—focused on lasting relief and functional recovery.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key surgical approaches">
                    <span className="treatment-chip">Tubular microsurgery</span>
                    <span className="treatment-chip">Decompression</span>
                    <span className="treatment-chip">Spine surgery</span>
                  </div>
                  <Link
                    to="/treatments/surgical-treatments/tubular-microsurgery"
                    className="treatment-card-button"
                    aria-label="Discover surgical spine treatment options"
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'surgical' })}
                  >
                    <span>Explore surgical solutions</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-section-treatment-testimonials">
          <div className="home-section-treatment-inner">
            <header className="opinion-header">
              <h2 className="opinion-title">Your opinion makes a difference</h2>
            </header>

            <p className="sr-only" id="opinion-carousel-instructions">
              Use the previous and next buttons, left and right arrow keys, or swipe to navigate testimonials.
            </p>

            <div
              className="opinion-carousel"
              aria-label="Patient testimonials carousel"
              onMouseEnter={() => {
                opinionAutoplayRef.current.hover = true;
              }}
              onMouseLeave={() => {
                opinionAutoplayRef.current.hover = false;
              }}
              onFocus={(e) => {
                if (e.currentTarget.contains(e.target)) {
                  opinionAutoplayRef.current.focus = true;
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  opinionAutoplayRef.current.focus = false;
                }
              }}
            >
            

              <div
                id="opinion-track"
                className={`treatments-testimonials-grid ${isOpinionDragging ? 'is-dragging' : ''}`}
                ref={opinionTrackRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Patient testimonials"
                aria-describedby="opinion-carousel-instructions"
                tabIndex={0}
                onKeyDown={handleOpinionKeyDown}
                onPointerDown={handleOpinionPointerDown}
                onPointerMove={handleOpinionPointerMove}
                onPointerUp={handleOpinionPointerUp}
                onPointerCancel={handleOpinionPointerUp}
              >
                {opinions.map((opinion, index) => (
                  <article
                    className="testimonial-card"
                    key={`${opinion.name}-${index}`}
                    data-opinion-slide="true"
                    id={`opinion-slide-${index}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${opinions.length}`}
                  >
                    <div className="opinion-card-top">
                      <div className="testimonial-avatar" data-image="true">
                        <img
                          src={opinion.avatarSrc}
                          alt={`${opinion.name} avatar`}
                          width="44"
                          height="44"
                          sizes="44px"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          onError={(e) => {
                            const img = e.currentTarget;
                            const wrap = img.closest('.testimonial-avatar');
                            if (wrap) wrap.dataset.image = 'false';
                          }}
                        />
                        <span className="testimonial-avatar-initials" aria-hidden="true">
                          {opinion.initials}
                        </span>
                      </div>
                      <div className="opinion-identity">
                        <div className="testimonial-name">{opinion.name}</div>
                        <div className="testimonial-location">{opinion.location}</div>
                      </div>
                    </div>

                    <div className="opinion-card-quote">
                      <span className="opinion-quote-icon opinion-quote-icon-start" aria-hidden="true">
                        “
                      </span>
                      <p className="testimonial-quote">{opinion.quote}</p>
                      <span className="opinion-quote-icon opinion-quote-icon-end" aria-hidden="true">
                        ”
                      </span>
                    </div>

                    <div className="testimonial-service">{opinion.service}</div>
                  </article>
                ))}
              </div>

              
            </div>
            
          </div>
        </section>

        <section className="home-section-location" aria-labelledby="location-title">
          <div className="home-section-location-inner">
            <header className="location-header">
              <h2 className="location-title" id="location-title">
                Our Location
              </h2>
              <div className="location-title-rule" aria-hidden="true" />
            </header>

            <div className="location-grid">
              <div className="location-details" aria-label="Address and opening hours">
                <address className="location-address">
                  Av. do Mar
                  <br />
                  8135-107, Portugal
                </address>

                <a className="location-phone" href="tel:+351915915001" aria-label="Call +351 915 915 001">

                  <span className="location-phone-text">+351 915 915 001</span>
                </a>

                <div className="location-hours" aria-label="Hours of operation">
                  <div className="location-hours-title">Hours of Operation:</div>
                  <div className="location-hours-list" role="list">
                    {[
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                    ].map((day) => (
                      <div className="location-hours-row" role="listitem" key={day}>
                        <span className="location-hours-day">{day}</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="navbar-cta navbar-cta-desktop navbar-cta-dark location-book-cta"
                  aria-label="Book now"
                >
                  <span>Book Now</span>
                  <span className="navbar-cta-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </Link>
              </div>

              <div className="location-map" aria-label="Map">
                <iframe
                  ref={contactMapIframeRef}
                  className="location-map-iframe"
                  title="Business location map"
                  data-src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

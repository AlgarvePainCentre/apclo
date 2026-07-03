import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './HomeCare.css';

const HomeCarePage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'services',
        question: 'What services are typically provided in home care?',
        answer:
          'Home care commonly includes help with personal care, mobility support, meal preparation, medication reminders, and home safety guidance. The exact support is tailored to your needs and goals.',
      },
      {
        id: 'long-term',
        question: 'Is home care suitable for long-term use?',
        answer:
          'Yes. Home care can be a long-term solution, offering consistent support that can be adjusted as health, mobility, or routines change over time.',
      },
      {
        id: 'family',
        question: 'How does home care support family members?',
        answer:
          'Home care can reduce caregiver stress by sharing day-to-day responsibilities, providing structure, and helping families plan safe routines while maintaining privacy and dignity.',
      },
      {
        id: 'mobility',
        question: 'Can home care providers help with mobility issues?',
        answer:
          'Yes. Providers can assist with transfers and walking, support the safe use of equipment, and help reduce falls risk through practical strategies and home set-up recommendations.',
      },
      {
        id: 'insurance',
        question: 'Is home care covered by insurance?',
        answer:
          'Coverage varies by insurer and policy. It’s best to confirm with your provider, and our team can help with documentation if your insurer requests it.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Home care in Algarve | Support for recovery and independence';
    document.title = pageTitle;

    const description =
      'Discover home care in Algarve for recovery, mobility, and daily activities. Practical, compassionate care and simple booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <div className="psx-page home-care-page page-homecare" id="psx-home-care">
      <header className="treatment-page-hero home-care-hero" aria-label="Home care hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/illustrative/Home-Care-min.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Home care</h1>
          <p className="psx-hero-subtitle">
            Professional support at home helps you continue treatment in a familiar setting.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Home care" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="hc-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Home-Care-min.webp"
                alt="Home care support for recovery, mobility, and daily activities delivered in a familiar home environment (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="hc-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Home care provides practical support where it matters most—at home. It may include help with mobility, personal care, daily
                routines, medication reminders, and safety strategies that reduce falls risk and support recovery after illness, injury, or
                surgery.
              </p>
              <p className="treatments-feature-body">
                Care starts with an assessment of needs and goals: what tasks are difficult, what risks exist in the home, and what level of
                support is helpful. Plans are personalised and can be adjusted as recovery progresses.
              </p>
              <p className="treatments-feature-body">
                Home care often works alongside physiotherapy, occupational therapy, and medical follow‑up. The aim is independence where
                possible, and safe, compassionate support when assistance is needed.
              </p>
            </div>
          </div>
        </section>

        <div className="page-section home-care-conditions tms-conditions-inner" aria-labelledby="hc-conditions-title">
          <header className="pt-conditions-header tms-conditions-header">
            <h2 id="hc-conditions-title" className="pt-conditions-title tms-conditions-title">
              Conditions Treated with Home Care
            </h2>
          </header>

          <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with home care">
            <article className="pt-condition-card tms-conditions-card" role="listitem" aria-labelledby="hc-condition-mobility-title">
              <div className="pt-condition-text tms-conditions-copy">
                <h3 id="hc-condition-mobility-title" className="pt-condition-title tms-conditions-card-title">
                  Mobility Limitations
                </h3>
                <p className="pt-condition-body tms-conditions-card-body">
                  Individuals who have trouble moving around due to age, injury, or disability often find substantial support in home care.
                </p>
              </div>
              <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="pt-condition-image tms-conditions-image"
                  src="/assets/images/HomeCare/DSC06795.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="pt-condition-card tms-conditions-card" role="listitem" aria-labelledby="hc-condition-chronic-title">
              <div className="pt-condition-text tms-conditions-copy">
                <h3 id="hc-condition-chronic-title" className="pt-condition-title tms-conditions-card-title">
                  Chronic Conditions
                </h3>
                <p className="pt-condition-body tms-conditions-card-body">
                  Conditions like diabetes, hypertension, and arthritis are easier to manage with help in medication administration, dietary
                  support, and regular health monitoring.
                </p>
              </div>
              <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="pt-condition-image tms-conditions-image"
                  src="/assets/images/HomeCare/DSC07125.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="pt-condition-card tms-conditions-card" role="listitem" aria-labelledby="hc-condition-postsurgery-title">
              <div className="pt-condition-text tms-conditions-copy">
                <h3 id="hc-condition-postsurgery-title" className="pt-condition-title tms-conditions-card-title">
                  Post‑Surgery Recovery
                </h3>
                <p className="pt-condition-body tms-conditions-card-body">
                  Home care provides an ideal environment for healing, offering assistance with wound care, pain management, and mobility as
                  one regains strength.
                </p>
              </div>
              <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="pt-condition-image tms-conditions-image"
                  src="/assets/images/HomeCare/DSC07641.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="pt-condition-card tms-conditions-card" role="listitem" aria-labelledby="hc-condition-neuro-title">
              <div className="pt-condition-text tms-conditions-copy">
                <h3 id="hc-condition-neuro-title" className="pt-condition-title tms-conditions-card-title">
                  Neurological Disorders
                </h3>
                <p className="pt-condition-body tms-conditions-card-body">
                  For patients with dementia, Parkinson’s, or other neurological conditions, home care can provide essential support,
                  structure, and companionship.
                </p>
              </div>
              <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="pt-condition-image tms-conditions-image"
                  src="/assets/images/HomeCare/DSC07698-Edit.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="pt-condition-card tms-conditions-card" role="listitem" aria-labelledby="hc-condition-mental-title">
              <div className="pt-condition-text tms-conditions-copy">
                <h3 id="hc-condition-mental-title" className="pt-condition-title tms-conditions-card-title">
                  Mental Health &amp; <br /> Emotional Support
                </h3>
                <p className="pt-condition-body tms-conditions-card-body">
                  Home care can benefit individuals struggling with depression or loneliness by providing companionship and ensuring they
                  have a stable routine and engagement.
                </p>
              </div>
              <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                <img
                  className="pt-condition-image tms-conditions-image"
                  src="/assets/images/HomeCare/DSC06895.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </div>
        </div>

        <section className="page-section hc-faq" aria-labelledby="hc-faq-title">
          <div className="hc-faq-inner">
            <header className="hc-faq-header">
              <h2 id="hc-faq-title" className="hc-faq-title">
                Home Care FAQ
              </h2>
            </header>

            <div className="hc-faq-card" role="list" aria-label="Home care frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `hc-faq-${item.id}`;
                const panelId = `hc-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="hc-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="hc-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="hc-faq-question">{item.question}</span>
                      <span className="hc-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="hc-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="hc-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default HomeCarePage;

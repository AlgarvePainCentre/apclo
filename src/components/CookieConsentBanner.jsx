import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsentBanner.css';
import { onOpenCookieSettings, useCookieConsent } from '../utils/cookieConsent';

const initialDraft = {
  preferences: false,
  analytics: false,
  media: false,
};

export default function CookieConsentBanner() {
  const { consent, hasResponded, acceptAll, rejectOptional, updateConsent } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(!hasResponded);
  const [isCustomising, setIsCustomising] = useState(false);
  const [draft, setDraft] = useState(initialDraft);

  useEffect(() => {
    setDraft({
      preferences: Boolean(consent.preferences),
      analytics: Boolean(consent.analytics),
      media: Boolean(consent.media),
    });
    if (!hasResponded) {
      setIsOpen(true);
    }
  }, [consent, hasResponded]);

  useEffect(() => onOpenCookieSettings(() => setIsOpen(true)), []);

  if (!isOpen) return null;

  const closeBanner = () => {
    if (hasResponded) {
      setIsOpen(false);
      setIsCustomising(false);
    }
  };

  const saveCustomChoices = () => {
    updateConsent(draft);
    setIsOpen(false);
    setIsCustomising(false);
  };

  return (
    <aside className="cookie-consent" aria-labelledby="cookie-consent-title" aria-live="polite">
      <div className="cookie-consent__body">
        <div>
          <h2 id="cookie-consent-title" className="cookie-consent__title">
            Cookie preferences
          </h2>
          <p className="cookie-consent__text">
            We use necessary cookies to keep the website secure and working properly. Optional cookies are used only if you allow them.
            Read our <Link to="/company/cookie-policy">Cookie Policy</Link> or visit the <Link to="/company/cookies">Cookies</Link> page
            for a shorter overview.
          </p>
        </div>

        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={() => { acceptAll(); setIsOpen(false); }}>
            Accept all
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--secondary"
            onClick={() => {
              rejectOptional();
              setIsOpen(false);
              setIsCustomising(false);
            }}
          >
            Reject optional
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--ghost"
            aria-expanded={isCustomising}
            onClick={() => setIsCustomising((current) => !current)}
          >
            {isCustomising ? 'Hide settings' : 'Customise'}
          </button>
          {hasResponded ? (
            <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={closeBanner}>
              Close
            </button>
          ) : null}
        </div>

        {isCustomising ? (
          <div className="cookie-consent__panel">
            <h3 className="cookie-consent__panel-title">Choose which optional cookies to allow</h3>

            <label className="cookie-consent__option">
              <input type="checkbox" checked disabled />
              <span>
                <span className="cookie-consent__option-title">Strictly necessary</span>
                <span className="cookie-consent__option-text">
                  Required for security, routing, consent storage, and essential website behaviour.
                </span>
              </span>
            </label>

            <label className="cookie-consent__option">
              <input
                type="checkbox"
                checked={draft.preferences}
                onChange={(event) => setDraft((current) => ({ ...current, preferences: event.target.checked }))}
              />
              <span>
                <span className="cookie-consent__option-title">Preferences</span>
                <span className="cookie-consent__option-text">Stores optional interface preferences if those features are used.</span>
              </span>
            </label>

            <label className="cookie-consent__option">
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
              />
              <span>
                <span className="cookie-consent__option-title">Analytics</span>
                <span className="cookie-consent__option-text">
                  Reserved for measurement tools that would require your consent if enabled in the future.
                </span>
              </span>
            </label>

            <label className="cookie-consent__option">
              <input
                type="checkbox"
                checked={draft.media}
                onChange={(event) => setDraft((current) => ({ ...current, media: event.target.checked }))}
              />
              <span>
                <span className="cookie-consent__option-title">Media and maps</span>
                <span className="cookie-consent__option-text">
                  Allows third-party video and map embeds that may set their own cookies once loaded.
                </span>
              </span>
            </label>

            <div className="cookie-consent__actions">
              <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={saveCustomChoices}>
                Save choices
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

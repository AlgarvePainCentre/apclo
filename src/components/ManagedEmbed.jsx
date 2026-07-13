import { useEffect, useRef, useState } from 'react';
import './ManagedEmbed.css';
import { hasCookieConsent, openCookieSettings, updateCookieConsent, useCookieConsent } from '../utils/cookieConsent';

export default function ManagedEmbed(props) {
  const {
    src,
    title,
    className = '',
    type = 'media',
    allow,
    allowFullScreen = false,
    referrerPolicy,
    loading = 'lazy',
    openHref,
  } = props;

  const hostRef = useRef(null);
  const { consent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  const hasConsent = type === 'necessary' ? true : hasCookieConsent('media') || Boolean(consent.media);

  useEffect(() => {
    if (!hasConsent) return undefined;
    const node = hostRef.current;
    if (!node) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasConsent]);

  if (!hasConsent) {
    return (
      <div className={`managed-embed ${className}`.trim()} ref={hostRef}>
        <div className="managed-embed__placeholder">
          <h3 className="managed-embed__title">{type === 'map' ? 'Map disabled until consent' : 'Media disabled until consent'}</h3>
          <p className="managed-embed__text">
            This {type === 'map' ? 'map' : 'embedded content'} may use third-party cookies or similar tracking technologies. You can allow
            media and maps in cookie settings or continue without loading it.
          </p>
          <div className="managed-embed__actions">
            <button type="button" className="managed-embed__btn managed-embed__btn--primary" onClick={() => updateCookieConsent({ media: true })}>
              Allow media and maps
            </button>
            <button type="button" className="managed-embed__btn managed-embed__btn--secondary" onClick={openCookieSettings}>
              Cookie settings
            </button>
            {openHref ? (
              <a className="managed-embed__link" href={openHref} target="_blank" rel="noopener noreferrer">
                Open externally
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`managed-embed ${className}`.trim()} ref={hostRef}>
      {isVisible ? (
        <iframe
          className={`managed-embed__frame ${className}`.trim()}
          src={src}
          title={title}
          loading={loading}
          referrerPolicy={referrerPolicy}
          allow={allow}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <div className="managed-embed__placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

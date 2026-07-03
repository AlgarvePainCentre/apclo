import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { doctorsData } from '../../data/doctorsData';
import '../../styles/pages/doctor-detail-page.css';

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doctor = doctorsData.find(d => d.id === id);

  if (!doctor) {
    return <Navigate to="/about" replace />;
  }

  return (
    <div className="doctor-detail-page">
      <div className="doctor-detail-grid">
        <section className="doctor-detail-info" aria-label="Doctor details">
          <div className="doctor-detail-info-inner">
            <button 
              className="back-btn"
              onClick={() => navigate('/about')}
              aria-label="Back to About page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Team</span>
            </button>

            <h1 className="doctor-detail-name">{doctor.name}</h1>

            {doctor.bio && <p className="doctor-detail-intro">{doctor.bio}</p>}

            {doctor.roles && doctor.roles.length > 0 && (
              <div className="doctor-detail-section">
                <h3>Medical Specialty</h3>
                <ul className="doctor-detail-list">
                  {doctor.roles.map((role, idx) => (
                    <li key={idx}>{role}</li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.education && doctor.education.length > 0 && (
              <div className="doctor-detail-section">
                <h3>Education & Training</h3>
                <ul className="doctor-detail-list">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {(doctor.experience || doctor.contact) && (
              <div className="doctor-detail-section">
                <h3>Contact</h3>
                <div className="doctor-detail-meta">
                  {doctor.experience && (
                    <p className="doctor-detail-meta-item">
                      <span className="doctor-detail-meta-label">Experience</span>
                      <span className="doctor-detail-meta-value">{doctor.experience}</span>
                    </p>
                  )}
                  {doctor.contact?.email && (
                    <p className="doctor-detail-meta-item">
                      <span className="doctor-detail-meta-label">Email</span>
                      <a className="doctor-detail-meta-value" href={`mailto:${doctor.contact.email}`}>{doctor.contact.email}</a>
                    </p>
                  )}
                  {doctor.contact?.phone && (
                    <p className="doctor-detail-meta-item">
                      <span className="doctor-detail-meta-label">Phone</span>
                      <a className="doctor-detail-meta-value" href={`tel:${doctor.contact.phone}`}>{doctor.contact.phone}</a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {doctor.social && Object.keys(doctor.social).length > 0 && (
              <div className="doctor-detail-section doctor-detail-section--connect">
                <h3>Connect</h3>
                <div className="doctor-detail-social">
                  {doctor.social.linkedin && (
                    <a href={doctor.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {doctor.social.twitter && (
                    <a href={doctor.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                  )}
                  {doctor.social.facebook && (
                    <a href={doctor.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                  )}
                  {doctor.social.instagram && (
                    <a href={doctor.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>
        </section>

        <div className="doctor-detail-media" aria-hidden="true">
          {doctor.image ? (
            <img src={doctor.image} alt="" />
          ) : (
            <div className="doctor-detail-media-placeholder">
              <video
                className="doctor-detail-media-bgVideo"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster=""
                onCanPlay={(e) => {
                  try {
                    e.currentTarget.parentElement?.setAttribute('data-video-ready', 'true');
                    const maybePromise = e.currentTarget.play();
                    if (maybePromise && typeof maybePromise.catch === 'function') {
                      maybePromise.catch(() => {});
                    }
                  } catch {}
                }}
                onError={(e) => {
                  e.currentTarget.parentElement?.setAttribute('data-video-error', 'true');
                }}
                onEnded={(e) => {
                  try {
                    e.currentTarget.currentTime = 0;
                    const maybePromise = e.currentTarget.play();
                    if (maybePromise && typeof maybePromise.catch === 'function') {
                      maybePromise.catch(() => {});
                    }
                  } catch {}
                }}
              >
                <source src="/assets/videos/Cir.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                <source src="/assets/videos/Cir.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
              </video>
          
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DoctorDetail.preload = () => {
  return Promise.resolve();
};

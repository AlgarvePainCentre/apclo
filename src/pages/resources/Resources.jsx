import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Resources.css';

export default function Resources() {
  return (
    <div className="page">
      <Navbar />
      <section className="page-hero">
        <h1>Resources</h1>
        <p>Learn, read, and explore patient stories.</p>
      </section>
      <main className="page-main">
        <section className="page-section" id="tips-for-self-care">
          <h2>Tips for Self-Care</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="blog">
          <h2>Blog</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="overcoming-sciatica-pain">
          <h2>Overcoming Sciatica Pain</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="control-over-spine-degeneration">
          <h2>Control Over Spine Degeneration</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="recovering-from-sports-injuries">
          <h2>Recovering from Sports Injuries</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="all-testimonials">
          <h2>All Testimonials</h2>
          <p>Coming soon.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

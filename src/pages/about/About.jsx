import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './About.css';

export default function About() {
  return (
    <div className="page">
      <Navbar />
      <section className="page-hero">
        <h1>About</h1>
        <p>Learn more about us.</p>
      </section>
      <main className="page-main">
        <section className="page-section">
          <h2>Our Story</h2>
          <p>Share the history and mission of APC.</p>
        </section>
        <section className="page-section">
          <h2>Our Values</h2>
          <p>Describe the core values that guide your work.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Specialities.css';

export default function Specialities() {
  return (
    <div className="page">
      <Navbar />
      <section className="page-hero">
        <h1>Specialities</h1>
        <p>Our areas of expertise.</p>
      </section>
      <main className="page-main">
        <section className="page-section">
          <h2>Clinical Specialities</h2>
          <p>Describe key clinical specialities or services.</p>
        </section>
        <section className="page-section">
          <h2>Teams</h2>
          <p>Highlight teams or professionals involved.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

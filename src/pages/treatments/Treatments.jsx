import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Treatments.css';

export default function Treatments() {
  return (
    <div className="page">
      <Navbar />
      <section className="page-hero">
        <h1>Treatments</h1>
        <p>Explore treatments and services.</p>
      </section>
      <main className="page-main">
        <section className="page-section">
          <h2>Treatment Categories</h2>
          <p>Overview of available treatment categories.</p>
        </section>
        <section className="page-section">
          <h2>How It Works</h2>
          <p>Describe the process patients can expect.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

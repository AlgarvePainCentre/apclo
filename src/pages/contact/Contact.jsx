import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Contact.css';

export default function Contact() {
  return (
    <div className="page">
      <Navbar />
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with our team.</p>
      </section>
      <main className="page-main">
        <section className="page-section">
          <h2>Contact Details</h2>
          <p>Place for address, phone, and email.</p>
        </section>
        <section className="page-section">
          <h2>Contact Form</h2>
          <p>Placeholder for form fields and submission.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { Mail, MapPin, Phone, ArrowRight, Clock3 } from "lucide-react";
import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! We'll get back to you soon.");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* ================= HERO ================= */}

      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="section-label">GET IN TOUCH</span>

          <h1>
            Let's talk about
            <em> your time.</em>
          </h1>

          <p>
            Have a question about a timepiece, your order,
            or our collection? Our team is always here to
            help.
          </p>
        </div>

        {/* Decorative Watch */}

        <div className="contact-hero-watch">
          <div className="hero-watch-strap hero-watch-strap-top"></div>

          <div className="hero-watch">
            <div className="hero-watch-inner">
              <span className="hero-watch-brand">WATCHME</span>

              <span className="watch-marker marker-12">12</span>
              <span className="watch-marker marker-3">3</span>
              <span className="watch-marker marker-6">6</span>
              <span className="watch-marker marker-9">9</span>

              <div className="hero-watch-hand hour-hand"></div>
              <div className="hero-watch-hand minute-hand"></div>
              <div className="hero-watch-center"></div>
            </div>
          </div>

          <div className="hero-watch-strap hero-watch-strap-bottom"></div>
        </div>
      </section>

      {/* ================= CONTACT CONTENT ================= */}

      <section className="contact-section">

        <div className="contact-intro">
          <span className="section-label">CONTACT WATCHME</span>

          <h2>
            We'd love to
            <span> hear from you.</span>
          </h2>

          <p>
            Whether you're looking for your next everyday
            watch or need assistance with an existing order,
            reach out to us.
          </p>

          {/* CONTACT DETAILS */}

          <div className="contact-details">

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>

              <div>
                <span>VISIT US</span>
                <h3>Our Location</h3>
                <p>Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={20} />
              </div>

              <div>
                <span>CALL US</span>
                <h3>Phone</h3>
                <p>+977 9800000000</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={20} />
              </div>

              <div>
                <span>EMAIL US</span>
                <h3>Email</h3>
                <p>hello@watchme.com</p>
              </div>
            </div>

          </div>

          {/* BUSINESS HOURS */}

          <div className="contact-hours">
            <div className="hours-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>AVAILABLE</span>
              <strong>Monday — Saturday</strong>
              <p>10:00 AM — 6:00 PM</p>
            </div>
          </div>

        </div>

        {/* ================= FORM ================= */}

        <div className="contact-form-wrapper">

          <div className="form-heading">
            <span className="section-label">SEND A MESSAGE</span>

            <h2>
              Tell us how
              <em> we can help.</em>
            </h2>

            <p>
              Fill out the form and our team will get back
              to you as soon as possible.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">YOUR NAME</label>

                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS</label>

                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="message">YOUR MESSAGE</label>

              <textarea
                id="message"
                required
                rows="7"
                value={form.message}
                placeholder="Tell us how we can help..."
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              <span>Send Message</span>
              <ArrowRight size={18} />
            </button>

          </form>

        </div>

      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="contact-bottom">

        <div>
          <span className="section-label">
            WATCHME SERVICE
          </span>

          <h2>
            Your time matters.
            <em> So does your experience.</em>
          </h2>
        </div>

        <p>
          From choosing the right timepiece to getting
          support after your purchase, we're here for every
          moment.
        </p>

      </section>

    </main>
  );
};

export default Contact;

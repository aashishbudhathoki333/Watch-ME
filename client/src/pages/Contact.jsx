import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

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
      <section className="page-header">
        <p className="section-label">GET IN TOUCH</p>
        <h1>Contact Us</h1>
        <p>
          Have a question? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <h2>Let's talk.</h2>

          <p>
            Our team is here to help with product questions,
            orders and anything else you need.
          </p>

          <div className="contact-item">
            <MapPin />
            <div>
              <strong>Address</strong>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="contact-item">
            <Phone />
            <div>
              <strong>Phone</strong>
              <p>+977 9800000000</p>
            </div>
          </div>

          <div className="contact-item">
            <Mail />
            <div>
              <strong>Email</strong>
              <p>hello@watchme.com</p>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Your Name</label>
            <input
              required
              value={form.name}
              placeholder="Your name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
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

          <div className="form-group">
            <label>Message</label>
            <textarea
              required
              rows="6"
              value={form.message}
              placeholder="How can we help?"
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
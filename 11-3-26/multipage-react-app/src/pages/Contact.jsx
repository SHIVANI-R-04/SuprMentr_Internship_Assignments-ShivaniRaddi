function Contact() {
  return (
    <div className="page contact-page">
      <div className="content-wrapper">
        <h1>Get In Touch</h1>
        <p className="lead">
          Have questions or feedback about this multi-page SPA? We'd love to hear from you.
        </p>

        <form className="contact-form glass-box">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
            />
          </div>
          
          <div className="form-group">
            <textarea 
              placeholder="Your Message" 
              rows="6" 
              required
            ></textarea>
          </div>

          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
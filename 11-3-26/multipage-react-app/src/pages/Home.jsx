function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Build <span className="gradient-text">Modern React Apps</span> 🚀</h1>
          <p>
            Experience a stunning multi-page Single Page Application powered by 
            <strong> React Router</strong> and <strong>Vite</strong>.
          </p>
          <div className="hero-buttons">
            <a href="/about" className="btn primary">Explore the Project</a>
            <a href="/contact" className="btn secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why This App Feels Premium</h2>
        <div className="cards">
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Vite delivers instant HMR and optimized production builds.</p>
          </div>
          <div className="card">
            <div className="card-icon">🧩</div>
            <h3>Component-Based</h3>
            <p>Modular, reusable React components for scalable development.</p>
          </div>
          <div className="card">
            <div className="card-icon">🔀</div>
            <h3>Seamless Routing</h3>
            <p>Navigate between pages instantly without full reloads.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
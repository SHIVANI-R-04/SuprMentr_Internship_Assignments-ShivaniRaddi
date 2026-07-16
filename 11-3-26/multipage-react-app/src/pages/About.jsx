function About() {
  return (
    <div className="page about-page">
      <div className="content-wrapper">
        <h1>About This Project</h1>
        <p className="lead">
          This assignment demonstrates how to transform a simple React application 
          into a beautiful <strong>multi-page Single Page Application (SPA)</strong> 
          using React Router v6.
        </p>

        <div className="glass-box">
          <h3>Technologies Used</h3>
          <ul>
            <li><span className="highlight">React 18+</span> – Component library</li>
            <li><span className="highlight">Vite</span> – Next-gen build tool</li>
            <li><span className="highlight">React Router</span> – Client-side routing</li>
            <li><span className="highlight">Modern CSS</span> – Glassmorphism + gradients</li>
          </ul>
        </div>

        <p>
          Navigation happens smoothly without page reloads, giving users a native app-like experience.
        </p>
      </div>
    </div>
  );
}

export default About;
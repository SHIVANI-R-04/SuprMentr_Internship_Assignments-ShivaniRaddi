function NotFound() {
  return (
    <div className="page notfound-page">
      <div className="content-wrapper">
        <div className="error-content">
          <h1 className="error-code">404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="btn primary">Return to Home</a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
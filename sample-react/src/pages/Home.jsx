const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <p>
        This is the home page of our sample React website. We're glad you're
        here!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h2>Featured Products</h2>
      <p>
        Check out our amazing products designed to meet your needs and exceed
        your expectations.
      </p>

      <h2>Why Choose Us?</h2>
      <p>
        We are committed to providing the best quality products and excellent
        customer service. Our team of experts is always ready to help you find
        the perfect solution for your needs.
      </p>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button className="btn" style={{ marginRight: "1rem" }}>
          Learn More
        </button>
        <button className="btn" style={{ backgroundColor: "#e74c3c" }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

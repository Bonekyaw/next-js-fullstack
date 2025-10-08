const About = () => {
  const teamMembers = [
    { id: 1, name: "John Doe", role: "CEO & Founder", photo: "JD" },
    { id: 2, name: "Jane Smith", role: "CTO", photo: "JS" },
    { id: 3, name: "Mike Johnson", role: "Lead Developer", photo: "MJ" },
    { id: 4, name: "Sarah Wilson", role: "Designer", photo: "SW" },
  ];

  return (
    <div>
      <h1>About Us</h1>
      <p>
        We are a sample company dedicated to creating amazing web experiences
        using modern technologies like React.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to provide high-quality web solutions that help
        businesses grow and succeed in the digital world. We believe in creating
        user-friendly, responsive, and scalable applications.
      </p>

      <h2>Our Story</h2>
      <p>
        Founded in 2020, we have worked with numerous clients to create
        beautiful, functional websites that meet their unique needs. Our journey
        began with a small team of passionate developers and has grown into a
        full-service web development agency.
      </p>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Our team consists of experienced developers, designers, and project
          managers who are passionate about what they do.
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member">
              <div className="member-photo">{member.photo}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

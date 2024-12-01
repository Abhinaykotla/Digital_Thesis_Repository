import React from 'react';

const Home = () => {
  // Sample data for the homepage
  const latestTheses = [
    {
      title: "AI in Healthcare",
      description: "An analysis of the impact of artificial intelligence in the medical field.",
      imageUrl: "./ai1.jpg",
    },
    {
      title: "Blockchain Technology",
      description: "Exploring the uses of blockchain beyond cryptocurrencies.",
      imageUrl: "./blockchain.png",
    },
  ];

  const featuredTheses = [
    {
      title: "Climate Change Research",
      description: "A comprehensive study on climate change's effects over the last decade.",
      imageUrl: "./climate.jpg",
    },
    {
      title: "Quantum Computing",
      description: "Understanding the potential of quantum computing for modern challenges.",
      imageUrl: "./Quantum_Computing_Image.png",
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Digital Thesis Repository</h1>
          <br></br>
          <p className="hero-subtitle">Explore a collection of academic theses and dissertations</p>          
        </div>
      </section>

      <div className="content-section container">
        <h2>Latest Theses</h2>
        <div className="theses-grid">
          {latestTheses.map((thesis, index) => (
            <div key={index} className="card">
              <img src={thesis.imageUrl} alt={thesis.title} className="thesis-image" />
              <h3>{thesis.title}</h3>
              <p>{thesis.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section container">
        <h2>Featured Theses</h2>
        <div className="theses-grid">
          {featuredTheses.map((thesis, index) => (
            <div key={index} className="card">
              <img src={thesis.imageUrl} alt={thesis.title} className="thesis-image" />
              <h3>{thesis.title}</h3>
              <p>{thesis.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

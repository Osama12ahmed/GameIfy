import { useNavigate } from 'react-router-dom';
import '../components/about/About.css';
import Bar from '../components/bar/Bar';
import Footer from '../components/footer/Footer';

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <Bar />
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">Your Ultimate Gaming Destination</h2>
                        <p className="hero-subtitle">
                            Discover, explore, and immerse yourself in the world of gaming with our curated collection
                            of the best video games from around the globe.
                        </p>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Games</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Genres</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Mission</h2>
                        <p>Connecting gamers with their next favorite adventure</p>
                    </div>
                    <div className="mission-content">
                        <div className="mission-text">
                            <p>
                                At GameStore, we believe that gaming is more than just entertainment – it's an art form,
                                a storytelling medium, and a way to connect with people across the world. Our mission is
                                to provide gamers with a comprehensive platform where they can discover new titles,
                                explore different genres, and connect with the gaming community.
                            </p>
                            <p>
                                We curate our collection carefully, ensuring that every game meets our quality standards
                                and provides an exceptional gaming experience. Whether you're a casual gamer or a hardcore
                                enthusiast, we have something for everyone.
                            </p>
                        </div>
                        <div className="mission-image">
                            <div className="image-placeholder">
                                <span className="placeholder-icon">🎮</span>
                                <span className="placeholder-text">Gaming Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose GameStore?</h2>
                        <p>Discover what makes us the preferred choice for gamers worldwide</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3>Smart Discovery</h3>
                            <p>Advanced search and recommendation algorithms help you find games that match your preferences.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⭐</div>
                            <h3>Curated Quality</h3>
                            <p>Every game in our collection is carefully selected to ensure the highest quality and entertainment value.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Cross-Platform</h3>
                            <p>Access your gaming library from anywhere with our responsive design and mobile optimization.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌍</div>
                            <h3>Global Community</h3>
                            <p>Connect with gamers from around the world and share your gaming experiences.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3>Latest Updates</h3>
                            <p>Stay up-to-date with the newest releases and gaming industry news.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>24/7 Support</h3>
                            <p>Our dedicated support team is always ready to help you with any questions or issues.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Meet Our Team</h2>
                        <p>The passionate gamers behind GameStore</p>
                    </div>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">
                                <span className="avatar-icon">👨‍💻</span>
                            </div>
                            <h3>Osama Ahmed</h3>
                            <p className="member-role">FrontEnd  & UI/UX</p>
                            <p className="member-bio">
                                Gaming enthusiast with 15+ years of experience in the industry.
                                Passionate about creating the ultimate gaming platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Get in Touch</h2>
                        <p>Have questions? We'd love to hear from you!</p>
                    </div>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <p>osama11111777@gamestore.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📱</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+201064035699</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <h4>Address</h4>
                                    <p>123 Gaming Street, Tech City, TC 12345</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <button
                                className="contact-button"
                                onClick={() => navigate('/contact')}
                            >
                                Send us a Message
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

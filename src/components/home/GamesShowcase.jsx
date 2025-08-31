import { useEffect, useState } from "react";
import "./GamesSlider.css";
import Bar from "../bar/Bar";
import { useNavigate } from "react-router-dom";

export default function GamesShowcase() {
    const API_KEY = "fd118d4109764e4e92a581e5aeaee151";
    const [games, setGames] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=12`)
            .then((res) => res.json())
            .then((data) => {
                setGames(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
                setIsLoading(false);
            });
    }, []);

    // Auto slide كل 5 ثواني
    useEffect(() => {
        if (!games.length) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading amazing games...</p>
            </div>
        );
    }

    if (!games.length) {
        return (
            <div className="error-container">
                <p className="error-text">No games found. Please try again later.</p>
            </div>
        );
    }

    const featured = games[current];

    // Helper function to format rating
    const formatRating = (rating) => {
        if (!rating) return 'N/A';
        return rating.toFixed(1);
    };

    // Helper function to get rating color
    const getRatingColor = (rating) => {
        if (!rating) return 'var(--text-muted)';
        if (rating >= 4.5) return '#10b981'; // Green
        if (rating >= 4.0) return '#3b82f6'; // Blue
        if (rating >= 3.5) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="showcase-page">
            <Bar />

            <div className="games-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2 className="sidebar-title">Featured Games</h2>
                        <p className="sidebar-subtitle">Top rated games of all time</p>
                    </div>

                    <div className="games-list">
                        {games.map((game, index) => (
                            <div
                                key={game.id}
                                className={`thumb ${index === current ? "active" : ""}`}
                                onClick={() => setCurrent(index)}
                            >
                                <div className="thumb-image-container">
                                    <img src={game.background_image} alt={game.name} />
                                    <div className="thumb-overlay">
                                        <div className="rating-badge" style={{ color: getRatingColor(game.rating) }}>
                                            ⭐ {formatRating(game.rating)}
                                        </div>
                                    </div>
                                </div>
                                <div className="thumb-content">
                                    <span className="game-name">{game.name}</span>
                                    <span className="game-release">{formatDate(game.released)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* الـ Hero Banner */}
                <div
                    className="hero-section"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 50%, rgba(0, 0, 0, 0.53) 100%), url(${featured.background_image})`
                    }}
                >
                    <div className="hero-overlay">
                        <div className="hero-header">
                            <h1 className="hero-title">{featured.name}</h1>
                            <div className="hero-meta">
                                <div className="meta-item">
                                    <span className="meta-icon">⭐</span>
                                    <span className="meta-text" style={{ color: getRatingColor(featured.rating) }}>
                                        {formatRating(featured.rating)} / 5.0
                                    </span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-icon">📅</span>
                                    <span className="meta-text">{formatDate(featured.released)}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-icon">🎮</span>
                                    <span className="meta-text">{featured.genres?.[0]?.name || 'Action'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-description">
                            <p className="description-text">
                                {featured.description_raw ?
                                    featured.description_raw.substring(0, 200) + '...' :
                                    'Experience the thrill of this amazing game with stunning graphics and immersive gameplay.'
                                }
                            </p>
                        </div>

                        <div className="hero-actions">
                            <button 
                                className="action-button primary"
                                onClick={() => navigate(`/game/${featured.id}`)}
                            >
                                View Details
                            </button>
                            
                        </div>
                    </div>

                    {/* Navigation dots */}
                    <div className="hero-navigation">
                        {games.map((_, index) => (
                            <button
                                key={index}
                                className={`nav-dot ${index === current ? 'active' : ''}`}
                                onClick={() => setCurrent(index)}
                                aria-label={`Go to game ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GameDetails.css';

export default function GameDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [currentScreenshot, setCurrentScreenshot] = useState(0);


    const API_KEY = "fd118d4109764e4e92a581e5aeaee151";

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                setLoading(true);

                const resGame = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
                if (!resGame.ok) throw new Error("Game not found");
                const gameData = await resGame.json();

                const resVideos = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`);
                const videoData = await resVideos.json();

                let allScreens = [];
                let nextUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}&page_size=40`;

                while (nextUrl) {
                    const resScreens = await fetch(nextUrl);
                    const screenData = await resScreens.json();

                    if (screenData.results) {
                        allScreens = [...allScreens, ...screenData.results];
                    }

                    nextUrl = screenData.next; 
                }

                setGame({
                    ...gameData,
                    trailers: videoData.results || [],
                });

                setScreenshots(allScreens);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchGameDetails();
    }, [id]);




    const formatDate = (dateString) => {
        if (!dateString) return "Unknown";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const formatRating = (rating) => {
        return rating ? rating.toFixed(1) : "N/A";
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return "#00ff88";
        if (rating >= 3) return "#f59e0b";
        return "#ef4444";
    };

    if (loading) {
        return (
            <div className="game-details-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading game details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="game-details-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/')} className="back-button">
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="game-details-page">
                <div className="error-container">
                    <h2>Game not found</h2>
                    <button onClick={() => navigate('/')} className="back-button">
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="game-details-page">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>
            <div className="game-details-container">
                {/* Header */}
                <div className="game-header">
                    <h1 className="game-title">{game.name}</h1>
                </div>

                {/* Main Content */}
                <div className="game-content">
                    {/* Left Column - Image and Basic Info */}
                    <div className="game-left">
                        <div className="game-image-container">
                            <img
                                src={game.background_image || game.background_image_additional}
                                alt={game.name}
                                className="game-image"
                            />
                            <div className="game-rating">
                                <span className="rating-value" style={{ color: getRatingColor(game.rating) }}>
                                    ⭐ {formatRating(game.rating)}
                                </span>
                            </div>
                        </div>

                        <div className="game-basic-info">
                            <div className="info-item">
                                <span className="info-label">Release Date:</span>
                                <span className="info-value">{formatDate(game.released)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Platforms:</span>
                                <div className="platforms">
                                    {game.platforms?.slice(0, 5).map((platform) => (
                                        <span key={platform.platform.id} className="platform-tag">
                                            {platform.platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Genres:</span>
                                <div className="genres">
                                    {game.genres?.map((genre) => (
                                        <span key={genre.id} className="genre-tag">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Description and Details */}
                    <div className="game-right">

                        {game?.trailers && game.trailers.length > 0 && (
                            <div className="trailer-container">
                                <div className="trailer">
                                    <h2>Trailer</h2>
                                    <video
                                        src={game.trailers[0].data[480]}   // فيديو 480p
                                        poster={game.trailers[0].preview}  // صورة معاينة
                                        controls
                                    />
                                </div>
                            </div>
                        )}

                        {screenshots.length > 0 && (
                            <div className="screenshots-container">
                                <h2>Screenshots</h2>
                                <div className="screenshot-viewer">
                                    <button
                                        className="nav-btn left"
                                        onClick={() =>
                                            setCurrentScreenshot((prev) =>
                                                prev === 0 ? screenshots.length - 1 : prev - 1
                                            )
                                        }
                                    >
                                        ❮
                                    </button>

                                    <img
                                        src={screenshots[currentScreenshot].image}
                                        alt="Screenshot"
                                        className="screenshot-active"
                                    />

                                    <button
                                        className="nav-btn right"
                                        onClick={() =>
                                            setCurrentScreenshot((prev) =>
                                                prev === screenshots.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                    >
                                        ❯
                                    </button>
                                </div>
                            </div>
                        )}


                        <div className="game-description">
                            <h3>About</h3>
                            <p>{game.description_raw || game.description}</p>
                        </div>

                        {game.developers && game.developers.length > 0 && (
                            <div className="game-developers">
                                <h3>Developers</h3>
                                <div className="developers-list">
                                    {game.developers.map((dev) => (
                                        <span key={dev.id} className="developer-tag">
                                            {dev.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.publishers && game.publishers.length > 0 && (
                            <div className="game-publishers">
                                <h3>Publishers</h3>
                                <div className="publishers-list">
                                    {game.publishers.map((pub) => (
                                        <span key={pub.id} className="publisher-tag">
                                            {pub.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.tags && game.tags.length > 0 && (
                            <div className="game-tags">
                                <h3>Tags</h3>
                                <div className="tags-list">
                                    {game.tags.slice(0, 10).map((tag) => (
                                        <span key={tag.id} className="tag-item">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                </div>

                {/* Screenshots Section */}
                {game.short_screenshots && game.short_screenshots.length > 1 && (
                    <div className="screenshots-section">
                        <h3>Screenshots</h3>
                        <div className="screenshots-grid">
                            {game.short_screenshots.slice(1, 7).map((screenshot) => (
                                <div key={screenshot.id} className="screenshot-item">
                                    <img
                                        src={screenshot.image}
                                        alt={`${game.name} screenshot`}
                                        className="screenshot-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

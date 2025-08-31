import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import Bar from '../bar/Bar';

const API_KEY = "fd118d4109764e4e92a581e5aeaee151";

export default function Search() {
    const [query, setQuery] = useState("");
    const [games, setGames] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

    const searchGames = async () => {
        if (!query.trim()) return;
        
        setIsSearching(true);
        setHasSearched(true);
        
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=20`
            );
            const data = await response.json();
            setGames(data.results || []);
        } catch (error) {
            console.error('Error searching games:', error);
            setGames([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchGames();
        }
    };

    const handleGameClick = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    const formatRating = (rating) => {
        if (!rating) return 'N/A';
        return rating.toFixed(1);
    };

    const getRatingColor = (rating) => {
        if (!rating) return 'var(--text-muted)';
        if (rating >= 4.5) return '#10b981';
        if (rating >= 4.0) return '#3b82f6';
        if (rating >= 3.5) return '#f59e0b';
        return '#ef4444';
    };

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
        <div className="search-page">
            <Bar />
            
            {/* Search Section */}
            <div className="search-section">
                <div className="search-container">
                    <div className="search-box-large">
                        <input
                            type="text"
                            placeholder="Search for games, genres, or developers..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="search-input-large"
                        />
                        <button 
                            onClick={searchGames}
                            disabled={isSearching || !query.trim()}
                            className="search-button-large"
                        >
                            {isSearching ? (
                                <span className="search-spinner">⏳</span>
                            ) : (
                                <span>🔍</span>
                            )}
                        </button>
                    </div>
                    
                    {query && (
                        <div className="search-info">
                            <p>Press Enter or click search to find games</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Section */}
            <div className="results-section">
                {isSearching && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Searching for games...</p>
                    </div>
                )}

                {hasSearched && !isSearching && (
                    <div className="results-header">
                        <h2>Search Results for "{query}"</h2>
                        <p>{games.length} games found</p>
                    </div>
                )}

                {!isSearching && games.length > 0 && (
                    <div className="games-grid">
                        {games.map((game) => (
                            <div 
                                key={game.id} 
                                className="game-card"
                                onClick={() => handleGameClick(game.id)}
                            >
                                <div className="game-card-image">
                                    <img src={game.background_image} alt={game.name} />
                                    <div className="game-card-overlay">
                                        <div className="rating-badge" style={{ color: getRatingColor(game.rating) }}>
                                            ⭐ {formatRating(game.rating)}
                                        </div>
                                    </div>
                                </div>
                                <div className="game-card-content">
                                    <h3 className="game-card-title">{game.name}</h3>
                                    <p className="game-card-release">{formatDate(game.released)}</p>
                                    <div className="game-card-genres">
                                        {game.genres?.slice(0, 3).map((genre, index) => (
                                            <span key={genre.id} className="genre-tag">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {hasSearched && !isSearching && games.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🎮</div>
                        <h3>No games found</h3>
                        <p>Try adjusting your search terms or browse our featured games instead.</p>
                        <button 
                            className="browse-button"
                            onClick={() => navigate('/')}
                        >
                            Browse Featured Games
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}





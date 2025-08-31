import './games.css'
import Box from './Box'
import '../search/Search.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AllGames() {
    const API_KEY = "fd118d4109764e4e92a581e5aeaee151"
    const [active, setActive] = useState("Popular"); 
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ordering = "-added"; 
        if (active === "Top Rated") ordering = "-rating";
        if (active === "Most Additions") ordering = "-metacritic";

        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-09-01,2025-08-28&ordering=${ordering}&page_size=100`)
            .then((res) => res.json())
            .then((data) => setGames(data.results))
            .catch((err) => console.error(err));
    }, [active]); 



    
    function formatDate(dateString) {
        if (!dateString) return "Unknown";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function formatRating(rating) {
        return rating ? rating.toFixed(1) : "N/A";
    }

    function getRatingColor(rating) {
        if (rating >= 4) return "limegreen";
        if (rating >= 3) return "orange";
        return "red";
    }

    function handleGameClick(gameId) {
        navigate(`/game/${gameId}`);
    }


    return (
        <div className="gamesPage-container">
            <div className="filter-section">
                <Box cat='Popular' active={active === 'Popular'} onSelect={() => setActive('Popular')} />
                <Box cat='Top Rated' active={active === 'Top Rated'} onSelect={() => setActive('Top Rated')} />
                <Box cat='Most Additions' active={active === 'Most Additions'} onSelect={() => setActive('Most Additions')} />
            </div>

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
                                {game.genres?.slice(0, 3).map((genre) => (
                                    <span key={genre.id} className="genre-tag">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

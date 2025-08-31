import './GamesCategory.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GamesCategory() {
    const API_KEY = "fd118d4109764e4e92a581e5aeaee151";
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [recent, setRecent] = useState([]);
    const navigate = useNavigate();

    // helper functions
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString();
    };

    const formatRating = (rating) => rating ? rating.toFixed(1) : "N/A";

    const getRatingColor = (rating) => {
        if (rating >= 4) return "limegreen";
        if (rating >= 3) return "orange";
        return "red";
    };

    useEffect(() => {
        // Top Rated
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=6`)
            .then(res => res.json())
            .then(data => setTopRated(data.results));

        // Popular
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&page_size=6`)
            .then(res => res.json())
            .then(data => setPopular(data.results));

        // Recent releases (last year till now)
        const today = new Date().toISOString().split("T")[0];
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        const lastYearStr = lastYear.toISOString().split("T")[0];

        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=${lastYearStr},${today}&ordering=-released&page_size=6`)
            .then(res => res.json())
            .then(data => setRecent(data.results));
    }, []);

    const categories = [
        { title: "Top Rated", games: topRated, icon: "🏆" },
        { title: "Popular", games: popular, icon: "🔥" },
        { title: "Recent Releases", games: recent, icon: "🆕" }
    ];

    return (
        <div className="GamesCategory-container">
            <h2 className="category-title">Game Categories</h2>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <h3 className="category-name">{category.title}</h3>
                        <p className="category-description">
                            Discover the best games in this category
                        </p>
                        <div className="category-games">
                            {category.games.slice(0, 3).map((game) => (
                                <div 
                                    key={game.id} 
                                    className="game-item"
                                    onClick={() => navigate(`/game/${game.id}`)}
                                >
                                    <img src={game.background_image} alt={game.name} />
                                    <div className="game-info">
                                        <span className="game-name">{game.name}</span>
                                        <span className="game-rating" style={{ color: getRatingColor(game.rating) }}>
                                            ⭐ {formatRating(game.rating)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

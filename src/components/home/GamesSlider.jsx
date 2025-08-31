import { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function GamesSlider() {
    const API_KEY = "fd118d4109764e4e92a581e5aeaee151";
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // النهارده
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 3); // من 3 سنين
        const lastYearStr = lastYear.toISOString().split("T")[0];

        fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=${lastYearStr},${today}&ordering=-released&page_size=10`
        )
            .then((res) => res.json())
            .then((data) => setGames(data.results))
            .catch((err) => console.error(err));
    }, []);

    const nextSlide = () => {
        if (currentIndex + 4 < games.length) {
            setCurrentIndex((prev) => prev + 3);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 3);
        }
    };

    return (
        <div className="slider-section">
            <h2 className="section-title">New & Trending Games</h2>
            <div className="slider-container">
                <div className="btn">
                    <button className="slider-btn left" onClick={prevSlide}>‹</button>
                    <button className="slider-btn right" onClick={nextSlide}>›</button>
                </div>

                <div
                    className="slider-wrapper"
                    style={{ transform: `translateX(-${currentIndex * 320}px)` }} // 300px card + 20px gap
                >
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="slider-card"
                            onClick={() => navigate(`/game/${game.id}`)}
                        >
                            <div className="slider-card-image">
                                <img src={game.background_image} alt={game.name} />
                                <div className="slider-card-overlay">
                                    <span className="slider-rating">⭐ {game.rating}</span>
                                </div>
                            </div>
                            <div className="slider-card-content">
                                <h3 className="slider-card-title">{game.name}</h3>
                                <p className="slider-card-release">Release: {game.released}</p>
                                <div className="slider-genres">
                                    {game.genres.slice(0, 2).map((genre) => (
                                        <span key={genre.id} className="genre-tag">{genre.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

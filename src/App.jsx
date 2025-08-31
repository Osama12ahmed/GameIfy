import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Search from "./components/search/Search";
import About from "./pages/About";
import Home from "./pages/Home"
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}

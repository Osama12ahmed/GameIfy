import './box.css'

export default function Box({ cat, active, onSelect }) {
    return (
        <div className="checkbox-container">
            <input 
                className="checkbox-input" 
                id={`checkbox-${cat}`}
                type="checkbox"
                checked={active}
                onChange={onSelect}
            />
            <label className="checkbox-label" htmlFor={`checkbox-${cat}`}>
                {cat}
            </label>
        </div>
    )
}

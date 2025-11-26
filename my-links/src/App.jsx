import React, {useState, useEffect} from "react";
import './App.css';

function App() {
    const initialLinks = [
        {id: 1, title: "RICK Astley - Never gonna give you up", url: "https://ya.ru/video/preview/5979558539045545059"},
        {id: 2, title: "Группа крови - Виктор Цой", url: "https://ya.ru/video/preview/5766255353303682961"},
        {id: 3, title: "Мы ждем перемен - Виктор Цой", url: "https://ya.ru/video/preview/15980453350744990160"},
        {id: 4, title: "Rammstein - Du Hast", url: "https://ya.ru/video/preview/1091299875002304112"},
        {id: 5, title: "Михаил Круг - Владимирский централ", url: "https://ya.ru/video/preview/1526405256845231667"}
    ];

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoriteLinks');
        return saved? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteLinks', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const isFavorite = (id) => favorites.includes(id);

    return (
        <div className="app">
            <header>
                <h1>20.	Список любимых песен — список ссылок на музыку и отметка избранных</h1>
                <p>Нажми на "+", чтобы добавить в избранное</p>
            </header>

            <div className="links-grid">
                {initialLinks.map(link => (
                    <div key={link.id} className={`link-card ${isFavorite(link.id) ? 'favorite' : ''}`}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                            <span className="title">{link.title}</span>
                        </a>
                        <button className={`favorite-btn ${isFavorite(link.id) ? 'active' : ''}`} onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(link.id);
                        }} title={isFavorite(link.id) ? "erase from favorite" : "add to favorite"}>
                            {isFavorite(link.id) ? '-' : '+'}
                        </button>
                    </div>
                ))}
            </div>

            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h2>избранное ▶︎ •၊၊||၊|။||||| 0:10</h2>
                    <div className="links-grid">
                        {initialLinks.filter(link => isFavorite(link.id)).map(link => (
                            <div key={link.id} className="link-card favorite">
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setError('');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error('Erro na busca');
      const data = await res.json();
      setResults(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar mangás.');
    }
  };

  return (
    <div className="app-container">
      <h1>Catálogo de Mangás</h1>
      <input
        type="text"
        placeholder="Buscar mangás..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />

      {error && <p className="error">{error}</p>}

      <ul className="results-list">
        {results.map((manga) => (
          <li
            key={manga.id}
            className="result-item"
            onClick={() => window.location.href = `/manga.html?id=${manga.id}`}
          >
            {manga.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

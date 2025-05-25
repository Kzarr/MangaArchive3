const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Importa rotas
const mangaRoutes = require('./routes/mangaRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use('/api/manga', mangaRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

// Importa lista de mangás
const mangas = require('./data/mangas.json');

// Buscar mangás por nome
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.json([]);
  const results = mangas.filter(m => m.title.toLowerCase().includes(query));
  res.json(results);
});

// Dados de um mangá específico
app.get('/api/manga/:id', (req, res) => {
  const manga = mangas.find(m => m.id === req.params.id);
  if (!manga) return res.status(404).json({ error: 'Mangá não encontrado' });
  res.json(manga);
});

// Imagens do capítulo - lendo direto da pasta pública
app.get('/api/manga/:id/chapter/:num', (req, res) => {
  const { id, num } = req.params;
  const dirPath = path.join(__dirname, 'public', 'chapters', id, num);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(404).json({ error: 'Capítulo não encontrado ou pasta vazia' });
    }

    const images = files
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b))
      .map(f => `/chapters/${id}/${num}/${f}`);

    if (images.length === 0) {
      return res.status(404).json({ error: 'Nenhuma imagem encontrada no capítulo' });
    }

    res.json({ images });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

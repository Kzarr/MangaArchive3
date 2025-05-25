const path = require('path');
const fs = require('fs');
const mangas = require('../data/mangas.json');

exports.getMangaById = (req, res) => {
  const manga = mangas.find(m => m.id === req.params.id);
  if (!manga) return res.status(404).json({ error: 'Mangá não encontrado' });
  res.json(manga);
};

exports.getChapterImages = (req, res) => {
  const { id, num } = req.params;
  const dirPath = path.join(__dirname, '..', 'public', 'chapters', id, num);

  fs.readdir(dirPath, (err, files) => {
    if (err) return res.status(404).json({ error: 'Capítulo não encontrado ou pasta vazia' });

    const images = files
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b))
      .map(f => `/chapters/${id}/${num}/${f}`);

    if (images.length === 0) return res.status(404).json({ error: 'Nenhuma imagem encontrada no capítulo' });

    res.json({ images });
  });
};

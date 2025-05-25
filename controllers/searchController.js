const mangas = require('../data/mangas.json');

exports.searchMangas = (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.json([]);
  const results = mangas.filter(m => m.title.toLowerCase().includes(query));
  res.json(results);
};

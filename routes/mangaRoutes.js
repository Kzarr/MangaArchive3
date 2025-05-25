const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

// /api/manga/:id
router.get('/:id', mangaController.getMangaById);

// /api/manga/:id/chapter/:num
router.get('/:id/chapter/:num', mangaController.getChapterImages);

module.exports = router;

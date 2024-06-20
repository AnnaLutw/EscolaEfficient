const express = require('express');
const router = express.Router();
const service = require('./book.service');

router.post('/books', async (req, res) => {
    try {
        const news = await service.createBook(req.body, req);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/books', async (req, res) => {
    try {
        const news = await service.getAll(req);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/books', async (req, res) => {
    try {
        const news = await service.change(req.body);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

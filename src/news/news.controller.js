const express = require('express');
const router = express.Router();
const service = require('./news.service');

router.post('/news', async (req, res) => {
    try {
        const news = await service.createNews(req.body);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/news', async (req, res) => {
    try {
        const news = await service.getAll(req.body);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

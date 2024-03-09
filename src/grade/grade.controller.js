const express = require('express');
const router = express.Router();
const service = require('./grade.service');

router.post('/grade', async (req, res) => {
    try {
        const createdgrade = await service.createGrade(req.body);
        res.status(200).json(createdgrade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/grade', async (req, res) => {
    try {
        const grades = await service.getAll(); 
        res.status(200).json(grades); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.delete('/grade/:id', async ({ params }, res) => {
    try {
        const grades = await service.changeStatusById(params.id); 
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/grade/:id', async ({ params }, res) => {
    try {
        const grade = await service.getById(params.id); 
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/grade/:id', async ({ params, body }, res) => {
    try {
        const grade = await service.change(params.id, body); 
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

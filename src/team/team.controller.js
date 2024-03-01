const express = require('express');
const router = express.Router();
const service = require('./team.service');

router.post('/team', async (req, res) => {
    try {
        const createdTeam = await service.createTeam(req.body);
        res.status(200).json(createdTeam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/team', async (req, res) => {
    try {
        const teams = await service.getAll(); 
        res.status(200).json(teams); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.delete('/team/:id', async ({ params }, res) => {
    try {
        const team = await service.changeStatusById(params.id); 
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/team/:id', async ({ params }, res) => {
    try {
        const team = await service.getById(params.id); 
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/team/:id', async ({ params, body }, res) => {
    try {
        const team = await service.change(params.id, body); 
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

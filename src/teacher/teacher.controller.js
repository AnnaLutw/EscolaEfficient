const express = require('express');
const router = express.Router();
const service = require('./teacher.service');

router.post('/teacher', async (req, res) => {
    try {
        const createdTeacher = await service.createTeacher(req.body);
        res.status(200).json(createdTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/teacher', async (req, res) => {
    try {
        const teachers = await service.getAllTeachers(); 
        res.status(200).json(teachers); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.delete('/teacher/:id', async ({ params }, res) => {
    try {
        const teachers = await service.changeStatusById(params.id); 
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/teacher/:id', async ({ params }, res) => {
    try {
        const teacher = await service.getById(params.id); 
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/teacher/:id', async ({ params, body }, res) => {
    try {
        const teacher = await service.change(params.id, body); 
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

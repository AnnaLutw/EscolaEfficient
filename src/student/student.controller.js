const express = require('express');
const router = express.Router();
const service = require('./student.service');

router.post('/student', async (req, res) => {
    try {
        const createdStudent = await service.createStudent(req.body);
        res.status(200).json(createdStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/student', async (req, res) => {
    try {
        const students = await service.getAllStudents(); 
        res.status(200).json(students); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.delete('/student/:id', async ({ params }, res) => {
    try {
        const students = await service.changeStatusById(params.id); 
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/student/:id', async ({ params }, res) => {
    try {
        const student = await service.getById(params.id); 
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/student/:id', async ({ params, body }, res) => {
    try {
        const student = await service.change(params.id, body); 
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

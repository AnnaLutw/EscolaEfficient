const express = require('express');
const router = express.Router();
const service = require('./calendar.service');


router.get('/calendar', async (req, res) => {
    try {
        const calendarCreated = await service.getAll(); 
        res.status(200).json(calendarCreated); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
router.post(`/calendar`, async ({ body }, res) => {
    try {
        const calendarCreated = await service.createEvent( body);
        res.status(200).json(calendarCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

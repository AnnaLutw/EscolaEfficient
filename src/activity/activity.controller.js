const express = require('express');
const router = express.Router();
const service = require('./activity.service');

router.post(`/activity/:id`, async ({ body , params}, res) => {
    try {
        const createdActivity = await service.createActivity(params.id, body);
        res.status(200).json(createdActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

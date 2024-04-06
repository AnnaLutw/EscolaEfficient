const express = require('express');
const router = express.Router();
const { login, getUser } = require('../helpers/helpers');
const { createUser, editUser } = require('./user.service');

router.post('/auth', async ( {body}, res) => {
    try {
        const user = await login(body, res);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/user', async ( req, res) => {
    try {
        const user = await getUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/user', async ( req , res) => {
    try {
        const user = await editUser(req.body, req);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
router.post('/user/secretary', async ({body}, res) => {
    try {
        const user = await createUser(body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

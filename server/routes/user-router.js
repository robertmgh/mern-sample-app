const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.get('/user/:id', UserCtrl.getUserById);
router.get('/user', UserCtrl.getUsers);
router.post('/user', UserCtrl.createUser);
router.put('/user', UserCtrl.updateUser);
router.delete('/user/:id', UserCtrl.deleteUser);

module.exports = router;

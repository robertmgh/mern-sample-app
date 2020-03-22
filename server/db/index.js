const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/user', { useNewUrlParser: true }).catch(e => {
    console.error('Connection db error', e.message);
});

const db = mongoose.connection;

module.exports = db;

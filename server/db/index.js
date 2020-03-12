const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true }).catch(e => {
    console.error('Connection db error', e.message);
});

const db = mongoose.connection;

module.exports = db;

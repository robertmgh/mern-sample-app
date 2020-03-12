const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, require: true },
        surname: { type: String, require: true },
        age: { type: Number, require: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('user', User);

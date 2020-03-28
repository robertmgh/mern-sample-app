const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, require: true },
        surname: { type: String, require: true },
        age: { type: Number, require: true },
        email: { type: String, require: false },
        password: { type: String, require: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('user', User);

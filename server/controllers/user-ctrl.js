const User = require('../models/user-model');

createUser = (req, res) => {
    const body = req.body;

    if (!body || Object.keys(body).length < 3) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ succes: false, error: err });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created'
            });
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error
            });
        });
};

updateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            succes: false,
            error: 'You must provide body'
        });
    }

    User.findOne({ _id: body._id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err
            });
        }

        user.name = body.name;
        user.surname = body.surname;
        user.age = body.age;

        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    succes: false,
                    error
                });
            });
    });
};

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        return res.status(200).json({ success: true });
    }).catch(err => console.error(err));
};

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.error(err));
};

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users) {
            return res.status(404).json({ success: false, error: 'Users not found' });
        }

        return res.status(200).json({ success: true, data: users });
    });
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 8081;
const db = require('./db');
const userRouter = require('./routes/user-router');
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/build', { index: ['index.html'] }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

app.use('/api', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

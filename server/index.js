const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 8081;
const db = require('./db');
const userRouter = require('./routes/user-router');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/build', { index: ['index.html'] }));
app.use(passport.initialize());
app.use(passport.session());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const CLIENT_ID = '62407329557-c24murno5qkfctaadsf47d8kd3badagh.apps.googleusercontent.com';
const CLIENT_SECRET = 'ztyTlg-pCXE25-TjHXkzdmNH';

passport.use(
    'provider',
    new OAuth2Strategy(
        {
            authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
            tokenURL: 'https://oauth2.googleapis.com/token',
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: 'http://localhost:8081/auth/callback',
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(accessToken, refreshToken, profile, cb);
            return cb(null, {
                name: 'Robert',
                Surname: 'Testowy',
            });
            // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, 'userMockId');//user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, {
        name: 'Robert',
        surname: 'test',
    });
    // User.findById(id, function (err, user) {
    //     done(err, user);
    // });
});

app.get('/auth/provider', passport.authenticate('provider', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/callback', passport.authenticate('provider', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

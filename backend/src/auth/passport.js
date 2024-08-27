// auth/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { User } from '../models/user.model.js';


// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/users/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({
            email: profile.emails[0].value,
            fullName: profile.displayName,
            googleId: profile.id
        });
        done(null, newUser);
    } catch (err) {
        done(err);
    }
}));

// GitHub Strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/v1/users/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ githubId: profile.id });
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({
            email: profile.emails[0].value,
            fullName: profile.displayName,
            githubId: profile.id
        });
        done(null, newUser);
    } catch (err) {
        done(err);
    }
}));

// Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/api/v1/auth/twitter/callback'
}, async (token, tokenSecret, profile, done) => {
    try {
        const user = await User.findOne({ twitterId: profile.id });
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({
            email: profile.emails[0].value,
            fullName: profile.displayName,
            twitterId: profile.id
        });
        done(null, newUser);
    } catch (err) {
        done(err);
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

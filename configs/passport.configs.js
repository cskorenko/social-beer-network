const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user.model');

const facebookAuth = {
  clientID: '1109431952525294',
  clientSecret: '2eb01d254083ec9ac656252bd5f361bb',
  callbackURL: 'http://localhost:3001/login/callback'
}

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new FacebookStrategy(facebookAuth, findOrCreate));

  function findOrCreate (accessToken, refreshToken, profile, done) {

    const query = { 'facebook.id': profile.id };
    const updates = {
      $setOnInsert: {
        'facebook.username': profile.username,
        'facebook.publicRepos': profile._json.public_repos
      }
    };
    const options = { upsert: true, new: true };

    return User.findOneAndUpdate(query, updates, options).exec()
      .then((results) => {
        console.log(results);
        return done(null, results);
      })
      .catch((e) => {
        return done(e, null);
      });
  }
};

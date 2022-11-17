const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
        clientID:     "528502713683-6gjb5slg1i8kejvnbc1jhcbn1djs0a21.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

passport.serializeUser(function (user,done){
    done(null,user);
});

passport.deserializeUser(function (user,done){
    done(null,user);
});
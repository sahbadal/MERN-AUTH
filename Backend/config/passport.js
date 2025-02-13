import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI,SESSION_SECRET } from '../config/envConfig.js';

const configurePassport = (app) =>{
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 1000 * 60 * 60 * 24
      },
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_REDIRECT_URI,
        scope: ["profile", "email"]
      },(accessToken, refreshToken, profile, callback) =>{
        callback(null, profile)
      }
    )
  )

  passport.serializeUser((user,done) =>{
    done(null,user)
  })

  passport.deserializeUser((user,done) =>{
    console.log("User Session Data:", user);
    done(null,user)
  })
}

export default configurePassport;
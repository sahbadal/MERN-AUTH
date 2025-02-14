// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, SESSION_SECRET } from '../config/envConfig.js';
// import session from 'express-session';
// import userModel from '../models/userModel.js';

// const configurePassport = (app) => {
//   // Express Session Setup
//   app.use(
//     session({
//       secret: SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     })
//   );

//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Google OAuth Strategy
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: GOOGLE_REDIRECT_URI,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const email = profile.emails[0].value; // Google se email mil rahi hai
          
//           let user = await userModel.findOne({ email });

//           if (!user) {
//             user = new userModel({
//               name: profile.displayName,
//               email: email,
//             });
//             await user.save();
//           }

//           return done(null, user);
//         } catch (error) {
//           return done(error, null);
//         }
//       }
//     )
//   );

//   // Serialize User
//   passport.serializeUser((user, done) => {
//     done(null, user._id); // MongoDB `_id` store kar raha hoon
//   });

//   // Deserialize User
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await userModel.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });
// };

// export default configurePassport;

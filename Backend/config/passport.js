// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import userModel from '../models/userModel.js';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '../config/envConfig.js';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_REDIRECT_URI,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       console.log("Google Profile Data:", profile);
//       try {
//         let user = await userModel.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           user = new userModel({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             password: '', // No password needed for OAuth
//             isAccountVerified: true,
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user._id); // Serialize user ID
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id);
//     done(null, user); // Deserialize user
//   } catch (err) {
//     done(err, null);
//   }
// });

// export default passport;
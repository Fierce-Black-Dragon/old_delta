"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    // Fetch user from database
    const user = { id };
    done(null, user);
});
// passport.use(
//     new LocalStrategy((username, password, done) => {
//         // Authenticate user
//         const user = { id: 1, username };
//         return done(null, user);
//     }),
// );
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//             callbackURL: '/auth/google/callback',
//         },
//         (accessToken, refreshToken, profile, done) => {
//             // Check if user is already registered in the database
//             const user = { id: 1, username: profile.displayName };
//             return done(null, user);
//         },
//     ),
// );
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || '123',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // Implement your user authentication logic here
    // Call `done` with the authenticated user object or `false`
    const user = { id: 1, username: profile.displayName };
    return done(null, user);
}));
exports.default = passport_1.default;

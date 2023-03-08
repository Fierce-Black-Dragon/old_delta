import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
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


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || '123',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: '/auth/github/callback'
}, (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log(profile)

    // Implement your user authentication logic here
    // Call `done` with the authenticated user object or `false`
    const user = { id: 1, username: profile.displayName };
    return done(null, user);
}));
export default passport;

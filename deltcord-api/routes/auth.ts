

import express, { Request, Response } from "express";
import passport from "../controller/auth/passport";
// import { Login, Signup } from "../controllers/authController";
const router = express.Router();


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    },
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('http://localhost:5173/');
    },
);

export default router;
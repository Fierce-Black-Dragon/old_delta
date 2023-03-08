"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../controller/auth/passport"));
// import { Login, Signup } from "../controllers/authController";
const router = express_1.default.Router();
router.post('/login', passport_1.default.authenticate('local'), (req, res) => {
    res.send(req.user);
});
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:5173/');
});
exports.default = router;

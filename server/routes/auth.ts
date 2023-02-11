import express from 'express'
import * as authController from '../controller/authController'
import loginLimiter from '../middlewares/loginLimiter'

const router = express.Router();

router.route('/login')
    .post(loginLimiter, authController.login)

router.route('/register')
    .post(loginLimiter, authController.register)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

export default router
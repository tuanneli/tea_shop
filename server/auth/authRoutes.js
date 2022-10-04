import Router from "express";
import authControllers from "./authControllers.js";
import {check} from "express-validator";

const router = new Router();

router.post('/registration', [
    check('email', "This field can't be empty!").notEmpty(),
    check('password', "Min length of password id 4 symbols").isLength({min: 4})
], authControllers.registration)
router.post('/login', authControllers.login)
router.get('/users', authControllers.findUsers)

export default router;
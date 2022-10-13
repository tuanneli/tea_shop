import {Router} from "express";
import CustomerController from "./customer-controller.js";
import {body, check} from "express-validator";

const router = new Router();

router.post('/register',
    body('phone').isMobilePhone().isLength({min: 11, max: 12}),
    CustomerController.register);
router.get('/findone', CustomerController.findOne);
router.get('/findall', CustomerController.findAll);

export default router;
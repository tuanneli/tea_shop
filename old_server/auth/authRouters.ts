const {Router} = require("express");
const authController = require("./authControllers");

const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.findUsers);

export default router;
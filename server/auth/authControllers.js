import Role from "./modules/Role.js";
import User from "./modules/User.js";
import bcrypt from "bcryptjs";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const generateWebToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class AuthControllers {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка в ходе регистрации", errors});
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Такой пользователь уже зарегестрирован"});
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: "USER"});
            const user = await User.create({email, password: hashPassword, roles: [userRole.value]});
            await user.save();
            res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(404).json("Registration error");
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json(`User with email: ${email} was not found...`);
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json("Incorrect password");
            }
            const token = generateWebToken(user._id, user.roles);
            return res.status(200).json({token: token});
        } catch (e) {
            console.log(e);
        }
    }

    async findUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(404).json({Message: "Error while finding users"})
        }
    }
}

export default new AuthControllers();
import Role from "./modules/Role.js";
import User from "./modules/User.js";
import bcrypt from "bcryptjs";
import {cookie, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import AuthService from "./service/authService.js";
import ApiError from "./error/ApiError.js";

dotenv.config();

class AuthControllers {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next(ApiError.badRequest('Ошибка валидации', errors.array()));
            }
            const {email, name, password} = req.body;
            const user = await AuthService.registration(email, name, password);
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                // secure: true
            })
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await AuthService.login(email, password);
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            console.log(req.cookies);
            const {refreshToken} = req.cookies;
            const token = AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);
            return res.status(200).json({Message: 'The user was activated successfully'});
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const user = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async findUsers(req, res, next) {
        try {
            const users = await AuthService.findAll();
            return res.status(200).json(users);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {email} = req.body;
            await AuthService.deleteOne(email);
            return res.status(200).json("Полтзователь был успешно удален");
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export default new AuthControllers();
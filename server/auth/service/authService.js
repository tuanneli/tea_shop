import {validationResult} from "express-validator";
import User from "../modules/User.js";
import Role from "../modules/Role.js";
import * as uuid from 'uuid';
import UserDto from "../../dto/userDto.js";
import TokenService from "./tokenService.js";
import MailService from "./mail-service.js";
import bcrypt from "bcryptjs";
import tokenService from "./tokenService.js";
import ApiError from "../../error/ApiError.js";

class AuthService {
    async registration(email, name, password) {
        const candidate = await User.findOne({email});
        if (candidate) {
            throw ApiError.badRequest('Пользователь уже зарегестрирован');
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        const activationLink = uuid.v4();
        const userRole = await Role.findOne({value: "USER"});
        const user = await User.create({email, name, password: hashPassword, roles: [userRole.value], activationLink});
        const userDto = new UserDto(user);
        await MailService.sendActivationLink(userDto, `${process.env.API_URL}/auth/activate/${activationLink}`);
        const tokens = TokenService.generateTokens({userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            user: userDto,
            ...tokens
        }
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            return ApiError.badRequest(`User with email: ${email} was not found...`);
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return ApiError.badRequest("Incorrect password");
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            user: userDto,
            ...tokens
        };
    }

    async logout(refreshToken) {
        return TokenService.removeToken(refreshToken);
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if (!user) {
            return ApiError.badRequest('Неверная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async findAll() {
        return User.find();
    }

    async deleteOne(email) {
        await User.findOneAndDelete({email});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.authorizationFailure();
        }
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const token = await TokenService.findToken(refreshToken);
        if (!userData || !token) {
            throw ApiError.authorizationFailure();
        }
        const user = await User.findById(userData.userDto.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService();
import jwt from 'jsonwebtoken'
import Token from "../modules/Token.js";

class TokenService {
    generateTokens(module) {
        const accessToken = jwt.sign(module, process.env.JWT_ACCESS, {expiresIn: '15min'});
        const refreshToken = jwt.sign(module, process.env.JWT_REFRESH, {expiresIn: '60d'});
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await Token.findOne({userId});
        if (token) {
            token.refreshToken = refreshToken;
            return token.save();
        }
        return await Token.create({userId, refreshToken});
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken});
    }

    async validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS);
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            const userData = await jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(token) {
        try {
            return Token.findOne({token})
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();
import CustomerService from "./service/customer-service.js";
import {validationResult} from "express-validator";
import ApiError from "../error/ApiError.js";

class CustomerController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next(ApiError.badRequest('Ошибка валидации', errors.array()));
            }
            const {name, phone} = req.body;
            const customer = await CustomerService.register(name, phone);
            return res.status(200).json(customer);
        } catch (e) {
            next(e);
        }
    }

    async findOne(req, res, next) {
        try {
            const {phone} = req.body;
            const customer = await CustomerService.findOne(phone);
            return res.status(200).json(customer);
        } catch (e) {
            next(e);
        }
    }

    async findAll(req, res, next) {
        try {
            const customers = await CustomerService.findAll();
            return res.status(200).json(customers);
        } catch (e) {
            next(e);
        }
    }
}

export default new CustomerController();
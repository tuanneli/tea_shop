import Customer from "../modules/Customer.js";
import ApiError from "../../error/ApiError.js";
import bcrypt from "bcryptjs";

class CustomerService {
    async register(name, phone) {
        const candidate = await Customer.findOne({phone});
        if (candidate) {
            throw ApiError.badRequest('Такой клиент уже зарегестрирован');
        }
        // const hashPhone = await bcrypt.hash(phone, 5);
        return await Customer.create({name, phone});
    }

    async findOne(phone) {
        const customer = await Customer.findOne({phone});
        if (!customer) {
            throw ApiError.badRequest('Такого клиента нет');
        }
        return customer;
    }

    async findAll() {
        return Customer.find();
    }

    async addOrders(orders, total, phone) {
        await Customer.findOneAndUpdate({phone}, {statistic: {total, orders}});
        const customer = Customer.findOne({phone});
        if (!customer) {
            throw ApiError.badRequest('Такого клиента нет');
        }
        console.log(customer);
        return customer;
    }
}

export default new CustomerService();
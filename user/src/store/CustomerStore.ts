import {makeAutoObservable} from "mobx";
import {ICustomer} from "../types/customerTypes";
import {CustomerService, GoodsService} from "../api/API";

export default class CustomerStore {
    constructor() {
        makeAutoObservable(this);
    }

    _customer = {} as ICustomer;

    get customer() {
        return this._customer;
    }

    setCustomer(customerData: ICustomer) {
        this._customer = customerData;
    }

    async addCustomer(name: string, phone: string) {
        try {
            const response = await CustomerService.registerCustomer(name, phone);
            this.setCustomer(response.data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async getCustomer(phone: string) {
        try {
            const response = await CustomerService.findCustomer(phone);
            this.setCustomer(response.data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async getCustomers() {
        try {
            const response = await CustomerService.findCustomers();
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }
}
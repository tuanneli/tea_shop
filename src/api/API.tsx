import axios, {AxiosError} from "axios";
import {$authHost, $host} from "./http/http";

export interface IUsers {
    "_id": string,
    "email": string,
    "name": string,
    "password": string,
    "roles": string[],
    "__v": number,
}

export const createUser = async (email: string, name: string, password: string) => {
    try {
        await $host.post(`auth/registration`, {
            email: email,
            name: name,
            password: password
        })
        return "";
    } catch (e: any) {
        const Error: AxiosError = e;
        const message = Error.response?.data as object;
        return JSON.parse(JSON.stringify(message)).message;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const result = await $host.post('auth/login', {
            email: email,
            password: password
        });
        localStorage.setItem('token', result.data.token);
        return result.data;
    } catch (e: any) {
        const error: AxiosError = e;
        return error.response?.data;
    }
}

export const getUsers = async () => {
    try {
        const result = await $authHost.get('auth/users');
        console.log(result.data.message)
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (id: string) => {
    try {
        const result = await $host.delete("auth/delete", {
            headers: {},
            data: {
                id: id
            }
        })
        console.log("item was deleted")
    } catch (e) {
        console.log(e);
    }
}
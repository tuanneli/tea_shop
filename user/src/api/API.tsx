import axios, {AxiosError, AxiosResponse} from "axios";
import {$host, baseURL} from "../http/http";

export interface IUser {
    "email": string,
    "name": string,
    "password": string,
}

export interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string,
}


export class AuthService {
    static async register(email: string, name: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $host.post<IResponse>(`${baseURL}/registration`, {email, name, password});
    }

    static async login(email: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $host.post<IResponse>(`${baseURL}/login`, {email, password});
    }

    static async logout(): Promise<void> {
        return $host.post(`${baseURL}/logout`);
    }
};

export class UsersService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $host.get<IUser[]>(`${baseURL}/users`);
    }

    static async deleteUser(email: string): Promise<void> {
        return $host.delete(`${baseURL}/delete`, {
            data: {
                email
            }
        })
    }
}

// export const createUser = async (email: string, name: string, password: string) => {
//     try {
//         await $host.post(`auth/registration`, {
//             email: email,
//             name: name,
//             password: password
//         })
//         return "";
//     } catch (e: any) {
//         const Error: AxiosError = e;
//         const message = Error.response?.data as object;
//         return JSON.parse(JSON.stringify(message)).message;
//     }
// }
//
// export const loginUser = async (email: string, password: string) => {
//     try {
//         const result = await $host.post('auth/login', {
//             email: email,
//             password: password
//         });
//         localStorage.setItem('token', result.data.token);
//         return result.data;
//     } catch (e: any) {
//         const error: AxiosError = e;
//         return error.response?.data;
//     }
// }
//
// export const getUsers = async () => {
//     try {
//         const result = await $authHost.get('auth/users');
//         console.log(result.data.message)
//         return result.data;
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// export const deleteUser = async (id: string) => {
//     try {
//         const result = await $host.delete("auth/delete", {
//             headers: {},
//             data: {
//                 id: id
//             }
//         })
//         console.log("item was deleted")
//     } catch (e) {
//         console.log(e);
//     }
// }
import axios, {AxiosError} from "axios";

export const createUser = async (email: string, password: string) => {
    try {
        await axios.post(`http://localhost:5000/auth/registration`, {
            email: email,
            password: password
        })
        return "";
    } catch (e: any) {
        const Error: AxiosError = e;
        const message = Error.response?.data as object;
        return JSON.parse(JSON.stringify(message)).message;
    }
}
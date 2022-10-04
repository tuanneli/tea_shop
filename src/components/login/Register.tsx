import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import Error from "../error/Error";
import {useEmailPasswordValidation} from "../../hooks/validationHooks";
import {createUser} from "../../api/API";
import {AxiosError} from "axios";


function BasicExample() {

    const [email, setEmail] = useState<string>("");
    const [passwordFirst, setFirstPassword] = useState<string>("");
    const [passwordSecond, setSecondPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const errorText = useEmailPasswordValidation(email, passwordFirst, passwordSecond);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (errorText) {
            return setError(errorText)
        }
        const resError = await createUser(email, passwordFirst);
        console.log(resError)
        if (resError) {
            return setError(resError)
        }
        setError("");
    }

    return (
        <Form className="p-5 bg-dark form-box text-white">
            <h4 className="box-label">Регистрация</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                              className="form-control"
                              placeholder="Введите вашу почту"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={passwordFirst} onChange={(e) => setFirstPassword(e.target.value)} type="password"
                              placeholder="Введите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Control value={passwordSecond} onChange={(e) => setSecondPassword(e.target.value)} type="password"
                              placeholder="Повторите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня"/>
                {error && <Error error={error}/>}
            </Form.Group>
            <Form.Group className="submit-or-enter">
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Зарегестрироваться
                </Button>
                или
                <Link to={'/login'} style={{color: 'white'}}>Войти</Link>
            </Form.Group>
        </Form>
    );
}

export default BasicExample;
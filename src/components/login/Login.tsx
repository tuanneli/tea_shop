import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {useContext, useState} from "react";
import {loginUser} from "../../api/API";
import {Context, IContext} from "../../index";
import {observer} from "mobx-react-lite";
import Error from "../error/Error";
import {useAuthValidation} from "../../hooks/validationHooks";
import {Link, useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

const BasicExample = observer(() => {

    const {user} = useContext(Context) as IContext;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const errorText = useAuthValidation(email, "name", password, password);
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const response = await loginUser(email, password);
        if (errorText) {
            return setError(errorText);
        }
        if (typeof response == "string") {
            return setError(response as string);
        }
        user.setIsAuth(true);
        user.setUser(jwtDecode(response.token));
        setError("");
        navigate('/home');
    };

    return (
        <Form className="p-5 bg-dark form-box text-white">
            <h4 className="box-label">Логин</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                              placeholder="Введите вашу почту"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                              placeholder="Введите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня"/>
                {error && <Error error={error}/>}
            </Form.Group>
            <Form.Group className="submit-or-enter">
                <Button variant="outline-light" type="submit" onClick={handleLogin}>
                    Войти
                </Button>
                или
                <Link to={'/register'} style={{color: 'white'}}>Зарегестрироваться</Link>
            </Form.Group>
        </Form>
    );
})

export default BasicExample;
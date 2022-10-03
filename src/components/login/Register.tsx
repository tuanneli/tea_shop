import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {Link} from "react-router-dom";

function BasicExample() {
    return (
        <Form className="p-5 bg-dark form-box text-white">
            <h4 className="box-label">Регистрация</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" placeholder="Введите вашу почту"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Повторите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня"/>
            </Form.Group>
            <Form.Group className="submit-or-enter">
                <Button variant="primary" type="submit">
                    Зарегестрироваться
                </Button>
                или
                <Link to={'/login'} style={{color: 'white'}}>Войти</Link>
            </Form.Group>
        </Form>
    );
}

export default BasicExample;
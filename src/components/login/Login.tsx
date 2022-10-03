import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';

function BasicExample() {
    return (
        <Form className="p-5 bg-dark form-box text-white">
            <h4 className="box-label">Логин</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" placeholder="Введите вашу почту"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Подтвердить
            </Button>
        </Form>
    );
}

export default BasicExample;
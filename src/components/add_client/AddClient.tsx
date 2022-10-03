import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useState} from "react";
import "../login/Login.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function BasicExample() {

    const [value, setValue] = useState<any>();

    return (
        <Form className="p-5 form-box bg-dark text-white">
            <h4 className="box-label">Добавить посетителя</h4>
            <Form.Group className="mb-3 form-item-box" controlId="formBasicEmail">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" placeholder="Введите имя нового посетителя"/>
            </Form.Group>
            <Form.Group className="mb-3 form-item-box" controlId="formBasicPassword">
                <Form.Label>Телефон</Form.Label>
                <PhoneInput
                    placeholder="+7 (777) 123 4567"
                    value={value}
                    onChange={() => setValue(value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Добавить
            </Button>
        </Form>
    );
}

export default BasicExample;
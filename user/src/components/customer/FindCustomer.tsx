import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useContext, useState} from "react";
import "../login/Login.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {CustomerService} from "../../api/API";
import CustomerStore from "../../store/CustomerStore";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

function BasicExample() {
    const [phone, setPhone] = useState<string>("");
    const {customerStore} = useContext(Context);
    const navigate = useNavigate();

    const handleClick = async (e: any) => {
        e.preventDefault();
        const customer = await customerStore.getCustomer(phone);
        console.log(customer);
        navigate('/customer')
    }


    return (
        <Form className="p-5 form-box bg-dark text-white">
            <h4 className="box-label">Найти посетителя</h4>
            <Form.Group className="mb-3 form-item-box" controlId="formBasicPassword">
                <Form.Label>Телефон</Form.Label>
                <PhoneInput
                    placeholder="+7 (777) 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(String(e))}
                />
            </Form.Group>
            <Button variant="primary"
                    onClick={handleClick}
                    type="submit">
                Найти
            </Button>
        </Form>
    );
}

export default BasicExample;
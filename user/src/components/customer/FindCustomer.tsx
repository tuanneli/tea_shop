import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useContext, useState} from "react";
import "../login/Login.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {CustomerService} from "../../api/API";
import CustomerStore from "../../store/CustomerStore";
import {Context} from "../../index";
import {Link, useNavigate} from "react-router-dom";
import {PersonAddAlt1} from "@mui/icons-material";
import Error from "../error/Error";
import {observer} from "mobx-react-lite";

function BasicExample() {
    const [phone, setPhone] = useState<string>("");
    const {customerStore} = useContext(Context);
    const navigate = useNavigate();

    const handleClick = async (e: any) => {
        e.preventDefault();
        const customer = await customerStore.getCustomer(phone);
        if (customer) {
            navigate('/customer');
        }
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
                {customerStore.errorMessage && <Error error={customerStore.errorMessage}/>}
            </Form.Group>
            <Form.Group className="submit-or-enter mt-4">
                <Button variant="outline-light"
                        onClick={handleClick}
                        type="submit">
                    Найти
                </Button>
                <div style={{color: 'gray'}}>или</div>
                <Link to={'/addclient'} style={{color: 'white'}}>Добавить</Link>
            </Form.Group>
        </Form>
    );
}

export default observer(BasicExample);
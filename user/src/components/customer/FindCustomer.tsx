import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useContext, useEffect, useState} from "react";
import "../login/Login.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {Context} from "../../index";
import {Link, useNavigate} from "react-router-dom";
import Error from "../error/Error";
import {observer} from "mobx-react-lite";
import './Customer.css';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {getTableBodyUtilityClass} from "@mui/material";

type Item = {
    id: number;
    name: string;
}

function BasicExample() {
    const [phone, setPhone] = useState<string>("+7");
    const [autoCompleteActive, setAutocompleteActive] = useState<boolean>(false);
    const {customerStore} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        customerStore.getCustomers();
    }, [])

    const handleClick = async (e: any) => {
        e.preventDefault();
        const customer = await customerStore.getCustomer(phone);
        if (customer) {
            navigate('/customer');
        }
    }

    const phoneNumbers = customerStore.customers.map((customer) => customer.phone);

    const filterPhoneNumbers = phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.includes(phone);
    });

    const handleClickOnAutocomplete = (phoneNumber: string) => {
        setPhone(phoneNumber);
        setAutocompleteActive(false);
    };

    const handleEnterOnAutocomplete = async (event: React.KeyboardEvent<HTMLElement>, phoneNumber: string) => {
        if (event.key === "Enter") {
            await setPhone(phoneNumber);
            setAutocompleteActive(false);
            const customer = await customerStore.getCustomer(phoneNumber);
            if (customer) {
                navigate('/customer');
            }
        }
    };

    const handleOnChangeInput = (e: any) => {
        setPhone(String(e));
        setAutocompleteActive(true);
    }

    return (
        <Form className="p-5 form-box bg-dark text-white">
            <h4 className="box-label">Найти посетителя</h4>
            <Form.Group className="mb-3 form-item-box" controlId="formBasicPassword">
                <Form.Label>Телефон</Form.Label>
                <PhoneInput
                    placeholder="+7 (777) 123 4567"
                    value={phone}
                    onChange={handleOnChangeInput}
                    onClick={() => setAutocompleteActive(!autoCompleteActive)}
                />
                <ListGroup className={'autocomplete'}>
                    {phone && autoCompleteActive
                        ?
                        filterPhoneNumbers.map((phoneNumber) => {
                            return <ListGroup.Item key={phoneNumber}
                                                   type={"submit"}
                                                   tabIndex={0}
                                                   onKeyDown={(event) => handleEnterOnAutocomplete(event, phoneNumber)}
                                                   onClick={() => handleClickOnAutocomplete(phoneNumber)}
                                                   className="autocomplete__item">{phoneNumber}</ListGroup.Item>
                        })
                        :
                        null}
                </ListGroup>
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
import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {Col, Row} from "react-bootstrap";
import CustomerInfo from "./CustomerInfo";
import CustomerGoods from "./CustomerGoods";
import ShoppingCart from "./ShoppingCart";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import FindCustomer from "./FindCustomer";

const CustomerPage = () => {

    const {customerStore} = useContext(Context);

    if (!customerStore.isFound) {
        return (
            <FindCustomer/>
        );
    }

    return (
        <Row>
            <Col md={3}>
                <CustomerInfo/>
            </Col>
            <Col md={3}>
                <ShoppingCart/>
            </Col>
            <Col md={6}>
                <CustomerGoods/>
            </Col>
        </Row>
    );
};

export default observer(CustomerPage);
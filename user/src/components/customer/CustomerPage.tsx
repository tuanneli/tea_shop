import React, {useContext} from 'react';
import {Context} from "../../index";
import {Col, Row} from "react-bootstrap";
import CustomerInfo from "./CustomerInfo";
import CustomerGoods from "./CustomerGoods";
import ShoppingCart from "./ShoppingCart";

const CustomerPage = () => {
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

export default CustomerPage;
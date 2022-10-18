import React from 'react';
import {Col, Row} from "react-bootstrap";
import GoodsList from "./lists/GoodsList";
import Categories from "./lists/CategoriesList";
import "./Goods.css";

const GoodsPanel = () => {
    return (
        <Row style={{margin: "0", padding: '0'}}>
            <Col md={3} style={{margin: "0", padding: '0'}}>
                <Categories/>
            </Col>
            <Col md={9} style={{margin: "0", padding: '0'}}>
                <GoodsList/>
            </Col>
        </Row>
    );
};

export default GoodsPanel;
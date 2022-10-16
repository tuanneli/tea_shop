import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import CategoriesList from "./CategoriesList";

const CustomerGoods = () => {

    const {goodsStore, shoppingCartStore} = useContext(Context);

    const getAllItems = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllItems();
    }, [])

    const addToShoppingCartHandler = (name: string, price: string) => {
        shoppingCartStore.addItemToShoppingCart(name, price);
    }

    return (
        <div className='bg-dark customer-goods-container'>
            <CategoriesList/>
            <div className='braking-line'/>
            <div className={"bg-dark customer-goods-box"}>
                {goodsStore.goods.length !== 0 && goodsStore.goods.map(item => {
                    if (item.category.name == goodsStore.categorySorted || goodsStore.categorySorted == "all") {
                        return <div key={item.name} className="bg-dark text-white item-button-box">
                            <button className="item-button button-style"
                                    disabled={!item.inStock}
                                    style={!item.inStock ? {backgroundColor: 'red'} : undefined}
                                    onClick={() => addToShoppingCartHandler(item.name, item.price)}>
                                <div className="item-button-item">{item.name}</div>
                                <div className="item-button-item">{item.price} тг.</div>
                            </button>
                        </div>
                    }
                })}
            </div>
        </div>
    );
};

export default observer(CustomerGoods);
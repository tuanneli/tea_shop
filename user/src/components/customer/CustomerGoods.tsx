import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {IShoppingCart} from "../../types/customerTypes";
import {observer} from "mobx-react-lite";
import {log} from "util";

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

    // shoppingCartStore.shoppingCart.map(item => console.log(item.name, item.amount))

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div>
                    <div className="bg-dark text-white workers-box">
                        <div className="worker-row">
                            <div className="worker-item justify-content-center">Название</div>
                            <div className="worker-item justify-content-center">Цена</div>
                            <div className="worker-item justify-content-center">Тип</div>
                            <div className="worker-item justify-content-center">В наличии</div>
                            <div className="worker-item justify-content-center">В акции</div>
                            <div style={{border: "none", width: "75px", backgroundColor: "white"}}></div>
                        </div>
                    </div>
                    {goodsStore.goods.length !== 0 && goodsStore.goods.map(item => {
                        if (item.category.name == goodsStore.categorySorted || goodsStore.categorySorted == "all") {
                            return <div key={item.name} className="bg-dark text-white workers-box">
                                <div className="worker-row">
                                    <div className="worker-item">{item.name}</div>
                                    <div className="worker-item">{item.price}</div>
                                    <div className="worker-item">{item.category.name}</div>
                                    <div className="worker-item">{item.inStock ? "Да" : "Нет"}</div>
                                    <div className="worker-item">{item.inAction ? "Да" : "Нет"}</div>
                                    <button onClick={() => addToShoppingCartHandler(item.name, item.price)}>Добавить
                                    </button>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default observer(CustomerGoods);
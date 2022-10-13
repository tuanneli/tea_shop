import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {buttonClasses} from "@mui/material";

const ShoppingCart = () => {

    const {shoppingCartStore} = useContext(Context);

    const clearHandler = () => {
        shoppingCartStore.clear();
    }

    return (
        <div>
            {shoppingCartStore.shoppingCart.map((item) =>
                <div key={item.name} className="d-flex">
                    <button onClick={() => shoppingCartStore.removeItemFromShoppingCart(item?.name)}>-</button>
                    <div className='ps-1'>{item?.name}</div>
                    <div className='ps-1'>{item?.price}</div>
                    <div className='ps-1'>{item?.amount}</div>
                    <button onClick={() => shoppingCartStore.addItemToShoppingCart(item?.name, item?.price)}>+</button>
                    <div>Стоимость: {item?.amount * Number(item?.price)} тг.</div>
                </div>
            )}
            <div>Всего: {shoppingCartStore.shoppingCart.reduce((acc, item) => {
                return acc + (item?.amount * Number(item?.price))
            }, 0)} тг.
            </div>
            <button onClick={clearHandler}>Очистить</button>
            <button>Добавить</button>
        </div>
    );
};

export default observer(ShoppingCart);
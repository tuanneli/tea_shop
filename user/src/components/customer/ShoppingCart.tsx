import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {buttonClasses} from "@mui/material";
import {CustomerService} from "../../api/API";
import {IHistory} from "../../types/customerTypes";

const ShoppingCart = () => {

    const {shoppingCartStore, customerStore} = useContext(Context);

    const clearHandler = () => {
        shoppingCartStore.clear();
    }

    const addItemToHistory = async () => {
        await customerStore.addHistory({order: shoppingCartStore.shoppingCart});
    }

    const addItemToCustomer = () => {
        customerStore.customer.statistic.total += shoppingCartStore.amountOfItemsInCart;
        shoppingCartStore.shoppingCart.map((shoppingCartItem) => {
            const isInCart = customerStore.customer.statistic.orders.find(item => item.name === shoppingCartItem.name);
            if (isInCart) {
                return customerStore.customer.statistic.orders = customerStore.customer.statistic.orders.map(item =>
                    item.name === shoppingCartItem.name ? {
                        ...item,
                        amount: item.amount + shoppingCartItem.amount
                    } : item);
            }
            customerStore.customer.statistic.orders = [...customerStore.customer.statistic.orders, {
                name: shoppingCartItem.name,
                amount: shoppingCartItem.amount
            }]
        });
        shoppingCartStore.clear();
        CustomerService.addOrders(customerStore.customer.statistic.orders, customerStore.history._id as string, customerStore.customer.statistic.total, customerStore.customer.phone)
            .then((response) => {
                customerStore.setCustomer(response.data)
            });
    }

    const addItem = async () => {
        await addItemToHistory();
        addItemToCustomer();
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
            <button onClick={addItem}>Добавить</button>
        </div>
    );
};

export default observer(ShoppingCart);
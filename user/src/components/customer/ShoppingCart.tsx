import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {CustomerService} from "../../api/API";

const ShoppingCart = () => {

    const {shoppingCartStore, customerStore, historyStore} = useContext(Context);

    const clearHandler = () => {
        shoppingCartStore.clear();
    }

    const addItemToHistory = async () => {
        await historyStore.addHistory({order: shoppingCartStore.shoppingCart}, customerStore.customer._id as string);
    }

    const addItemToCustomer = () => {
        shoppingCartStore.setAmountOfItemsInCart(shoppingCartStore.shoppingCart.reduce((acc, item) => {
            return acc + (item?.amount * Number(item?.price))
        }, 0));
        customerStore.customer.statistic.total += shoppingCartStore.totalPrice;
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
        CustomerService.addOrders(customerStore.customer.statistic.orders, historyStore.history._id as string, customerStore.customer.statistic.total, customerStore.customer.phone)
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
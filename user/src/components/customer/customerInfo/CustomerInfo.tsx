import React, {memo, useContext} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import "./CustomerInfo.css";

const CustomerInfo = () => {
    const {customerStore} = useContext(Context);

    return (
        <div className='customer-info-container bg-dark'>
            <div className='customer-general-info-box'>
                <div className='customer-each-item-box-item'>Имя: {customerStore.customer?.name}</div>
                <div className='customer-each-item-box-item'>Телефон: {customerStore.customer?.phone}</div>
                <div className='customer-each-item-box-item'>Сумма всех
                    покупок: {customerStore.customer?.statistic?.total} ₸
                </div>
            </div>
            <div className='customer-each-item-box'>
                <div>Список по товарам:</div>
                {customerStore.customer?.statistic?.orders.map((order) =>
                    <div className='customer-info-item-price' key={order?.name}>
                        <div className='customer-info-name'>{order?.name}:</div>
                        <div className='customer-info-price'>{order?.amount} шт.</div>
                    </div>
                )}
            </div>
            <div>
                История покупок:
                {customerStore.customer?.history?.slice().reverse().map((historyOrder) =>
                    <div key={historyOrder?._id}>
                        <div>Дата: {historyOrder?.date}</div>
                        <div>{historyOrder?.order?.map((item) =>
                            <div key={item.name}>
                                <div>Название товара: {item.name}</div>
                                <div>Кол-во шт: {item.amount}</div>
                                <div>Цена 1 шт: {item.price}</div>
                                <div>Всего тг: {item.amount * Number(item.price)}</div>
                            </div>
                        )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(CustomerInfo);
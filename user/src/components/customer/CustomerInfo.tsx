import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CustomerInfo = () => {
    const {customerStore} = useContext(Context);

    return (
        <div>
            <div>Имя: {customerStore.customer?.name}</div>
            <div>Телефон: {customerStore.customer?.phone}</div>
            <div>Всего заказов: {customerStore.customer?.statistic?.total}</div>
            <div>
                {customerStore.customer?.statistic?.orders.map((order) =>
                    <div key={order?.name}>
                        <div>{order?.name}</div>
                        <div>{order?.amount}</div>
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
};

export default observer(CustomerInfo);
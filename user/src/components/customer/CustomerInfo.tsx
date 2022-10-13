import React, {useContext} from 'react';
import {Context} from "../../index";

const CustomerInfo = () => {
    const {customerStore} = useContext(Context);

    return (
        <div>
            <div>Имя: {customerStore.customer?.name}</div>
            <div>Телефон: {customerStore.customer?.phone}</div>
            <div>Всего заказов: {customerStore.customer?.statistic?.total}</div>
            <div>
                {customerStore.customer?.statistic?.orders.map((order) =>
                    <div>
                        <div>{order?.name}</div>
                        <div>{order?.amount}</div>
                    </div>)}
            </div>
        </div>
    );
};

export default CustomerInfo;
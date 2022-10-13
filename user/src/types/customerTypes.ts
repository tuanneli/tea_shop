export interface ICustomer {
    name: string
    phone: string
    statistic: {
        total: number
        orders: IOrders[]
    }
}

export interface IOrders {
    name: string
    amount: number
}
export interface IItem {
    _id?: string,
    name: string,
    price: string,
    inStock?: boolean,
    inAction?: boolean,
    category: string,
}

export interface ICategory {
    _id: string
    name: string
}
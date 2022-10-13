import Item from "../module/Item.js";
import ApiError from "../../auth/error/ApiError.js";
import Category from "../module/Category.js";


class ItemService {
    async addItem(name, price, inStock, inAction, category) {
        const candidate = await Item.findOne({name});
        if (candidate) {
            throw ApiError.badRequest('Такой товар уже существует');
        }
        const categoryData = await Category.findOne({name: category});
        if (!categoryData) {
            throw ApiError.badRequest('Такой категории не существует');
        }
        return await Item.create({name, price, inStock, inAction, category});
    }

    async changeItem(_id, name, price, inStock, inAction, category) {
        const candidate = await Item.findById(_id);
        if (!candidate) {
            throw ApiError.badRequest('Такого товара не существует');
        }
        const categoryData = await Category.findOne({name: category});
        if (!categoryData) {
            throw ApiError.badRequest('Такой категории не существует');
        }
        return Item.findByIdAndUpdate(_id, {
            name: name,
            price: price,
            inStock: inStock,
            inAction: inAction,
            category: category
        });
    }

    async getItem(name) {
        const item = await Item.findOne({name: {'$regex': `^${name}$`, $options: 'i'}});
        if (!item) {
            throw ApiError.badRequest('Такого товара нет');
        }
        return item;
    }

    async getItems() {
        return Item.find();
    }

    async deleteItem(name) {
        return Item.findOneAndDelete({name});
    }

    async changeCategory(_id, name) {
        return Category.findByIdAndUpdate(_id, {name});
    }

    async deleteCategory(name) {
        return Category.findOneAndDelete({name});
    }
}

export default new ItemService();
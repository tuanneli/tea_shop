import {Schema, model} from "mongoose";

const Item = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    inStock: {type: Boolean},
    inAction: {type: Boolean},
    category: {type: String, ref: 'Category', required: true},
});

export default model('Item', Item);
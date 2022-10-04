import {model, Schema} from "mongoose";

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
});

export default model('User', User);
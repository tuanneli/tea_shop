export default class UserDto {
    id;
    email;
    name;
    activationLink;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.activationLink = model.activationLink;
    }
};
class AuthControllers {
    async registration(req: any, res: any) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async login(req: any, res: any) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async findUsers(req: any, res: any) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({value: "ADMIN"});
            // userRole.save();
            // adminRole.save();
            res.status(200).json("Works!")
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthControllers();
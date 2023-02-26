const UsersServices = require('../services/usersServices.js');

class UserControllers {

    async getUsers() {
        const users = await UsersServices.getUsers(); 
        return users;
    };

    async getUsersGender(gender) {
        const usersGender = await UsersServices.getUsersGender(gender);
        return usersGender;
    }

    async getUser(id) {
        const user = await UsersServices.getUser(id);
        return user;
    }

    async createUser(body) {
        const createdUser = await UsersServices.createUser(body); 
        return createdUser;
    };

    async edit(id, body) {
        const editUsers = await UsersServices.edit(id, body)
        return editUsers; 
    };

    async editUser(id, body) {
        const editUser = await UsersServices.editUser(id, body);
        return editUser;
    };

    async deleteUser(id) {
        const bool = await UsersServices.deleteUser(id);
        return bool;
    };

}

module.exports = new UserControllers();
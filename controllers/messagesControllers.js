const MessagesServices = require('../services/messagesServices.js');

class MessagesControllers {
    async getMessages() {
        const messages = await MessagesServices.getMessages();
        return messages;
    };

    async getByQuery(query) {
        const messagesByQuery = await MessagesServices.getByQuery(query);
        return messagesByQuery;
    };

    async createMessage(body) {
        const createdMessage = await MessagesServices.createMessage(body);
        return createdMessage;
    };

    async edit(id, body) {
        const editMessage = await MessagesServices.edit(id, body);
        return editMessage;
    };

    async editMess(id, mess) {
        const editMess = await MessagesServices.editMess(id, mess);
        return editMess;
    };

    async deleteMessages(id) {
        const bool = await MessagesServices.deleteMessages(id);
        return bool;
    }
}

module.exports = new MessagesControllers();
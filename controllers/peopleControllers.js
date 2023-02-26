const PeopleServices = require("../services/peopleServices");

class PeopleControllers {
    async getPeople() {
        const people = await PeopleServices.getPeople();
        return people;
    }

    async createPeople(body) {
        const createdPeople = await PeopleServices.createPeople(body);
        return createdPeople;
    }

    async replacePeople(id, body) {
        const replacementPeople = await PeopleServices.replacePeople(id, body);
        return replacementPeople;
    }

    async editPeople(id, body) {
        const editedPeople = await PeopleServices.editPeople(id, body);
        return editedPeople;
    }

    async deletePeople(id) {
        const bool = await PeopleServices.deletePeople(id);
        return bool;
    }
}

module.exports = new PeopleControllers();
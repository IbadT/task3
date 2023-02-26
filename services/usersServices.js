const fs = require('fs');

class UsersServices {

    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                res(JSON.parse(data));
            })
        })
    };

    getUsersGender(gender) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let usersGender = parseData.filter(i => gender === 'M' ? i.isMan : !i.isMan);
                res(usersGender);
            })
        })
    };

    getUser(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;
                
                let parseData = JSON.parse(data);
                let user = parseData.find(i => i.id == id);
                res(user);
            })
        })
    }

    createUser(body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                parseData.push(body);
                fs.writeFile('./data/usersData.json', JSON.stringify(parseData), (err) => {
                    if(err) throw err;

                    res(body);
                })
            })
        })
    };

    edit(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let updateUsers = parseData.map(i => i.id == id ? body : i);
                parseData.splice(0, parseData.length, ...updateUsers)
                fs.writeFile('./data/usersData.json', JSON.stringify(parseData), (err) => {
                    if(err) throw err;

                    res(body);
                })
            })
        })
    }

    editUser(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let updateUsers = parseData.map(i => i.id == id ? {...i, ...body} : i);
                parseData.splice(0, parseData.length, ...updateUsers)
                fs.writeFile('./data/usersData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(updateUsers[id]);
                })
            })
        })
    };

    deleteUser(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/usersData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                const index = parseData.findIndex(i => i.id == id);
                if(index === -1) {
                    res(false);
                } else {
                    parseData.splice(index, 1);
                }

                fs.writeFile('./data/usersData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(true);
                })
            })
        })
    }

}

module.exports = new UsersServices();
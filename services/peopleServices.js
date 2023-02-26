const fs = require('fs');

class PeopleServices {
    getPeople() {
        return new Promise((res, rej) => {
            fs.readFile('./data/peopleData.json', 'utf8', (err, data) => {
                if(err) throw err;

                res(JSON.parse(data));
            })
        })
    };

    createPeople(body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/peopleData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let nick = body.nickname.split('').map(i => +i ? '' : i).join('')
                body = {...body, nickname: nick}
                let key = Math.random().toString(36).slice(-8);
                parseData.push({...body, key});
                fs.writeFile('./data/peopleData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(body);
                })
            })  
        })
    }

    replacePeople(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/peopleData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let replacementData = parseData.map(i => i.id == id ? body : i);
                parseData.splice(0, parseData.length, ...replacementData);
                fs.writeFile('./data/peopleData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(body);
                })
            })
        })
    }

    editPeople(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/peopleData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let editData = parseData.map(i => i.id == id ? {...i, ...body} : i);
                parseData.splice(0, parseData.length, ...editData);
                fs.writeFile('./data/peopleData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(body);
                })
            })
        })
    }

    deletePeople(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/peopleData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                if(id == -1) {
                    res(false);
                }
                parseData.splice(id, 1);
                fs.writeFile('./data/peopleData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(true);
                })
            })
        })
    }
}

module.exports = new PeopleServices();
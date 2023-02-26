const fs = require('fs');

class MessagesServices {
    
    getMessages() {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                res(JSON.parse(data));
            })
        })

    }
    
    getByQuery(string) {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let queryMessages = parseData.filter(i => i.message.includes(string));
                res(queryMessages);
            })
        })

    }
    
    createMessage(body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data)
                parseData.push(body);
                fs.writeFile('./data/messagesData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(body);
                })
            })
        })

    }
    
    edit(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let updateMessages = parseData.map(i => i.id == id ? body : i);
                console.log(body);
                parseData.splice(0, parseData.length, ...updateMessages);
                fs.writeFile('./data/messagesData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(body);
                })
            })
        })

    }
    
    editMess(id, mess) {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let updateMess = parseData.map(i => i.id == id ? {...i, message: mess} : i);
                parseData.splice(0, parseData.length, ...updateMess);
                fs.writeFile('./data/messagesData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(parseData[id]);
                })
            })
        })

    }
    
    deleteMessages(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/messagesData.json', 'utf8', (err, data) => {
                if(err) throw err;

                let parseData = JSON.parse(data);
                let index = parseData.findIndex(i => i.id == id);
                if(index !== -1) {
                    parseData.splice(index, 1);
                } else {
                    res(false);
                }

                fs.writeFile('./data/messagesData.json', JSON.stringify(parseData), err => {
                    if(err) throw err;

                    res(true)
                })
            })
        })

    }

}

module.exports = new MessagesServices();
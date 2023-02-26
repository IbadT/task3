const express = require('express');
const PeopleControllers = require('../controllers/peopleControllers.js');
const router = express.Router();
const { check, checkSchema, validationResult } = require('express-validator');
const Sentry = require('@sentry/node');



router.get('/', async (req, res) => {
    try {
        const people = await PeopleControllers.getPeople()
        res.send(people);
    } catch (error) {
        Sentry.captureException(error);
    }
});

router.post('/createPeople', 

    checkSchema({
        nickname: {
            isEmpty: false,
            custom: {
                options: async value => {
                    let result = await PeopleControllers.getPeople()
                    let email = await result.find(i => i.nickname === value)
                        if(email) {
                            // return Promise.reject('nickname already taken')
                            throw new Error('nickname already taken')
                        }
                    return email
                } 
            }
        },
        email: {
            normalizeEmail: true,
            custom: {
                options: async value => {
                    let result = await PeopleControllers.getPeople()
                    let email = await result.find(i => i.email === value)
                        if(email) {
                            throw new Error('email already taken')
                        }
                    return email
                } 
            },
        },
        password: {
            isStrongPassword: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1
            },
            errorMessage: "Bad password",
            custom: {
                options: async password => {
                    let passForController = await PeopleControllers.getPeople();
                    let pass = await passForController.find(i => i.password === password);
                    if(pass) {
                        throw new Error('password already taken')
                    }
                }
            }
        }
    }),

    async (req, res) => {
    try {
        validationResult(req).throw();
        const createdPeople = await PeopleControllers.createPeople(req.body);
        res.send(createdPeople);
    } catch (error) {
        res.json(error)
        Sentry.captureException(error);
    }
});

router.put('/replacePeople/:id', 
    
    check('id', 'Invalid Id').isNumeric(), 
    
    async (req, res) => {
        try {
            const { id } = req.params;
            const replacementPeople = await PeopleControllers.replacePeople(id, req.body);
            res.send(replacementPeople);
        } catch (error) {
            res.json(error)
            Sentry.captureException(error);
        }
});

router.patch('/editPeople/:id', 

    check('id', 'Invalid Id').isNumeric(), 

    async (req, res) => {
        try{
            const { id } = req.params;
            const editedPeople = await PeopleControllers.editPeople(id, req.body);
            res.send(editedPeople)
        } catch (error) {
            res.json(error);
            Sentry.captureException(error);
        }
});

router.delete('/delete/:id', 

    check('id', 'Invalid Id').isNumeric(),

    async (req, res) => {
    try {
        const { id } = req.params;
        const bool = await PeopleControllers.deletePeople(id);
        res.send(bool);
    } catch (error) {
        res.json(error)
        Sentry.captureException(error);
    }
});

module.exports = router;
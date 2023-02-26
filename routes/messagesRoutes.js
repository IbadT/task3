const express = require('express');
const router = express.Router();
const MessagesControllers = require('../controllers/messagesControllers.js');
const {check, validationResult, checkSchema} = require('express-validator')
const Sentry = require('@sentry/node');



router.get('/', async (req, res) => {
    try {
        const messages = await MessagesControllers.getMessages();
        res.send(messages);
    } catch (error) {
        Sentry.captureException(error);
    }
})


router.get('/getByQuery', async (req, res) => {
    try {
        const { string } = req.query;
        const messagesByQuery = await MessagesControllers.getByQuery(string);
        res.send(messagesByQuery);
    } catch (error) {
        res.json(error)
        Sentry.captureException(error);
    }
})


router.post('/create',

    checkSchema({
        id: {
            isInt: true
        },
        message: {
            custom: {
                options: value => value !== ""
            }
        }
    }),

    async (req, res) => {
        try {
            validationResult(req).throw();
            const createMessage = await MessagesControllers.createMessage(req.body);
            res.send(createMessage);
        } catch (error) {
            res.json(error)
            Sentry.captureException(error);
        }
})


router.put('/edit/:id',

    checkSchema({
        id: {
            isInt: true
        },
        message: {
            custom: {
                options: value => value !== ""
            }
        }
    }),

    async (req, res) => {
        try {
            validationResult(req).throw();
            const { id } = req.params;
            const editMessage = await MessagesControllers.edit(id, req. body);
            res.send(editMessage);
        } catch (error) {
            res.json(error)
            Sentry.captureException(error);
        }
})

router.patch('/editMess/:id',


    check('message').custom(async (value, {req}) => {
        let { id } = req.params;
        let getMessages = await MessagesControllers.getMessages();
        if(getMessages[id].message !== value) {
            return value
        } throw new Error('This message already used')
    }),

    async (req, res) => {
        try {
            validationResult(req).throw();
            const { id } = req.params;
            const editMessage = await MessagesControllers.editMess(id, req.body.message);
            res.send(editMessage);        
        } catch (error) {
            res.json(error)
            Sentry.captureException(error);
        }
})


router.delete('/delete/:id',

    check('id', 'Invalid id').isNumeric(),

    async (req, res) => {
        try {
            validationResult(req).throw();
            const { id } = req.params;
            const bool = await MessagesControllers.deleteMessages(id);
            res.send(bool);
        } catch (error) {
            res.json(error)
            Sentry.captureException(error);
        }
})

module.exports = router;
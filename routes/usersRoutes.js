const express = require("express");
const routes = express.Router();
const UserControllers = require("../controllers/usersControllers.js");
const { body, param, checkSchema, validationResult, check, oneOf } = require('express-validator');
const Sentry = require('@sentry/node');


let usersSchema = {
  name: {
    trim: true,
    errorMessage: 'Invalid name',
    custom: {
      options: value => value !== ""
    }
  },
  age: {
    isInt: true,
    custom: {
      options: value => {
        if(value > 0 && value < 100) {
          return value
        }
      }
    }
  },
  isMan: {
    isBoolean: true,
    errorMessage: 'isMan should be a boolean'
  },
}



routes.get("/getUsers", async (req, res) => {
  try {
    const users = await UserControllers.getUsers();
    res.send(users);
  } catch (err) {
    Sentry.captureException(err);
  }
});


routes.get('/getUser/:id',

  check('id', 'Invalid Id').isNumeric(),

  async (req, res) => {
    try {
      validationResult(req).throw();
        let { id } = req.params;
        let user = await UserControllers.getUser(id);
        res.send(user);
    } catch (error) {
      res.json(error)
      Sentry.captureException(error);
    }
})


routes.get("/getGender/:gender", 

  check('gender', 'Bad gender').toUpperCase().isIn(['M', 'F']),

  async (req, res) => {
    try {
      validationResult(req).throw();
      const { gender } = req.params;
      const usersGender = await UserControllers.getUsersGender(gender);
      res.send(usersGender);
    } catch (err) {
      res.json(err)
      Sentry.captureException(err)
    }
});


routes.post("/createUser", 

  checkSchema(usersSchema),

  async (req, res) => {
    try {
      validationResult(req).throw();
      const createUser = await UserControllers.createUser(req.body);
      res.send(createUser);
    } catch (err) {
      res.json(err)
      Sentry.captureException(err);
    }
});


routes.put("/edit/:id", 

  check('id', 'Invalid Id').isNumeric(),
  checkSchema(usersSchema),
  
  async (req, res) => {

    try {
      validationResult(req).throw();
      const { id } = req.params;
      const updateUser = await UserControllers.edit(id, req.body);
      res.send(updateUser);
    } catch (err) {
      res.json(err)
      Sentry.captureException(err);
    }
});


routes.patch("/editUser/:id", 

  check('name', 'This name already used').custom(async (value, {req}) => {
    let { id } = req.params;
    let users = await UserControllers.getUsers();
    if(users[id].name !== value) {
      return value
    }
    throw new Error('This name already used')
  }),

  async (req, res) => {
    try {
      validationResult(req).throw();
      const { id } = req.params;
      const updateUsers = await UserControllers.editUser(id, req.body);
      res.send(updateUsers);
    } catch (err) {
      res.json(err)
      Sentry.captureException(err);
    }
});


routes.delete("/delete/:id",

  check("id", "Id should be number"),

  async (req, res) => {
    try {
      validationResult(req).throw();
      const { id } = req.params;
      const bool = await UserControllers.deleteUser(id);
      res.send(bool);
    } catch (err) {
      res.json(err)
      Sentry.captureException(err);
    }
});

module.exports = routes;




// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Users:
//  *       type: object
//  *       required:
//  *         - id
//  *         - name
//  *         - age
//  *         - isMan
//  *       parameters:
//  *         id:
//  *           type: integer
//  *         name:
//  *           type: string
//  *         age:
//  *           type: integer
//  *         isMan:
//  *           type: boolean
//  *       example:
//  *         id: 0
//  *         name: Pasha
//  *         age: 23
//  *         isMan: true
//  *     Mess:
//  *       type: object
//  *       required:
//  *         - id
//  *         - messages
//  *       parameters:
//  *         id:
//  *           type: integer
//  *         messages:
//  *           type: string
//  *       example:
//  *         id: 0
//  *         message: 'Example text message'
//  */


// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: API about Users
//  * /api/users/getUsers:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: Seccess
//  * /api/users/createUser:
//  *   post:
//  *     summary: Create User
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Users'
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       500:
//  *         description: Server is not allow
//  * /api/users/delete/{id}:
//  *   delete:
//  *     summary: Remove user by id
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema: 
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: true
//  *       400:
//  *         description: false
//  * /api/users/getUser/{id}:
//  *   get:
//  *     summary: Get user by id
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: id is invalid
//  * /api/users/edit/{id}:
//  *   put:
//  *     summary: Edit user by id
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Users'
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: id is not valid
//  * /api/users/getGender/{gender}:
//  *   get:
//  *     summary: Get user to gender
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: gender
//  *         schema:
//  *           type: string
//  *         required: true
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: parameters is on valid
//  * /api/users/editUser/{id}:
//  *   patch:
//  *     summary: Edit user name
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             properties:
//  *               name: 
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: Bad request
//  * /api/messages/ :
//  *   get:
//  *     summary: Get all messages
//  *     tags: [Messages]
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       500:
//  *         description: Server is don't working
//  * /api/messages/getByQuery:
//  *   get:
//  *     summary: Get message which includes query string
//  *     tags: [Messages]
//  *     parameters:
//  *       - in: query
//  *         name: string
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200: 
//  *         description: Seccess
//  *       400: 
//  *         description: Bad request --> query string is invalid
//  * /api/messages/create:
//  *   post:
//  *     summary: Create message
//  *     tags: [Messages]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             $ref: '#/components/schemas/Mess'
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *          description: Bad Request
//  * /api/messages/edit/{id}:
//  *   put:
//  *     summary: Edit message by id
//  *     tags: [Messages]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Mess'
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400: 
//  *         description: Bad Request
//  * /api/messages/editMess/{id}:
//  *   patch:
//  *     summary: Edit message by id
//  *     tags: [Messages]
//  *     parameters: 
//  *       - in: path
//  *         name: id
//  *         required: true 
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             properties:
//  *               message:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: Bad Request
//  * /api/messages/delete/{id}:
//  *   delete:
//  *     summary: Delete message by id
//  *     tags: [Messages]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Seccess
//  *       400:
//  *         description: Bad Request
// */
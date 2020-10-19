const express = require('express');
const { getUser, getUsers } = require('../controllers/users');

const userRouter = express.Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUser);
module.exports = userRouter;

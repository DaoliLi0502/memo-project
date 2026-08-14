const express = require('express');
const dbPromise = require('../../db');
const yup = require('yup');
const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = router;

const userSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().required()
});
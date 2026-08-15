const express = require('express');
const dbPromise = require('../../db');
const yup = require('yup');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

module.exports = router;
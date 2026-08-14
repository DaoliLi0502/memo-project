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

router.post('/', async (req, res) => {
    try {
        const { name, password } = await userSchema.validate(req.body);

        const db = await dbPromise;

        const existingUser = await db.get(
            'SELECT id FROM users WHERE name = ?',
            [name]
        );

        if (existingUser) {
            return res.status(409).json({
                error: 'Username already exists'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await db.run(
            'INSERT INTO users (name, password_hash) VALUES (?, ?)',
            [name, passwordHash]
        );

        return res.status(201).json({
            id: result.lastID,
            name: name
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});
const express = require('express');
const dbPromise = require('../../db');
const yup = require('yup');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const router = express.Router();

const authSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().required()
});

const sessions = new Map();

router.post('/', async (req, res) => {
    try {
        const { name, password } = await authSchema.validate(req.body);

        const db = await dbPromise;

        const user = await db.get(
            'SELECT id, password_hash FROM users WHERE name = ?',
            [name]
        );

        if (!user) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        const sessionId = crypto.randomBytes(32).toString('hex');

        sessions.set(sessionId, user.id);

        res.cookie('session', sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });

        return res.status(200).json({
            name: name
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

module.exports = router;
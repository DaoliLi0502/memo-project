const express = require('express');
const dbPromise = require('../../db');
const yup = require('yup');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

const memoSchema = yup.object({
    content: yup.string().required(),
    due_at: yup.string().matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).nullable()
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { content, due_at } = await memoSchema.validate(req.body);

        const db = await dbPromise;

        const result = await db.run(
            'INSERT INTO memos (user_id, content, due_at) VALUES (?, ?, ?)',
            [req.userId, content, due_at]
        );

        return res.status(201).json({
            id: result.lastID,
            content: content,
            due_at: due_at
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const db = await dbPromise;

        const memos = await db.all(
            'SELECT * FROM memos WHERE user_id = ?',
            [req.userId]
        );

        return res.status(200).json({
            memos: memos
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;
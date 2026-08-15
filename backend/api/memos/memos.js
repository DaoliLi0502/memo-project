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

const updateMemoSchema = yup.object({
    content: yup.string(),
    completed: yup.boolean(),
    due_at: yup.string().matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).nullable()
});

router.patch('/:mid', authMiddleware, async (req, res) => {
    try {
        const updates = await updateMemoSchema.validate(req.body);

        const fields = [];
        const values = [];

        if (updates.content !== undefined) {
            fields.push('content = ?');
            values.push(updates.content);
        }

        if (updates.completed !== undefined) {
            fields.push('completed = ?');
            values.push(updates.completed);
        }

        if (updates.due_at !== undefined) {
            fields.push('due_at = ?');
            values.push(updates.due_at);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                error: 'No fields to update'
            });
        }

        const db = await dbPromise;

        values.push(req.params.mid, req.userId);

        const result = await db.run(
            `UPDATE memos SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
            values
        );

        if (result.changes === 0) {
            return res.status(404).json({
                error: 'Memo not found'
            });
        }

        const memo = await db.get(
            'SELECT * FROM memos WHERE id = ? AND user_id = ?',
            [req.params.mid, req.userId]
        );

        return res.status(200).json({
            memo: memo
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

router.delete('/:mid', authMiddleware, async (req, res) => {
    try {
        const db = await dbPromise;

        const result = await db.run(
            'DELETE FROM memos WHERE id = ? AND user_id = ?',
            [req.params.mid, req.userId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                error: 'Memo not found'
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;
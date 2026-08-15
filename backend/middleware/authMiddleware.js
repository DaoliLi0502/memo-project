const sessions = require('../sessions');

const authMiddlemware = (req, res, next) => {
    const sessionId = req.cookies.session;
    const userId = sessions.get(sessionId);

    if (!userId) {
        return res.status(401).json({
            error: 'Authentication required'
        });
    }

    req.userId = userId;

    next();
}

module.exports = authMiddlemware;
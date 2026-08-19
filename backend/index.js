const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./api/auth/auth');
const memosRouter = require('./api/memos/memos');
const usersRouter = require('./api/users/users');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/auth', authRouter);
app.use('/memos', memosRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const express = require('express');
const authRouter = require('./api/auth/auth');
const usersRouter = require('./api/users/users');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
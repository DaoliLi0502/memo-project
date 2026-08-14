const express = require('express');
const usersRouter = require('./api/users/users');

const app = express();

app.use(express.json());
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
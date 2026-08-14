const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const dbPromise = open({
    filename: '../database/memo.db',
    driver: sqlite3.Database
});

module.exports = dbPromise;
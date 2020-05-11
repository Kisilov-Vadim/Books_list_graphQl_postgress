require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
    user: "postgres",
    password: "LittlePig1917",
    host: "127.0.0.1",
    port: 5432,
    database: "postgres"
};

const db = pgp(config);

module.exports = db;

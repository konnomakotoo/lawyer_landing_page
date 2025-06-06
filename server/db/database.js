require('dotenv').config();

module.exports = {
development: {
username: process.env.DB_USER || 'postgres',
password: process.env.DB_PASS || 'postgres',
database: process.env.DB_NAME || 'dbName',
host: process.env.DB_HOST || '127.0.0.1',
dialect: 'postgres',
},
test: {
username: process.env.DB_USER || 'postgres',
password: process.env.DB_PASS || 'postgres',
database: process.env.DB_NAME_TEST || 'dbName_test',
host: process.env.DB_HOST || '127.0.0.1',
dialect: 'postgres',
},
production: {
username: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,
host: process.env.DB_HOST,
dialect: 'postgres',
},
};

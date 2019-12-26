const mysql  = require('mysql');

const config = require('../config.js')
const logger = require('../utils/logger.js')


const db = mysql.createPool({
    connectionLimit: 3,
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password
});

db.on('connection', function (connection) {
    logger.info("Подключение к БД прошло успешно");
});

db.on('error', function(err) {
    logger.warn("Ошибка при подключении к бд", {json: err})
    process.exit(1);
})

/**
 * Асинхронный запрос к БД
 * @param {String} query  - SQL запрос
 * @param {Array}  params - Массив параметров
*/
exports.async_query = function(query, params = []) {
    return new Promise(function(resolve, reject) {
        db.query(query, params, function(err, rows) {
            if (err) {
                logger.error(query, {json: err});
                reject(err);
            }

            if (rows === undefined) resolve(undefined);
            else resolve(rows);
        });
    });
};


exports.db = db;

exports.users = require('./users.js'); // Пользователи на сайте
exports.tasks = require('./tasks.js'); // Пользователи на сайте

exports.sessionStore = require('./session-store.js');

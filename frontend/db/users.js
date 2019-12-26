const logger = require('../utils/logger.js');
const db     = require('./index.js');

/**
 * Получить пользователя по логину
 * @param login - логин
 */
exports.getByLogin = async function(login) {
    const data = await db.async_query('SELECT id, login, password FROM users WHERE login = ?', login);

    logger.debug(`[db/users] Получение информации о пользователе ${login}`);

    if (data) return JSON.parse(JSON.stringify(data))[0];
    return null;
}

/**
 * Инициализация таблицы `users`
 */
exports.init = async function() {
    const sql = "CREATE TABLE `users` (                       \
                    `id` int(11) NOT NULL AUTO_INCREMENT,     \
                    `login` varchar(20) NOT NULL,             \
                    `password` varchar(32) NOT NULL,          \
                    PRIMARY KEY (`id`,`login`),               \
                    UNIQUE KEY `login_UNIQUE` (`login`),      \
                    UNIQUE KEY `id_UNIQUE` (`id`)             \
                )"

    await db.async_query(sql);
}
const logger = require('../utils/logger.js');
const db     = require('./index.js');

/**
 * Получить пользователя по логину
 * @param login - логин
 */
exports.getByLogin = async function(login) {
    const data = await db.async_query('SELECT login, password FROM users WHERE login = ?', login);

    logger.debug(`[db/users] Получение информации о пользователе ${login}`);

    if (data) return JSON.parse(JSON.stringify(data))[0];
    return null;
}
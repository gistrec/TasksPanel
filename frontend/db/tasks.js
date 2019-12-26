const logger = require('../utils/logger.js');
const db     = require('./index.js');

/**
 * Получаем список задач пользователя
 * @param {Number} id     - идентификатор пользователя
 * @param {Number} count  - количество задач
 * @param {Number} offset - смещение
 */
exports.get = async function(user_id, count = 10, offset = 0) {
    const sql = "SELECT id, status, name, program, DATE_FORMAT(start, '%d.%m.%Y') as date, DATE_FORMAT(start, '%H:%i') as time " +
                "FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?";

    const data = await db.async_query(sql, [user_id, count, offset]);

    logger.debug(`[db/tasks] Получение списка задач у пользователя ${user_id} [count = ${count}, offset = ${offset}]`);

    if (data) return JSON.parse(JSON.stringify(data));
    return null;
}

/**
 * Инициализация таблицы `tasks`
 * @column {INT}      id      - уникальный номер задачи
 * @column {VARCHAR}  user    - создатель задачи
 * @column {VARCHAR}  name    - название задачи
 * @column {VARCHAR}  program - название программы
 * @column {DATETIME} start   - время создания задачи
 */
exports.init = async function() {
    const sql = "CREATE TABLE `tasks` (                                                                     \
                    `id` int(11) NOT NULL AUTO_INCREMENT,                                                   \
                    `user_id` int(11) NOT NULL,                                                             \
                    `status` int(1) NOT NULL COMMENT '0 - Wait, 1 - Running, 2 - Completed, 3 - Failed',    \
                    `name` varchar(60) CHARACTER SET utf8 NOT NULL,                                         \
                    `program` varchar(45) CHARACTER SET latin1 NOT NULL,                                    \
                    `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,                                    \
                    PRIMARY KEY (`id`),                                                                     \
                    UNIQUE KEY `id_UNIQUE` (`id`)                                                           \
                )"

    await db.async_query(sql);
}
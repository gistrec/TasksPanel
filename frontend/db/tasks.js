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
    const sql = "CREATE TABLE `taskspanel`.`tasks` (                            \
                    `id`      INT         NOT NULL  AUTO_INCREMENT,             \
                    `user`    VARCHAR(20) NOT NULL,                             \
                    `name`    VARCHAR(50) NOT NULL,                             \
                    `program` VARCHAR(45) NOT NULL,                             \
                    `start`   DATETIME    NOT NULL  DEFAULT CURRENT_TIMESTAMP,  \
                    PRIMARY KEY (`id`),                                         \
                    UNIQUE INDEX `id_UNIQUE` (`id` ASC)                         \
                )"

    await db.async_query(sql);
}
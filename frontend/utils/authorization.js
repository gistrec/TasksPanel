const logger  = require('../utils/logger.js');
const express = require('express');
const app     = express();

const md5 = require("md5");

const session  = require('express-session')
const passport = require('passport')
const Strategy = require('passport-local').Strategy;

const db = require('../db');

passport.use(new Strategy({
        usernameField: 'login',
        passwordField: 'passwd'
    },
    async function(login, password, done) {
        const user = await db.users.getByLogin(login);

        if (!user) {
            logger.debug(`[utils/authorization] Пользователь с логином ${login} не найден`);
            return done(null, false);
        }

        if (user.password != md5(password)) {
            logger.debug(`[utils/authorization] Пароль для пользователя с логином ${login} неверный`);
            return done(null, false);
        }
        logger.debug(`[utils/authorization] Пользователь ${login} успешно авторизован`);
        return done(null, user);
    }
));

passport.serializeUser(function(user, cb) {
    logger.debug(`[utils/authorization] Сериализация данных для пользователя ${user.login}`);
    cb(null, user.login);
});

passport.deserializeUser(async function(login, cb) {
    logger.debug(`[utils/authorization] Десериализация данных для пользователя ${login}`);
    const user = await db.users.getByLogin(login)
    cb(null, user);
});

app.use(session({
    secret: 'KJjsdz',
    store: db.sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 } // 5 дней
}))

app.use(passport.initialize());
app.use(passport.session());

module.exports = app
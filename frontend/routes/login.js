const passport = require("passport");

const express = require("express");
const router  = express.Router();

const db = require("../db");


router.get("/", function(req, res) {
    // Если юзер авторизован - перенаправляем его в панель
    if (req.isAuthenticated()) return res.redirect("/tasks");

    res.render('login')
});

router.post("/", function(req, res, next) {
    const format = /^[a-zA-Z0-9а-яА-Я]+$/;

    const login  = req.body.login.toLowerCase(); // Приводим логин к нижнему регистру
    const passwd = req.body.passwd;

    if (!format.test(login)  || login.length  < 5 || login.length  > 20 ||   // Login validation
        !format.test(passwd) || passwd.length < 6 || passwd.length > 30)     // Password validation
    {
        return res.send("Invalid credentials");
    }
    passport.authenticate("local", function(err, user, info) {
        console.log(err, user, info)
        if (err) {
            console.log(err)
            return next(err);
        }

        // Если не найден пользователь
        if (!user) return res.send("Invalid credentials")

        req.logIn(user, function(err) {
            if (err) return next(err);
            res.send("Success");
        });
    })(req, res, next);
});

module.exports = router;
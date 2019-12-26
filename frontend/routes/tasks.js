const express = require("express");
const router  = express.Router();

const db = require("../db");


router.get("/", async function(req, res) {
    // Если юзер не авторизован - перенаправляем его на страницу авторизации
    if (!req.isAuthenticated()) return res.redirect("/login");

    res.render('tasks', {
        user: req.user,
        tasks: await db.tasks.get(req.user.id)
    })
});

module.exports = router;
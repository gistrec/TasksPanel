const express = require("express");
const router  = express.Router();


router.get("/", async function(req, res) {
    // Если юзер не авторизован - перенаправляем его на страницу авторизации
    if (!req.isAuthenticated()) return res.redirect("/login");

    res.render('programs', {
        user: req.user
    })
});

module.exports = router;
const express = require('express')
const router  = express.Router()

const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')

const logger  = require('../utils/logger.js');


/** Cookie and URL query parsers */
router.use(cookieParser());
router.use(bodyParser.json());       // To support JSON-encoded bodies
router.use(bodyParser.urlencoded({   // To support URL-encoded bodies
    extended: true
}));



/** HTTP request handlers */
router.use('/login', require('./login.js'));
router.use('/tasks', require('./tasks.js'));
router.use('/create', require('./create.js'));
router.use('/profile', require('./profile.js'));
router.use('/programs', require('./programs.js'));

/** Logout request */
router.get('/logout', function(req, res) {
    logger.debug(`[routes/index] Пользователь ${req.user.login} деавторизовался`);

	req.logout();
	res.redirect('/login');
});

/** Request for an unknown page */
router.use('*', function(req, res) {
	//res.redirect('/login');
})

module.exports = router
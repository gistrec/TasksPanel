const express = require('express');
const app     = express();

const config  = require('./config.js')
const logger  = require('./utils/logger.js');


/** Enabling EJS */
app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/public'));

/** Handler for static files */
app.use(express.static('public'))

/** Authorization */
app.use(require('./utils/authorization.js'));

/** Handler for HTTP requests */
app.use(require('./routes'));

/** Listen for connections */
app.listen(config.app.port, async () => {
    logger.info(`HTTP Web Server running on port ${config.app.port}`);
});
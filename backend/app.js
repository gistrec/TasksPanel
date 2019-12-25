const kue = require('kue');

const config  = require('./config.js');


const queue = kue.createQueue({
    prefix: config.redis.prefix,
    redis: {
        port: config.redis.port,
        host: config.redis.host,
        auth: config.redis.auth
    }
});

queue.on('error', function(err) {
    console.log('Oops... ', err);
    process.exit(1);
});
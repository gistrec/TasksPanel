const config = {
    "redis": {
        "host": "ec2-54-93-95-129.eu-central-1.compute.amazonaws.com",
        "port": "6379",
        "auth": process.env.REDIS_PASSWD,
        "prefix": "taskpanel"
    }
};

module.exports = config;
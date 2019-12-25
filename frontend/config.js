const config = {
    'app': {
        'port': 80
    },
    'db': {
        'host': 'taskspanel.ccuwnieuf3ok.eu-central-1.rds.amazonaws.com',
        'port': 3306,
        'user': 'admin',
        'database': 'taskspanel',
        'password': process.env.DB_PASSWD
    },
    "redis": {
        "host": "ec2-54-93-95-129.eu-central-1.compute.amazonaws.com",
        "port": "6379",
        "auth": process.env.REDIS_PASSWD,
        "prefix": "taskpanel"
    }
};

module.exports = config;
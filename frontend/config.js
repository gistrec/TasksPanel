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
    }
};

module.exports = config;
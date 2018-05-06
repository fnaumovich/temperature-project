const CONFIG = {
    database: {
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'tinkoff'
        },

        tables: {
            precipitation: 'precipitation',
            temperature: 'temperature',
        },
    },
};

module.exports = CONFIG;

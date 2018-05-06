const mySQL = require('mysql');
const CONFIG = require('../config');

const { precipitation: precipitationTable, temperature: temperatureTable } = CONFIG.database.tables;

class Database {
    constructor() {
        this.connection = mySQL.createConnection(CONFIG.database.connection);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    getAveragePrecipitation() {
        const query = `SELECT AVG(value) from ${precipitationTable}`;

        return query;
    }
    getAverageTemperature() {
        const query = `SELECT AVG(value) from ${temperatureTable}`;

        return query;
    }
    getPrecipitationRange(start_time, end_time) {
        const query = `
            SELECT value
            FROM ${precipitationTable}
            WHERE date BETWEEN ? AND ?
        `;

        return this.query(query, [start_time, end_time]);
    }
    getTemperatureRange(start_time, end_time) {
        const query = `
            SELECT value
            FROM ${temperatureTable}
            WHERE date BETWEEN ? AND ?
        `;

        return this.query(query, [start_time, end_time]);
    }
}

module.exports = new Database();
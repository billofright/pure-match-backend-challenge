const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('challengedb', 'postgres', 'rootUser', {
    host: 'localhost',
    dialect: 'postgres'
});

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('connection success');
    } catch (error) {
        console.error('unable to connect', error);
    }
}


module.exports = { sequelize: sequelize, testDbConnection };

// const Pool = require('pg').Pool;

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: 5432,
//     password: 'rootUser',
//     database: 'challengedb'
// });

// module.exports = pool;
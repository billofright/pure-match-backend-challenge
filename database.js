const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'rootUser',
    database: 'challengedb'
});

// client.connect();

// client.query(`SELECT * FROM users`, (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     } else{
//         console.log(err.message);
//     }
//     client.end;
// });

module.exports = pool;
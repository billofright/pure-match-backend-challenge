const { check } = require('express-validator');
const db = require('../database');

const email = check('email').isEmail().withMessage('Invalid email.');

const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query(
        'SELECT * FROM users WHERE email = $1', 
        [value]
    );

    if(rows.length){
        throw new Error('Email already exists.');
    }
});

module.exports = {
    registerValidation: [email, emailExists]
};
const { check } = require('express-validator');
const { sequelize, users } = require('../models');
const email = check('email').isEmail().withMessage('Invalid email.');

const emailExists = check('email').custom(async (value) => {
    const { count, rows } = await users.findAndCountAll({
        where: {
          email: value
        }
      });

      if(count) {
        throw new Error('Email already exists.');
      }
});

module.exports = {
    registerValidation: [email, emailExists]
};
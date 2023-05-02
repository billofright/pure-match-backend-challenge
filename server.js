require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const pool = require('./database');
const { validationResult } = require('express-validator');
const { registerValidation } = require('./validators/auth');

app.use(express.json());

//ROUTES//

// create a user

app.post('/register', 
registerValidation, 
validationMiddelware,
async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users(name, email, password) VALUES(($1), ($2), ($3)) RETURNING *', 
            [name, email, hashedPassword]
        );

        res.json(newUser.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
});

function validationMiddelware(req, res, next) {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    };

    next();
}

// login and authenticate user

app.post('/login', async(req, res) => {
    const user = (await pool.query('SELECT email, password FROM users WHERE email = $1', [req.body.email])).rows;
    if(!user.length){
        return res.status(400).send('Cannot find user.');
    }

    try {
        if(await bcrypt.compare(req.body.password, user[0].password)){            
            const accessToken = jwt.sign(user[0].email, process.env.ACCESS_TOKEN_SECRET);

            res.json({ accessToken: accessToken });


        } else {
            res.send('Incorrect Password');
        }
    } catch (error) {
        res.status(500).send();
    }
})

// get all users

app.get('/users', async(req, res) => {
    try {
        const allUsers = await pool.query('SELECT id, email FROM users');
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message);
    }
})

// get a user

app.get('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        res.json(user.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

// get post
app.get('/posts', authenticateToken, async(req, res) => {
    const posts = await pool.query('SELECT id, title, description, created_at FROM posts WHERE user_id = $1', [req.user]);
    let p = posts.rows;
    p.forEach(element => {
        postTime = new Date(element.created_at);
        diff = Date.now() - postTime.getTime();

        element.created_at = calculateDifference(diff);
    });

    res.json(p)

})

function calculateDifference(diff){
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return seconds + "s ago";
    } else if (minutes < 60) {
        return minutes + "m ago";
    } else if (hours < 24) {
        return hours + "h ago";
    } else if (days < 7) {
        return days + "d ago";
    } else if (weeks < 4) {
        return weeks + "w ago";
    } else if (months < 12) {
        return months + "mo ago";
    } else {
        return years + "yr ago";
    }
}

// create post
app.post('/posts', authenticateToken, async(req, res) => {
    try {
        const post = await pool.query(
            'INSERT INTO posts(title, description, user_id, created_at) VALUES(($1), ($2), ($3), NOW()) RETURNING *', 
            [req.body.title, req.body.description, req.user]);
        const photo = await pool.query('INSERT INTO photos(url, post_id) VALUES(($1), ($2))', [req.body.url, post.rows[0].id]);
        res.json(post.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}

app.listen(8008, () => {
    console.log('server has started on port 8008');
});
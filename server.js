require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//const pool = require('./database');
const { testDbConnection } = require('./database');
const { validationResult } = require('express-validator');
const { registerValidation } = require('./validators/auth');
const { sequelize, users, posts, photos, comments } = require('./models');
const { Op } = require('sequelize');

app.use(express.json());

async function main(){
    await sequelize.sync({ alter: true });
}

//ROUTES//

// create a user

app.post('/register', 
registerValidation, 
validationMiddelware,
async(req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        let username = null;
        try {
            username = req.body.username;

        } catch (error) {}

        const newUser = await users.create({
            name: name,
            email: email,
            password: hashedPassword,
            username: username
        })

        res.json(newUser);
        
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
    const { count, rows } = await users.findAndCountAll({
        where: {
          email: req.body.email
        }
      });

    if(!count){
        return res.status(400).send('Cannot find user.');
    }

    const user = rows[0];

    try {
        if(await bcrypt.compare(req.body.password, user.password)){            
            const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET);

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
        const allUsers = await users.findAll();
        res.json(allUsers)
    } catch (error) {
        console.error(error.message);
    }
})

// get post pagination, request gives current post id and number of next posts
app.get('/posts', async(req, res) => {

    const allPosts = await posts.findAll({
        where: {
          id: {
            [Op.lte]: req.body.current_post_id
          }
        }, 
        order: [
            ['createdAt', 'DESC']
        ]
    });

    let result = [];

    for(let i=0; i < allPosts.length; i++){
        const allPhotos = await photos.findAll({
            where:{
                post_id: allPosts[i].id
            }
        });
        result[i] = { 
            id: allPosts[i].id,
            title: allPosts[i].title,
            description: allPosts[i].description 
        }

        postTime = new Date(allPosts[i].createdAt);
        diff = Date.now() - postTime.getTime();
        result[i].createdAt = calculateDifference(diff);

        result[i].photos = allPhotos;
    };  
    res.json(result);
});

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

        const post = await posts.create({
            title: req.body.title,
            description: req.body.description,
            user_email: req.user,
        })
        
        if(req.body.photos.length > 5){
            console.error('Maximum 5 photos');
        } else {
            for(let element of req.body.photos){
                const photo = await photos.create({
                    url: element.url,
                    post_id: post.id
                })
            }
        }
        res.json(post);
    } catch (error) {
        console.error(error);
    }
});

// edit post
app.post('/posts/edit', authenticateToken, async(req, res) => {

    const post = await posts.update({
        title: req.body.title,
        description: req.body.description,
    },
    {
        where: {
            id: req.body.post_id
        }, 
        returning: ['*']
    });
    
    res.json(post[1]);

});

// comment on post
app.post('/posts/comment', authenticateToken, async(req, res) => {
    const comment = await comments.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_email: req.user
    })
    
    res.json(comment);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });

}


app.listen(8008, () => {
    console.log('server has started on port 8008');
});

main();
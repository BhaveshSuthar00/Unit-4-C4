const express = require('express');

const connect = require('./conflig/db');

const userController = require('./controllers/user.controller');

const postController = require('./controllers/post.controller');

const commentController = require('./controllers/comment.controller');

const login = require('./controllers/auth.controller')

const postlikeController = require('./controllers/postlike.controller')

const app = express();

app.use(express.json());

app.use('/postlike', postlikeController);

app.use('/login', login)

app.use('/users', userController);

app.use('/posts', postController);

app.use('/comments', commentController);

app.listen(2777, async ()=> {
    try {
        await connect();
        console.log('listening on port 2777');
    } catch(err) {
        console.log('error', err.message);
    }
})
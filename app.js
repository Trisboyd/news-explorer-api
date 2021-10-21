// dependencies________________________________________________________________depedencies
const express = require('express');

const auth = require('./middleware/auth');
const { login, createUser } = require('./controllers/user');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

// PORT
const { PORT = 3000 } = process.env;

// ROUTES_________________________________________________________________________ROUTES
app.post('/signup', createUser);

app.post('/signin', login);

// Routes requiring authorization
app.use(auth);

app.use(userRouter);
app.use(articleRouter);

// Variables
const app = express();

app.listen(PORT, () => {
    console.log('App is listening at port `${PORT}`');
})
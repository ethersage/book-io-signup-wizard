const express = require('express');
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const loginRouter = require('./routes/login');

const app = express();

app.use(express.urlencoded({extended: true}));
app.listen(9000);

app.get('/', (req, res) => {
    res.json({message: 'Oh you made it!'});
});

app.use('/users', userRouter);
app.use('/books', booksRouter);
app.use('/login', loginRouter);

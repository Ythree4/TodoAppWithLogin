const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const todolistRouter = require('./routes/Todolist');
const UserRouter = require('./routes/User');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/todolist', todolistRouter);

app.use('/api/user', UserRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));


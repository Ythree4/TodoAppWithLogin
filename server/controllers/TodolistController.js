const Todolist = require('../models/TodolistModel');
const mongoose = require('mongoose');

//GET all todolist

const getAllTodolist = async (req, res) => {

    const user_id = req.user._id;

    try {
        const todolist = await Todolist.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(todolist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//GET a todolist
const getTodolist = async (req, res) => {
    try {
        const todolist = await Todolist.findById(req.params.id);
        res.status(200).json(todolist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//POST a todolist

const postTodolist = async (req, res) => {

    const { title, date, status } = req.body;

    try {
        const user_id = req.user._id;
        const todolist = await Todolist.create({ title, date, status, user_id });
        res.status(200).json(todolist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//DELETE a todolist

const deleteTodolist = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No todolist with id: ${id}`);

    }

    try {
        const todolist = await Todolist.findOneAndDelete({ _id: id });
        res.status(200).json(todolist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//PATCH a todolist

const patchTodolist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No todolist with id: ${id}`);

    }

    const todolist = await Todolist.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true });

    if (!todolist) {
        return res.status(404).send(`No todolist with id: ${id}`);
    }

    res.json(todolist);
}

//SEARCH a todolist by title
const getTodolistByTitle = async (req, res) => {
    const { title } = req.params;
    const user_id = req.user._id; // Assuming you have access to the user ID in the request object

    try {
        const todolist = await Todolist.find({ title: { $regex: title, $options: 'i' }, user_id });
        res.status(200).json(todolist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getAllTodolist,
    getTodolist,
    postTodolist,
    deleteTodolist,
    patchTodolist,
    getTodolistByTitle
}

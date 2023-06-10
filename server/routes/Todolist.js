const router = require('express').Router();
const {
    getAllTodolist,
    getTodolist,
    postTodolist,
    deleteTodolist,
    patchTodolist,
    getTodolistByTitle
} = require('../controllers/TodolistController');

const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);

//GET all todolist
router.get('/', getAllTodolist);


//GET a todolist
router.get('/:id', getTodolist);

//POST a todolist
router.post('/', postTodolist);

//DELETE a todolist
router.delete('/:id', deleteTodolist);

//PATCH a todolist
router.patch('/:id', patchTodolist);

//SEARCH a todolist by title
router.get('/search/:title', getTodolistByTitle);



module.exports = router;

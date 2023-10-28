const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllNotes);
router.post('/post', userController.createNote);
router.put('/:id', userController.updateNote);
router.delete('/:id', userController.deleteNote);

module.exports = router;

const express = require('express');
const booksController = require('../controllers/books.controller');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.get('/', booksController.findAll); 
router.get('/:id', booksController.findOne); 
router.get('/recommendations/:id', booksController.getRelated); 

router.use(authMiddleware); 


router.post('/', booksController.checkAdmin, booksController.create); 
router.put('/:id', booksController.checkAdmin, booksController.update); 
router.delete('/:id', booksController.checkAdmin, booksController.delete); 

module.exports = router;
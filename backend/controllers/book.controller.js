const BookService = require('../services/book.service');

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado. Requer role de administrador.' });
    }
};
exports.checkAdmin = checkAdmin; 

exports.create = async (req, res) => {
    try {
        const book = await BookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const book = await BookService.getBookById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const book = await BookService.updateBook(req.params.id, req.body);
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await BookService.deleteBook(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getRelated = async (req, res) => {
    try {
        const recommendations = await BookService.getRelatedRecommendations(req.params.id);
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
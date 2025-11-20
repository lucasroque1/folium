const Book = require('../models/book.model');
const { recommend } = require('../utils/recommender'); 


exports.createBook = async (bookData) => {
    const newBook = new Book(bookData);
    return await newBook.save();
};


exports.getAllBooks = async () => {
    return await Book.find({});
};


exports.getBookById = async (id) => {
    const book = await Book.findById(id);
    if (!book) {
        throw new Error('Livro não encontrado');
    }
    return book;
};


exports.updateBook = async (id, bookData) => {
    const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
    if (!updatedBook) {
        throw new Error('Livro não encontrado para atualização');
    }
    return updatedBook;
};

exports.deleteBook = async (id) => {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Livro não encontrado para remoção');
    }
    return { message: 'Livro removido com sucesso' };
};


exports.getRelatedRecommendations = async (bookId) => {
    const targetBook = await this.getBookById(bookId); 
    const allBooks = await this.getAllBooks(); 
    
    return recommend(allBooks, targetBook, 5); 
};
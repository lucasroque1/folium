const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/user.model');
const { signToken } = require('../utils/auth');

exports.registerUser = async ({ name, email, password }) => {
    if (!email || !password) {
        throw new Error('Email e senha são obrigatórios.');
    }
    const existing = await findUserByEmail(email);
    if (existing) {
        throw new Error('Email já registrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const user = await createUser({ name, email, password_hash });
    const token = signToken({ id: user.id, email: user.email });
    
    return { 
        user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
        token 
    };
};


exports.loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email e senha são obrigatórios.');
    }
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Credenciais inválidas.');
    }
    
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        throw new Error('Credenciais inválidas.');
    }
    
    const token = signToken({ id: user.id, email: user.email });
    
    return token;
};
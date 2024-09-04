// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Para comparar a senha criptografada
const mongoose = require('mongoose'); // Adicione esta linha para importar o mongoose
const router = express.Router();

// Registrar novo usuário
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login do usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Busca todos os usuários no banco de dados
        res.status(200).json(users); // Retorna a lista de usuários em formato JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para deletar um usuário
// Rota para deletar um usuário
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id); // Adiciona 'new' para instanciar o ObjectId corretamente
        const user = await User.findByIdAndDelete(userId); // Busca e deleta o usuário pelo ID

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

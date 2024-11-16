// controllers/authController.js
const User = require('../models/user'); // Ajusta la ruta según sea necesario
const bcrypt = require('bcrypt'); // Asegúrate de que esta línea esté presente
const jwt = require('jsonwebtoken'); // Asegúrate de que esta línea esté presente

const registerUser = async (req, res, next) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return next({ status: 400, message: 'Todos los campos son obligatorios.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next({ status: 400, message: 'El email ya está en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ nombre, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario creado con éxito.' });
    } catch (error) {
        next(error); // Pasa el error al middleware
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next({ status: 400, message: 'Email y contraseña son obligatorios.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next({ status: 401, message: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next({ status: 401, message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error); // Pasa el error al middleware
    }
};

module.exports = {
    registerUser,
    loginUser
};
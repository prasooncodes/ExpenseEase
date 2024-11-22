const UserSchema = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Validation
        if(!username || !email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        // Check if user exists
        const userExists = await UserSchema.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await UserSchema.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validation
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        // Check if user exists
        const user = await UserSchema.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};
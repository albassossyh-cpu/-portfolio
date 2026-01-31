const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, nationalId, phone, jobDepartment } = req.body;

        // Check if user exists (email or nationalId)
        const existingEmployee = await Employee.findOne({ $or: [{ email }, { nationalId }] });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this Email or National ID already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new employee
        const newEmployee = new Employee({
            fullName,
            email,
            password: hashedPassword,
            nationalId,
            phone,
            jobDepartment
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find employee
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, employee: { id: employee._id, fullName: employee.fullName, email: employee.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    jobDepartment: {
        type: String,
        required: true,
        enum: ['electricity', 'plumbing', 'carpentry', 'masonry', 'blacksmithing']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', EmployeeSchema);

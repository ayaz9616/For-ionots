const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: String,
    status: String,
    progress: { type: mongoose.Schema.Types.ObjectId, ref: 'Progress' } // Reference to Progress model
});

module.exports = mongoose.model('Project', projectSchema);

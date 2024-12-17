const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    progressPercentage: { type: Number, default: 0 }, // Store progress as a percentage
});

module.exports = mongoose.model('Progress', progressSchema);

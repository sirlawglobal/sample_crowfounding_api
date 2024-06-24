const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  currentAmount: { type: Number, default: 0 },
  targetAmount: { type: Number, required: true },
  daysLeft: { type: Number, required: true },
  backerCount: { type: Number, default: 0 },
  rewards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

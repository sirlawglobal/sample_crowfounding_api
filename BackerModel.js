const mongoose = require('mongoose');

const backerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pledgedAmount: { type: Number, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }
});

const Backer = mongoose.model('Backer', backerSchema);

module.exports = Backer;

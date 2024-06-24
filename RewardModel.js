const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  description: { type: String, required: true },
  minimumPledge: { type: Number, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;

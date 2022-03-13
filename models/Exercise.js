const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: new Date().setHours(0,0,0,0) },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;

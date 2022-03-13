const User = require('../models/User');
const Exercise = require('../models/Exercise');

const getExercises = async (req, res, next) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  // Prepare Filter
  const match = {};
  if (from) {
    match.date = { $gte: from };
  }
  if (to) {
    if (!match.date) {
      match.date = { $lte: to };
    } else {
      match.date.$lte = to;
    }
  }

  // Prepare Limit
  const options = {};
  if (limit) {
    options.limit = limit;
  }

  try {
    // Find User with exercises
    const userDoc = await User.findById(_id)
      .select(['-__v'])
      .populate('exercises', '-_id -__v -user', match, options)
      .exec();

    if (!userDoc) throw Error('User Not Found');

    const { username, exercises } = userDoc;
    res.json({
      _id,
      username,
      count: exercises.length,
      log: exercises.map(({ description, duration, date }) => ({
        description,
        duration,
        date: date.toDateString(),
      })),
    });
  } catch(e) {
    next(e);
  }
}

const createExercise = async (req, res, next) => {
  const { description, duration, date } = req.body;
  const { _id } = req.params;

  try {
    // Find User
    const userDoc = await User.findById(_id).exec();
    if (!userDoc) throw Error('User Not Found');

    // Save Exercise
    const exercise = new Exercise({
      user: _id,
      description,
      duration,
    });    
    if (date) {
      exercise.date = date;
    }
    const exerciseDoc = await exercise.save();

    // Update User.prototype.exercises
    await userDoc.updateOne({ $push: { exercises: exerciseDoc._id } }).exec();

    const { username } = userDoc;
    res.json({
      _id,
      username,
      description: exerciseDoc.description,
      duration: exerciseDoc.duration,
      date: exerciseDoc.date.toDateString(),
    });
  } catch(e) {
    next(e);
  }
};

module.exports = {
  getExercises,
  createExercise,
};

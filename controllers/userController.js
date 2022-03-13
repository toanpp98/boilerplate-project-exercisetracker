const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const docs = await User.find().select(['_id', 'username']).exec();
    res.json(docs);
  } catch(e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  const { username } = req.body;
  
  const user = new User({
    username: username,
  });

  try {
    const doc = await user.save();
    res.json(doc);
  } catch(e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  createUser,
};

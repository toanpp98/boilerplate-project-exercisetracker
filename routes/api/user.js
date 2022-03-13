const express = require('express');
const router = express.Router();

const { getUsers, createUser } = require('../../controllers/userController');
const { getExercises, createExercise } = require('../../controllers/exerciseController');

router.get('/', getUsers);
router.post('/', createUser);
router.post('/:_id/exercises', createExercise);
router.get('/:_id/logs', getExercises);

module.exports = router;

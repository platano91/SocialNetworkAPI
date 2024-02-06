const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
// GET all thoughts and POST a new thought
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// Routes for /api/thoughts/:thoughtId
// GET a single thought, PUT to update a thought, and DELETE a thought by ID
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route for posting new reactions to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction);

// Route for deleting a reaction by ID from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;

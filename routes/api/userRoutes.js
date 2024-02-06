const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Routes for /api/users
// GET all users and POST a new user
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// Routes for a single user by ID (/api/users/:userId)
// GET one user, PUT to update, and DELETE by user's ID
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Routes for managing friends (/api/users/:userId/friends/:friendId)
// POST to add a friend and DELETE a friend by ID
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;

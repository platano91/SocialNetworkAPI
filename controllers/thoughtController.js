const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },

  // Get a single thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(thought => !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Create a thought and associate it with a user
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      ))
      .then(user => !user
        ? res.status(404).json({ message: "No user found with this ID" })
        : res.json({ message: "Thought created and added to user" }))
      .catch(err => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thought => !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          ).then(() => res.json({ message: "Thought deleted" })))
      .catch(err => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then(thought => !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(thought => !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : res.json(thought))
      .catch(err => res.status(500).json(err));
  },
};
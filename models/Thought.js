const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

// Reaction Schema
const reactionSchema = new Schema({
  // Generate a unique ID for the reaction
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp on query
  },
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false,
});

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp on query
  },
  username: {
    type: String,
    required: true,
  },
  // Use reactionSchema for the reactions field
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

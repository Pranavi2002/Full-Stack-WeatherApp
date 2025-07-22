const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    // schema — a blueprint for documents in a MongoDB collection
  city: {
    type: String,
    required: true
  },
  // a required string field to store the name of the city searched
    userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  // store the userId

  // timestamp: {
  //   type: Date,
  //   default: Date.now
  // }
  // // an optional date field that defaults to the current time (Date.now) 
  // // when the record is created.

},
{ timestamps: true }
// Automatically adds `createdAt` and `updatedAt` for 
// organizing search history by year, month, dates
);

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
// This links the schema to the searchhistories collection in MongoDB 
// (Mongoose automatically pluralizes model names).
// This model can be now used to create, read, update, and delete search records.

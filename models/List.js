const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const List = new Schema({
  name: {
    type: String
  },
  spots: [
    {
      id: {
        type: String
      },
      name: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model("List", List);

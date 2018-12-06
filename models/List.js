import mongoose from "mongoose";

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

export default mongoose.model("List", List);

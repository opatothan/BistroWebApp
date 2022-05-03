const mongoose = require("mongoose");

// BEGIN PART 4

const PostSchema = new mongoose.Schema(
  {
    yelpID: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Array,
      default: [],
    },
    downvotes:{
      type: Array,
      default: []
    }

  },
  { timestamps: true }
);

// END PART 4

module.exports = mongoose.model("Restaurant", PostSchema);

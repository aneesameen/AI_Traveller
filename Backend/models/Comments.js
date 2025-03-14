const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
    },
    comment: {
        type: String,
        trim: true,
    },
},
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel
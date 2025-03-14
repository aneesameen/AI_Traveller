const express = require("express");
const router = express.Router();
const Comment = require("../models/Comments.js");
const Place = require("../models/Place.js");
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';


// ---------------------------------------post a comment-------------------------
router.post("/postComment", (req, res) => {
    const { token } = req.cookies;
    const { newComment, id } = req.body;

    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        try {
            const placeExists = await Place.findById(id);
            if (!placeExists) {
                return res.status(404).json({ error: "Place not found" });
            }

            const addComment = await Comment.create({
                owner: userData.id,
                place: id,
                comment: newComment
            });
            res.json(addComment);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Database error" });
        }
    });
});


// -----------------------------------get all comments of that place---------------------------

router.get("/placeComments/:placeId", async (req, res) => {
    const { placeId } = req.params;

    try {
        const placeExists = await Place.findById(placeId);
        if (!placeExists) {
            return res.status(404).json({ error: "Place not found" });
        }

        const comments = await Comment.find({ place: placeId }).populate("owner", "name email picture");

        if (comments.length === 0) {
            return res.json("No comments for this place yet.");
        }

        res.json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

// -----------------------------------Delete the comment of a user---------------------------

router.delete("/comment/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting in Review', error });
    }
})


module.exports = router;
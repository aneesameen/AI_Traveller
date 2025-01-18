const express = require("express");
const router = express.Router();
const Place = require("../models/Place.js");
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';


// ----------------------Add a new place-----------------

router.post("/places", (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuest, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuest, price
        });
        res.json(placeDoc);
    })
})


// -----------------------Get all places of one user-----------------

router.get("/user-places", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }))
    })
})


// --------------------demo--------------------

// router.get("/places/:id", async (req, res) => {
//     const { id } = req.params;
//     res.json(await Place.findById(id))
// })

// --------------------------------------Get one place of this id------------------


router.get("/places/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const place = await Place.findById(id).populate('owner', 'name email',);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.json(place);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving place information" });
    }
});



// -----------------------update the place of this id-----------------

router.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuest, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuest, price
            })
            await placeDoc.save()
            res.json("ok");
        }
    })
})


// -----------------------Delete the place of this id-----------------

router.delete('/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Place.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting place', error });
    }
});


// -----------------------Get all places for indexPage-----------------

router.get("/allplaces", async (req, res) => {
    try {
        const allPlaces = await Place.find();
        res.json(allPlaces);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all places' });
    }
})


// -----------------------search for the places-----------------

router.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const results = await Place.find({
            $or: [
                { address: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.js")
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';
const Stripe = require('stripe');
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);

// -----------------------------Booking a new place----------------------


router.post('/bookings', async (req, res) => {
    const { sessionId } = req.body;
    const { token } = req.cookies;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const { metadata } = session;

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return res.status(401).send('Unauthorized');
            }

            const { place, checkIn, checkOut, noOfGuests, name, phoneNo, totalAmount } = metadata;
            await Booking.create({
                owner: userData.id,
                place,
                checkIn,
                checkOut,
                noOfGuests,
                name,
                phoneNo,
                price: totalAmount,
            });

            res.json({ message: 'Booking saved successfully!' });
        });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Internal Server Error');
    }
});



// router.post("/bookings", (req, res) => {
//     const { token } = req.cookies;
//     const { place, checkIn, checkOut, noOfGuests, name, phoneNo, price } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         await Booking.create({
//             owner: userData.id, place, checkIn, checkOut, noOfGuests, name, phoneNo, price
//         }).then((doc) => {
//             res.json(doc)
//         }).catch((err) => {
//             res.json("err")
//         });
//     })
// });




// -----------------------------getting all booked places of a user----------------------


router.get('/bookings', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        try {
            const { id } = userData;
            const bookings = await Booking.find({ owner: id }).populate("place");
            res.json(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ error: 'Failed to fetch bookings' });
        }
    });
});


// router.get('/bookings', (req, res) => {
//     const { token } = req.cookies;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         const { id } = userData;
//         res.json(await Booking.find({ owner: id }).populate("place"))
//     })
// })


// -----------------------------Delete the booking of this id----------------------

router.delete("/booking/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting in booking', error });
    }
})


module.exports = router;

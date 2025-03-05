const express = require('express');
const Stripe = require('stripe');
const BASE_URL = require('../constants');
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { checkIn, checkOut, noOfGuests, place, totalAmount, placeName, name, phoneNo } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Booking for Place ${placeName}`,
                            description: `Stay from ${checkIn} to ${checkOut} for ${noOfGuests} guests.`,
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // success_url: `http://localhost:5173/account/bookings/success?sessionId={CHECKOUT_SESSION_ID}`,
            success_url: `${BASE_URL}/account/bookings/success?sessionId={CHECKOUT_SESSION_ID}`,
            // cancel_url: `http://localhost:5173/place/${place}`,
            cancel_url: `${BASE_URL}/place/${place}`,
            metadata: {
                place,
                checkIn,
                checkOut,
                noOfGuests,
                name,
                phoneNo,
                totalAmount,
            },
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
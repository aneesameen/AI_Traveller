const express = require("express");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking.js");
const jwtSecret = "hjwdj$jhgjvgg54e6rgvjh68";
const crypto = require("crypto");
const router = express.Router();
const sendMail = require("../mailer.js");
const { sendSMS } = require("../sms.js");

const razorpay = new Razorpay({
  key_id: "rzp_test_mWaBYCWHNbBLUr",
  key_secret: "KKXAQbsEJdMhgzMMarWzyJQt",
});

router.post("/create-order", async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "receipt#" + Math.random(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingDetails,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", "KKXAQbsEJdMhgzMMarWzyJQt")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const token = req.cookies.token;

      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });

        const booking = await Booking.create({
          owner: userData.id,
          place: bookingDetails.place,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          noOfGuests: bookingDetails.noOfGuests,
          name: bookingDetails.name,
          phoneNo: bookingDetails.phoneNo,
          price: bookingDetails.totalAmount,
          placeName: bookingDetails.placeName,
        });

        if (bookingDetails.wantEmail) {
          const emailSubject = "Booking Confirmation";
          const emailMessage = `
                <p>Dear <strong>${bookingDetails.name}</strong>,</p>
    
                <p>We’re delighted to confirm your booking at <strong>${bookingDetails.placeName}</strong>. Get ready for a relaxing and unforgettable experience with us.</p>

                <p>
                    <strong>Booking Details:</strong><br>
                    📅 <strong>Check-in:</strong> ${bookingDetails.checkIn}<br>
                    📅 <strong>Check-out:</strong> ${bookingDetails.checkOut}<br>
                    👥 <strong>Guests:</strong> ${bookingDetails.noOfGuests}<br>
                    💰 <strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}
                </p>

                <p>Our team is excited to welcome you! If you have any special requests or need assistance, feel free to reach out.</p>

                <p>✨ Wishing you a wonderful stay! ✨</p>

                <p>Best regards,</p>
                <p><strong>TRAVELLER</strong><br>
                ✉️ <a href="mailto:aneesameen00@gmail.com">aneesameen00@gmail.com</a><br>
                📞 <a href="tel:+9797788252">9797788252</a></p>
            `;

          await sendMail(userData.email, emailSubject, emailMessage);
        }

        if (bookingDetails.wantSMS) {
          const smsMessage = `Booking confirmed for ${bookingDetails.placeName}. Check-in: ${bookingDetails.checkIn}, Check-out: ${bookingDetails.checkOut}. Amount: Rs.${bookingDetails.totalAmount}. -TRAVELLER`;
          await sendSMS(bookingDetails.phoneNo, smsMessage);
        }

        res.json({ success: true, booking });
      });
    } else {
      res.status(400).json({ error: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying payment" });
  }
});

module.exports = router;

// const express = require('express');
// const Stripe = require('stripe');
// const BASE_URL = require('../constants');
// require('dotenv').config()
// const stripe = Stripe(process.env.STRIPE_KEY);
// const router = express.Router();

// router.post('/create-checkout-session', async (req, res) => {
//     const { checkIn, checkOut, noOfGuests, place, totalAmount, placeName, name, phoneNo } = req.body;

//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'inr',
//                         product_data: {
//                             name: `Booking for Place ${placeName}`,
//                             description: `Stay from ${checkIn} to ${checkOut} for ${noOfGuests} guests.`,
//                         },
//                         unit_amount: totalAmount * 100,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             // success_url: `http://localhost:5173/account/bookings/success?sessionId={CHECKOUT_SESSION_ID}`,
//             success_url: `${BASE_URL}/account/bookings/success?sessionId={CHECKOUT_SESSION_ID}`,
//             // cancel_url: `http://localhost:5173/place/${place}`,
//             cancel_url: `${BASE_URL}/place/${place}`,
//             metadata: {
//                 place,
//                 checkIn,
//                 checkOut,
//                 noOfGuests,
//                 name,
//                 phoneNo,
//                 totalAmount,
//             },
//         });

//         res.json({ url: session.url });

//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;

const express = require("express");
const cors = require('cors');
const authRoute = require("./routes/auth.js");
const uploadphoto = require("./routes/UploadByLink.js");
const newplace = require("./routes/Place.js");
const booking = require("./routes/Booking.js");
const stripe = require("./routes/Stripe.js");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
require('dotenv').config()
const path = require('path');
const axios = require('axios');
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';
const BASE_URL = require("./constants.js");


const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
    credentials: true,
    // origin: 'http://localhost:5173',
    origin: BASE_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + '/uploads'))


mongoose.connect(process.env.MONGO_URL);



// --------------------------------google auth--------------------------

app.post('/getUserInfo', async (req, res) => {
    const { accessToken } = req.body;

    try {
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
        );

        const googleUser = response.data;
        const { email, name, picture } = googleUser;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name,
                picture,
                password: null,
            });
            await user.save();
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            },
            jwtSecret,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).json({
            user: {
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
            token,
        });

    } catch (error) {
        console.error('Error fetching Google user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});




// app.post('/getUserInfo', async (req, res) => {
//     const { accessToken } = req.body;

//     try {
//         const response = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
//         );
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching Google user info', error);
//         res.status(500).json({ error: 'Failed to fetch user info' });
//     }
// });



// -----------------------------Places Photo--------------------------

const GOOGLE_PLACES_API_URL = "https://places.googleapis.com/v1/places:searchText";

app.post("/api/places", async (req, res) => {
    try {
        const { textQuery } = req.body;

        const response = await axios.post(
            GOOGLE_PLACES_API_URL,
            {
                textQuery
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
                    "X-Goog-FieldMask": "places.photos,places.displayName,places.formattedAddress,places.priceLevel,places.id",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Google Places API:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Google Places API" });
    }
});





app.use(authRoute);
app.use(uploadphoto);
app.use(newplace);
app.use(booking);
app.use(stripe);



app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`)
});

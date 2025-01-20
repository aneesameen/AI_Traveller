const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';


// --------------------register User-------------------

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        res.json(userDoc);

    } catch (e) {
        res.status(422).json(e)
    }
})


// --------------------login User-------------------


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign(
                    {
                        email: userDoc.email,
                        id: userDoc._id,
                    },
                    jwtSecret,
                    {},
                    (err, token) => {
                        if (err) throw err;
                        res
                            .cookie('token', token, {
                                httpOnly: true,
                                secure: true,
                                sameSite: 'None',
                            })
                            .json(userDoc);
                    }
                );
            } else {
                res.status(422).json("Wrong password entered");
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
});



// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const userDoc = await User.findOne({ email });
//     if (userDoc) {
//         const passOk = bcrypt.compareSync(password, userDoc.password)
//         if (passOk) {
//             jwt.sign({
//                 email: userDoc.email,
//                 id: userDoc._id,
//             },
//                 jwtSecret, {}, (err, token) => {
//                     if (err) throw err;
//                     res.cookie('token', token, {
//                         httpOnly: true,
//                         secure: true,
//                         sameSite: 'None',
//                     }).json(userDoc)
//                 });
//         } else {
//             res.status(422).json("wrong password")
//         }
//     } else {
//         res.json("not found");
//     }
// })


// --------------------profile of User-------------------
router.get("/profile", async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json(null); // No token provided, return null
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        try {
            const user = await User.findById(userData.id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const { name, email, _id } = user;
            res.json({ name, email, _id });
        } catch (dbError) {
            console.error("Database error:", dbError);
            res.status(500).json({ error: "Database error, please try again later" });
        }
    });
});


// router.get("/profile", (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//             if (err) throw err;
//             const { name, email, _id } = await User.findById(userData.id);
//             res.json({ name, email, _id })
//         });
//     } else {
//         res.json(null);
//     }
// })


// --------------------Update profile of User-------------------

router.put("/user", async (req, res) => {
    const { id, name, email, password } = req.body;

    try {
        const updatedFields = { name, email };
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
            updatedFields.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});



// --------------------logout User-------------------

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.json({ success: true, message: "Logged out successfully" });
})


module.exports = router;

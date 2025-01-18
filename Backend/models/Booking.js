const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        // required: true
    },
    checkIn: {
        type: Date,
        // required: true
    },
    checkOut: {
        type: Date,
        // required: true
    },
    noOfGuests: {
        type: Number,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    phoneNo: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    }
})

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel


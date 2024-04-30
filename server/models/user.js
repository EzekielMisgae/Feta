const mongoose = require("mongoose");
const { eventSchema } = require("./event");

const userSchema = new mongoose.Schema(
    {
        user_token: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        registeredEvents: [eventSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

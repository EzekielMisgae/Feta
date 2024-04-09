const express = require("express");
const app = express();
const User = require("../models/user");
const { Event } = require("../models/event");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const request = require("request");

const payment = async (price) => { // Accept price as a parameter
    try {
        const response = await fetch(
            "https://api.chapa.co/v1/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAPA_SECRET}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: price, // Use the passed price parameter
                    currency: "ETB",
                    email: "example@example.com",
                    first_name: "John",
                    last_name: "Doe",
                    tx_ref: "unique-transaction-reference",
                    callback_url: "https://example.com/callbackurl",
                    return_url: "https://example.com/returnurl",
                    "customization[title]": "Payment for event",
                    "customization[description]": `Pay ${price} ETB for the most awaited event, ${name}`,
                }),
            }
        );
        const data = await response.json();
        if (data.status === "success") {
            // Redirect to CHAPA checkout page
            window.location.href = data.checkout_url;
        } else {
            console.error("Payment initialization failed:", data.message);
        }
    } catch (error) {
        console.error("Error initializing payment:", error);
    }
};

module.exports = {
    payment,
};

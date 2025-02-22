const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file when visiting "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "payment.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

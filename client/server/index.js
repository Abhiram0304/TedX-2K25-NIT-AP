const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const razorpayRoutes = require("./routes/RazorpayRoutes");
const emailRoutes = require("./routes/emailRoutes");

dotenv.config();

const app = express();

// ✅ Allow requests only from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  })
);

// ✅ Parse JSON requests
app.use(bodyParser.json());

// ✅ API routes
app.use("/api/razorpay", razorpayRoutes);
app.use("/api", emailRoutes);

// ✅ Test route to confirm server is running
app.get("/", (req, res) => res.send("Server is running"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

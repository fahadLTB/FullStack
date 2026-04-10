const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

// Connect MongoDB
mongoose.connect("YOUR_MONGODB_URL")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SIGNUP
app.post("/signup", async (req, res) => {
    const { username, password, phone } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashed,
        phone
    });

    await user.save();
    res.json({ message: "User created" });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token });
});

// GET USER DATA
app.get("/profile", async (req, res) => {
    const token = req.headers["authorization"];

    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findById(decoded.id);
        res.json(user);
    } catch {
        res.status(401).json({ error: "Unauthorized" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));

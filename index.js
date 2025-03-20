const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const postRouters = require("./routes/postRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");

const app = express();

// Middleware
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const mongourl = process.env.MONGO_URL;

// Connection to MongoDB server
mongoose.connect(mongourl)
    .then(() => {
        console.log("Mongodb connected successfully");

        // Routes
        app.use("/posts", postRouters);
        app.use("/contacts", contactRoutes);

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log("Connection to MongoDB server failed");
        console.log(error);
    });

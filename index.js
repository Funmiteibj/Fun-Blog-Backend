const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const postRouters = require("./routes/postRoutes.js");

const app = express()

//middleware
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const mongourl = process.env.MONGO_URL;

//connection to mongodb server
mongoose.connect(mongourl)
                .then(() => {
                    console.log("Mongodb connected successfully");

                    //routes
                    app.use("/posts", postRouters)

                    app.listen(port, () =>{
                        console.log(`server is running on http://localhost:${port}`);
                    })
                })
                .catch((error) =>{
                    console.log("connection to mongodb server failed");
                    console.log(error);
                })
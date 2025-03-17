const express = require("express");

//import all controller function

const {createPost,fetchAllPost,getSinglePost,searchByCategory,deletePost,updatePost} = require("../controllers/postController")

// create router instance from express

const router = express.Router();

//define your endpoint router

router.post("/api/create-post", createPost);
router.get("/api/fetch-all", fetchAllPost);
router.get("/api/post/:id", getSinglePost);
router.put("/api/update-post", updatePost);
router.get("/api/search/:category", searchByCategory);
router.delete("/api/delete-post/:id", deletePost);


//export router
module.exports = router;


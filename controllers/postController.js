const Post = require("../models/Post.js");

const createPost = async (req, res) => {

    try {
        const { title, content, category, tags } = req.body;

        if (!title || !content || !category || !tags) {
            return res.status(401).json("All field are required");
        }

        const postObj = {
            title, content, category, tags
        }
        const newPost = new Post(postObj);
        const savePost = await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: savePost });
    } catch (error) {
        res.status(500).json(error.message);
    }

};

const fetchAllPost = async (req, res) => {

    try {
        const posts = await Post.find();
        res.status(200).json({ message: "All post fetched", data: posts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};



// fetch single post

const getSinglePost = async (req,res) => {
    try {
        // extract id from req.params
        const post = await Post.findById(req.params.id);
        //check if post not found
        if (!post) return res.status(404).json("sorry post not found")
            res.status(200).json({ message: "singlw post fetched successfully", data: post })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


// search post by category

const searchByCategory = async (req,res) => {
    try {
        const { category } = req.params;
        const posts = await Post.find({category: category});
        if (posts.length<1) res.status(404).json("No post found");
        res.status(200).json({ message: "Search successful", data: posts })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
    
}

//delete post controller
const deletePost = async (req,res) => {
    try {
        // extract id from req.params
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        //check if post not foundcreatePost,fetchAllPost,getSinglePost,searchByCategory,deletePost,updatePost
        if (!deletedPost) return res.status(404).json("Post not found and nothing is deleted");
            res.status(200).json("post deleted successfully");
    } catch (error) {
        res.status(500).json(error.message );
    }
}


//const update single post
const updatePost = async (req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({message: "Post updated successfully", data: updatedPost});
    } catch (error) {
        res.status(500).json({ message: "Error updating  post", error });
    }
    
}


//export all controllers functions

module.exports = {createPost,fetchAllPost,getSinglePost,searchByCategory,deletePost,updatePost}
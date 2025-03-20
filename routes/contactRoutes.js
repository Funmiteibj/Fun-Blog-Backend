// routes/contactRoutes.js
const express = require("express");
const { createContact, getAllContacts, getSingleContact, deleteContact } = require("../controllers/contactController");

const router = express.Router();

// Define contact routes
router.post("/api/contact", createContact); // Create a contact message
router.get("/api/contacts", getAllContacts); // Fetch all messages
router.get("/api/contact/:id", getSingleContact); // Fetch a single message
router.delete("/api/contact/:id", deleteContact); // Delete a message

module.exports = router;

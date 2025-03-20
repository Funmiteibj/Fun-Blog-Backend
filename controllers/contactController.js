// controllers/contactController.js
const Contact = require("../models/Contact");

// Create a contact message
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate phone number format (basic validation for numbers only)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: "Message sent successfully", contact: newContact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Fetch all contact messages
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "All contact messages retrieved", data: contacts });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Fetch a single contact message by ID
const getSingleContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }
        res.status(200).json({ message: "Contact message retrieved", data: contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Delete a contact message
const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact message not found" });
        }
        res.status(200).json({ message: "Contact message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createContact, getAllContacts, getSingleContact, deleteContact };

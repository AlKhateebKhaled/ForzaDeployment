const Contact = require("../models/contactSchema");

const createContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContactMessage = new Contact({ name, email, message });
    await newContactMessage.save();
    res.status(201).json({
      success: true,
      message: "Contact message created successfully!",
      ContactMessage: newContactMessage,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json({
      success: true,
      message: "Get all messages successfully!",
      messages: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
};

const express = require("express");
const auth = require("../middleware/authentication");
const contactRouter = express.Router();
const {
  createContactMessage,
  getContactMessages,
} = require("../controllers/contact");

contactRouter.post("/", auth, createContactMessage);

contactRouter.get("/", auth, getContactMessages);

module.exports = contactRouter;

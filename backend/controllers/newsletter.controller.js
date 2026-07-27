const Newsletter = require("../models/newsletter.model");

// POST /api/newsletter
const subscribeNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.create(req.body);

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: newsletter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/newsletter
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  subscribeNewsletter,
  getSubscribers,
};


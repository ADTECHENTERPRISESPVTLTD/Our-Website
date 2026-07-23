const Newsletter = require("../models/Newsletter");

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

module.exports = { subscribeNewsletter };
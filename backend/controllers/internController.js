const Intern = require("../models/Intern");

const createIntern = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Password Received:", req.body.password);

    const intern = await Intern.create(req.body);

    console.log("Saved Password:", intern.password);

    // Hide password before sending response
    intern.password = undefined;

    res.status(201).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getInterns = async (req, res) => {
  try {
    const interns = await Intern.find();

    // Dynamically mark interns as Offline if no heartbeat in the last 1 minute
    const updatedInterns = await Promise.all(
      interns.map(async (intern) => {
        const offlineThreshold = 60 * 1000; // 1 minute
        const timeDiff = Date.now() - new Date(intern.lastActive).getTime();

        if (intern.presenceStatus !== "Offline" && timeDiff > offlineThreshold) {
          intern.presenceStatus = "Offline";
          await intern.save();
        }
        return intern;
      })
    );

    res.status(200).json({
      success: true,
      count: updatedInterns.length,
      data: updatedInterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    res.status(200).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    Object.keys(req.body).forEach((key) => {
      intern[key] = req.body[key];
    });

    await intern.save();

    intern.password = undefined;

    res.status(200).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    await intern.deleteOne();

    res.status(200).json({
      success: true,
      message: "Intern deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePresence = async (req, res) => {
  try {
    const { presenceStatus, currentPage } = req.body;
    const intern = await Intern.findById(req.user._id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    intern.presenceStatus = presenceStatus || "Online";
    intern.currentPage = currentPage || "Unknown";
    intern.lastActive = new Date();
    await intern.save();

    res.status(200).json({
      success: true,
      message: "Presence updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
  updatePresence,
};
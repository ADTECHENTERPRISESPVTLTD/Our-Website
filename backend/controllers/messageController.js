const Message = require("../models/Message");

// POST /api/messages (Admin only)
const sendMessage = async (req, res) => {
  try {
    const { receiverId, subject, message } = req.body;

    if (!receiverId || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide receiverId, subject, and message",
      });
    }

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      subject,
      message,
      status: "Unread",
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET /api/messages (All received messages for interns, all messages for admin)
const getMessages = async (req, res) => {
  try {
    let query;

    if (req.user.role === "Admin") {
      // Admin gets all messages or filtered by receiverId
      const filter = {};
      if (req.query.receiverId) {
        filter.receiverId = req.query.receiverId;
      }
      query = Message.find(filter);
    } else {
      // Intern gets only their received messages
      query = Message.find({ receiverId: req.user._id });
    }

    query.populate({
      path: "senderId",
      select: "fullName email role",
    }).populate({
      path: "receiverId",
      select: "fullName email role department",
    });

    const messages = await query.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT /api/messages/:id/read (Mark message as read)
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    // Verify ownership: only the receiver can mark it as read
    if (message.receiverId.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to modify this message",
      });
    }

    message.status = "Read";
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsRead,
};

const jwt = require("jsonwebtoken");
const Intern = require("../models/Intern");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const intern = await Intern.findOne({ email }).select("+password");

    if (!intern) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await intern.matchPassword(password);

    console.log("Password Entered:", password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(intern._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: intern._id,
        fullName: intern.fullName,
        email: intern.email,
        role: intern.role,
        department: intern.department,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
        res.status(200).json({
        success: true,
        data: req.user,
        });
};

const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  login,
  getMe,
  logout,
};
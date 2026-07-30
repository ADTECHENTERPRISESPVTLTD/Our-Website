const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const internSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add a full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
    department: {
      type: String,
      required: [true, "Please add a department"],
    },
    college: {
      type: String,
      required: [true, "Please add a college"],
    },
    skills: {
      type: [String],
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    currentStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
internSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare entered password with hashed password
internSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Intern", internSchema);
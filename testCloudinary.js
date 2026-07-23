require("dotenv").config();

const cloudinary = require("./src/config/cloudinary");

async function test() {
  try {
    console.log("Starting upload...");

    const result = await cloudinary.uploader.upload("./test.pdf", {
      resource_type: "raw",
      folder: "adtech-resumes",
    });

    console.log("SUCCESS");
    console.log(result);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
}

test();
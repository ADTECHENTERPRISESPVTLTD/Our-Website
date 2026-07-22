const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    params: {
        folder: "adtech-resumes",
        resource_type: "auto",
        allowed_formats: ["pdf", "doc", "docx"],
    },
});

const upload = multer({
    storage: storage,
});

module.export = upload;
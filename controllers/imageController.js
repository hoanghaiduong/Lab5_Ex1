const path = require("path");
const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer
const upload = multer({ storage });

exports.uploadImage = upload.single("image");

exports.saveImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No image uploaded" });
  }
  res.json({ status: "success", path: req.file.path });
};

exports.displayImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(filePath);
};

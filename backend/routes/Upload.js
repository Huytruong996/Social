const router = require("express").Router();

const fs = require("fs");

const path = require("path");

const upLoadController = require("../controller/Post/upLoadController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), req.body.destination);
    if (!fs.existsSync(dir)) {
      console.log("test");
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    let math = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "video/MP4",
      "video/MOV",
    ];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMessage = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return cb(errorMessage, null);
    }
    return cb(null, req.body.name);
  },
});

const uploadFile = multer({ storage: storage }).single("file");

router.post("/:postId", uploadFile, upLoadController);

module.exports = router;

import express from "express";
const router = express.Router();
// import { Video } from "../models/Video";
import { auth } from "../middlewares/auth";
// import path from "path";
import multer from "multer";

//Storage multer config
let storage = multer.diskStorage({
  // file saving path
  destination: (req, file, callback) => {
    callback(null, "../uploads/");
  },
  // filename i.g. 200801_filename
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return callback(
        res.status(400).end("only jpg, png, mp4 is allowed"),
        false
      );
    }
    callback(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  // req = get a file from client-videouploadpage.js and save in the server
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // url = uploads folder
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;

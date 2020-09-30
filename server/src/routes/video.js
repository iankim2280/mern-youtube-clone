import express from "express";
const router = express.Router();
import { Video } from "../models/Video";
import { auth } from "../middlewares/auth";
// import path from "path";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";

//Storage multer config
let storage = multer.diskStorage({
  // file saving path
  destination: (req, file, callback) => {
    callback(null, "uploads/");
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

router.post("/thumbnail", (req, res) => {
  // generate a thumbnail, bring video runnig time
  let filePath = "";
  let fileDuration = "";

  // bring a video info
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  // generate a thumbnail
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // count:3 will take screen shots at 20%, 40%, 60% and 80% of the video
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

// video upload page
router.post("/uploadVideo", (req, res) => {
  // Save the ideo info
  // req = all the info from client
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// for the landing page
router.get("/getVideos", (req, res) => {
  // bring video datas from DB and res to client
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, videos });
    });
});

// video detail page
router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    // populate = bring every info from writer
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, videoDetail });
    });
});

module.exports = router;

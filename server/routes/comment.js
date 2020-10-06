// const express = require("express");
import express from "express";
const router = express.Router();
import { Comment } from "../models/Comment";

// router.post("/saveComment", (req, res) => {
//   const comment = new Comment(req.body);
//   // save in mongodb
//   comment.save((err, comment) => {
//     if (err) return res.status(400).json({ success: false, err });
//     // find user Id from mongodb
//     Comment.find({ _id: comment._id })
//       .populate("writer")
//       .exec((err, result) => {
//         if (err) return res.status(400).json({ success: false, err });
//         res.status(200).json({ success: true, result });
//       });
//   });
// });

// router.post("/getComments", (req, res) => {
//   Comment.find({ videoId: req.body.videoId })
//     //   Comment.find({ videoId: req.body.videoId })
//     .populate("writer")
//     .exec((err, comments) => {
//       if (err) return res.status(400).json({ success: false, err });
//       res.status(200).json({ success: true, comments });
//     });
// });

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});
module.exports = router;

import express from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import path from "path";
import cors from "cors";

import "./middlewares/db";
// dotenv.config();
const app = express();

// when you open the localhost on browser
app.get("/", (req, res) => res.send("hello world"));

app.get("/api/hello", (req, res) => {
  res.send("Hello from server.");
});

app.use(cors());

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/comment", require("./routes/comment"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// app.listen(process.env.PORT || 5000, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });

export default app;
// why do I use authentication? only authenticated users can use the app properly.

import express from "express";
import { Request, Response } from "express";
const propRouter = require("./routes/property.route");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const seedOfficeData = require("./db/officeSeeder");

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "https://prop-return-git-hub.vercel.app",
  })
);

app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    seedOfficeData();
  })
  .catch((err: Error) => {
    console.log("Error connecting to MongoDB: " + err);
    process.exit(1);
  });

// Setup your Express routes after seeding office data
app.use("/api/v1/properties", propRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

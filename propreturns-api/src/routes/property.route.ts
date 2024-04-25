import express from "express";
import { Request, Response } from "express";
require("dotenv").config();
const Office = require("../db/officeSchema");

const router = express.Router();

router.get("/office", (req: Request, res: Response) => {
  res.send("Welcome to the Office");
});

router.get(
  "/getAllProperties/:page/:limit",
  async (req: Request, res: Response) => {
    try {
      const pageNumber = parseInt(req.params.page); // Default to 1
      const limit = parseInt(req.params.limit); // Default to 20

      // Validate page and limit to be positive integers
      if (pageNumber <= 0 || limit <= 0 || isNaN(pageNumber) || isNaN(limit)) {
        res.status(400).send("Bad Request: Invalid page or limit");
        return;
      }

      const skip = (pageNumber - 1) * limit; // Calculate skip offset for pagination

      const properties = await Office.find({}).skip(skip).limit(limit);

      res.status(200).json(properties);
    } catch (error) {
      console.log("Failed to get all properties. Error:", error);
      res.status(500).json({ error: "Failed to get all properties" });
    }
  }
);

router.get(
  "/getPropertiesByFurnishedType",
  async (req: Request, res: Response) => {
    try {
      const furnishedType = req.body.furnishedType;
      const furnishedTypeProperties = await Office.find({
        facilities: furnishedType,
      }).exec();
      res.json(furnishedTypeProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/getBudgetProperties/:min/:max/:page?/:limit?",
  async (req: Request, res: Response) => {
    try {
      const min = parseInt(req.params.min);
      const max = parseInt(req.params.max);

      if (isNaN(min) || isNaN(max)) {
        res.status(400).send("Bad Request: Invalid min or max");
        return;
      }

      const pageNumber = parseInt(req.params.page);
      const limit = parseInt(req.params.limit);

      // Validate page and limit to be positive integers
      if (pageNumber <= 0 || limit <= 0 || isNaN(pageNumber) || isNaN(limit)) {
        res.status(400).send("Bad Request: Invalid page or limit");
        return;
      }

      const skip = (pageNumber - 1) * limit; // Calculate skip offset for pagination

      const budgetProperties = await Office.find({
        rent: { $gte: min, $lte: max },
      })
        .skip(skip)
        .limit(limit);

      // Count total properties matching the budget values
      const totalCount = await Office.countDocuments({
        rent: { $gte: min, $lte: max },
      });

      res.status(200).json({ properties: budgetProperties, totalCount });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

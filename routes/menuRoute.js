const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (
      tasteType == "sweet" ||
      tasteType == "salty" ||
      tasteType == "spicy" ||
      tasteType == "sour" ||
      tasteType == "bitter"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const menuItemID = req.params.id;
      const updatedMenuData = req.body;
  
      // Debugging logs
      console.log("MenuItem ID from URL:", menuItemID);
      console.log("Updated Menu Data:", updatedMenuData);
  
      // First find the menu item by ID
      const menuItem = await MenuItem.findById(menuItemID);
      
      // Check if the item exists
      if (!menuItem) {
        return res.status(404).json({ error: "Menu Item not found" });
      }
  
      // Debugging log to see the fetched item
      console.log("Fetched MenuItem:", menuItem);
  
      // Update the menu item manually
      const updatedMenu = await MenuItem.updateOne(
        { _id: menuItemID },
        { $set: updatedMenuData }
      );
  
      // Fetch the updated document to send in the response
      const refreshedMenu = await MenuItem.findById(menuItemID);
  
      // Respond with the updated item
      res.status(200).json(refreshedMenu);
    } catch (error) {
      console.error("Error updating Menu:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// testing purpose
module.exports = router;

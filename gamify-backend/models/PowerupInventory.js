// backend/models/PowerupInventory.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  kind: String, // e.g. 'double_points', 'skip', 'freeze'
  count: { type: Number, default: 0 }
});

const PowerupInventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [ItemSchema]
});

module.exports = mongoose.model("PowerupInventory", PowerupInventorySchema);

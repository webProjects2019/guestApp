const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
  roomName: { type: String, required: true },
  roomDescription: { type: String, required: true },
  roomPrice: { type: String, required: true },
  roomImage: { type: String, required: true },
  bedsAmount: { type: String, required: true },
  roomBedType: { type: String, required: true },
  isRoomAvailable: { type: String, required: true }
});

module.exports = mongoose.model("Room", roomSchema);

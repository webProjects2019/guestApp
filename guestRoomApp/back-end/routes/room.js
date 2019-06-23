const express = require("express");
const multer = require("multer");

const Room = require("../moduls/room");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("file");
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      //if its not null or undefine
      error = null;
    }
    callback(error, "back-end/images"); //where the server.js file is
  },
  filename: (req, file, callback) => {
    console.log("filename:", file);
    const name = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext); //constract uniqe file name
  }
});

router.post(
  "/create",
  multer({ storage: storage }).single("roomImage"),
  (req, res, next) => {
    console.log("server post ");
    const url = req.protocol + "://" + req.get("host");
    console.log(url);
    const room = new Room({
      roomName: req.body.roomName,
      roomDescription: req.body.roomDescription,
      roomPrice: req.body.roomPrice,
      roomImage: url + "/images/" + req.file.filename,
      bedsAmount: req.body.bedsAmount,
      roomBedType: req.body.roomBedType,
      isRoomAvailable: req.body.isRoomAvailable
    });
    room
      .save()
      .then(result => {
        res.status(201).json({
          message: "room added successfully",
          room: {
            id: result._id,
            roomName: result.roomName,
            roomDescription: result.roomDescription,
            roomPrice: result.roomPrice,
            roomImage: result.roomImage,
            bedsAmount: result.bedsAmount,
            roomBedType: result.roomBedType,
            isRoomAvailable: result.isRoomAvailable
          }
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  }
);
router.get("", (req, res, next) => {
  console.log("gdg")
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fatchRoom;
  const roomQuery = Room.find(); //gets all posts in the then block
  console.log(pageSize,currentPage)
  if (pageSize && currentPage) {
    console.log(req.query)
    roomQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  roomQuery
    .then(document => {
      fatchRoom = document;
      return Room.countDocuments();
    })
    .then(count => {
      console.log(count)
      res.status(200).json({
        message: "rooms fetched successfully!",
        rooms: fatchRoom,
        maxRooms: count
      });
    })

    .catch(err => {
      res.status(404).json({ error: err });
    });
});

module.exports = router;

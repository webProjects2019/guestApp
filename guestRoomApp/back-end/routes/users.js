const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bxrypt = require("bcrypt");
const User = require("../moduls/user");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      //if its not null or undefine
      error = null;
    }
    callback(error, "back-end/images"); //where the server.js file is
  },
  filename: (req, file, callback) => {
    //console.log("filename:", file);
    const name = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext); //constract uniqe file name
  }
});

router.post(
  "/signup",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log("server post ");
    const url = req.protocol + "://" + req.get("host");
    console.log(url);
    bxrypt.hash(req.body._password, 10).then(hash => {
      const user = new User({
        _userName: req.body._userName,
        _email: req.body._email,
        _password: hash,
        _phone: req.body._phone,
        imagePath: url + "/images/" + req.file.filename
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User added successfully",
            user: {
              id: result._id,
              _userName: result._email,
              _password: result._password,
              _phone: result._phone,
              imagePath: result.imagePath
            }
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
          console.log(err);
        });
    });
  }
);
router.post("/login", (req, res, next) => {
  let fatchUser;
  User.findOne({ _email: req.body.email }).then(user => {
    if (!user) return res.status(404).json({ massage: "Auth failed!" });
    fatchUser = user;
    bxrypt.compare(req.body.password, user._password).then(result => {
      console.log("result",result)
      if (!result) return res.status(404).json({ massage: "Auth failed!" });
      const token = jwt.sign({
        email: fatchUser._email,
        userId: fatchUser._id
      },"this-secret-should-be-longer",{ expiresIn: "1h" }
    );
    
      console.log(token)
     return res.status(200).json({
        token: token,
        expiresIn:3600
      });
    }).catch(err=>{
      console.log(err)
      return res.status(404).json({ massage: "Auth failed!" });
    })
  });
});
router.get("/:email", (req, res, next) => {
  User.findOne({ _email: req.params.email }).then(email => {
    const isExist = email;
    if (isExist) {
      res.status(200).json({ isExist: true });
    } else res.status(201).json({ isExist: false });
  });
});
// router.put("/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

// router.get("", (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

module.exports = router;

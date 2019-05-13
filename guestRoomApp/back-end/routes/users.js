const express = require("express");
//const multer=require("multer")

const bxrypt=require('bcrypt')
const User = require("../moduls/user");

const router = express.Router();

router.post("", (req, res, next) => {
  console.log("server post ");
 bxrypt.hash(req.body._password,10).then(hash=>{
    const user = new User({
        _userName: req.body._userName,
        _email: req.body._email,
        _password:hash,
        _phone:req.body._phone
      });
      user.save().then(result=>{
        res.status(201).json({
            message: "User added successfully",
            result: result
          });
      }).catch(err=>{
          res.status(500).json({error:err})
          console.log(err)
      })
 })

//   User.findOne({_email:req.body._email}).then(result=>{
//       if(result===null){
//         user
//         .save()
//         .then(createdUser => {
//           console.log(createdUser);
//           res.status(201).json({
//             message: "User added successfully",
//             userId: createdUser._id
//           });
//         })
//         .catch(() => {
//           res.status(404).json({ massge: "server error" });
//         });
        
//       }else{
//           console.log("user allredy exist!!")
//           res.status(404).json({massage:"user allready exist!"})
//       }
// }).catch((err)=>{
//       console.log("not found")
//   })
 
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

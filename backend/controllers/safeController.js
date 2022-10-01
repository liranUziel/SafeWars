//wrap async and then we don't have to use try catch
const asyncHandler = require("express-async-handler");
const Safe = require("../models/Safe");
const User = require("../models/User");
const Tournament = require("../models/Tournament");
const Class = require("../models/Class");

// @desc get user safe
// @route GET /safes
// @access Private

const getSafe = asyncHandler(async (req, res) => {
  //load user safe
  const safe = await Safe.find({ user: req.user.id });
  if (safe.length === 0) {
    return res.status(400).json("Upload at first a safe");
  }
  res
    .status(200)
    .json(safe)
    .sendFile(`../public/safes/${classIn.className}/${classIn.classNumber}`);
});

// @desc update user safe
// @route PUT /safe/:id
// @access Private

const updateSafe = asyncHandler(async (req, res) => {
  return res.status(609).json("Have to implement");

  const safe = await Safe.findById(req.params.id);
  if (!safe) {
    res.status(400);
    throw new Error("Safe not found");
  }

  //Check for user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the safe user
  if (safe.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedSafe = await Safe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedSafe);
});

const uploadSafe = asyncHandler(async (req, res) => {
  await Safe.create({
    user: req.user._id,
    safeName: req.file.filename,
  });
  res.status(201).json(`Added ${req.file.filename}`);
});

/*
/**************************************/
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, res, cb) => {
//     const userFolder = req.user.userName;
//     /*
//         Folder Structure
//             root '\'
//             class '\c'

//             \ - hold admin safe (safe access to all calsses by defult) Class (public)
//             \c - Tournament
//             \c\s - hold student safe for the turnament my_safe
//         */
//     const folderName =
//       path.join(__dirname).split("\\routes")[0] +
//       "\\public\\safes\\" +
//       userFolder;
//     try {
//       if (!fs.existsSync(folderName)) {
//         fs.mkdirSync(folderName);
//       }
//     } catch (err) {
//       console.error(err);
//     }

//     const loction = "./backend/public/safes/" + userFolder;
//     cb(null, loction);
//   },
//   filename: (req, file, cb) => {
//     const extantion = path.extname(file.originalname);
//     const fileName =
//       file.originalname.replace(extantion, "") + "-" + Date.now() + extantion;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: fileStorageEngine }).single("safe");
/**************************************/

// // @desc set user safe
// // @route SET /safe
// // @access Private
// // Cases:
// // Admin can upload many safe ("under his name"). Admin safes are public safe to all users.
// // Base User: can only upload one safe. Base user safe are priavte, except in class SafeWar.
// const setSafe = asyncHandler(async (req, res) => {
//   if (!req.body.safeName) {
//     res.status(400);
//     throw new Error("Plaease add safe name");
//   }
//   const userSafe = await Safe.find({ user: req.user.id });
//   if (userSafe.length !== 0 && req.user.userType !== "admin") {
//     res.status(400);
//     throw new Error(
//       "There is a safe for this user try to remove first or update"
//     );
//   }
//   const safe = await Safe.create({
//     safeName: req.body.safeName,
//     user: req.user.id,
//   });
//   res.status(201).json(safe);
// });

// @desc remove user safe
// @route DELETE /safe/:id
// @access Private

// const deleteSafe = asyncHandler(async (req, res) => {
//   const safe = await Safe.findById(req.params.id);

//   //Check for user
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   //Make sure the logged in user matches the safe user
//   if (safe.user.toString() !== user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   if (!safe) {
//     res.status(400);
//     throw new Error("Safe not found");
//   }
//   await safe.remove();
//   res.status(200).json({ id: req.params.id });
// });

module.exports = {
  getSafe,
  updateSafe,
  uploadSafe,
};

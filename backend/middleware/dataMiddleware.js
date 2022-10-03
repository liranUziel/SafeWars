const asyncHandler = require("express-async-handler");
const Class = require("../models/Class");

const addClassData = asyncHandler(async (req, res, next) => {
  const { _id: id, userType } = req.user;
  let classIn = {};
  if (userType === "student") {
    classIn = await Class.find({ studentIds: id });
  } else if (userType === "instructor") {
    classIn = await Class.find({ instructorId: id });
  }
  req.classIn = classIn;
  next();
});

module.exports = { addClassData };

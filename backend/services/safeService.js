const fs = require("fs-extra");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const classIn = req.classIn;
    classIn.forEach((currClass) => {
      const { classInfo } = currClass;
      let path = `../public/safes/${classInfo.className}/${classInfo.classNumber}`;
      console.log(path);
      fs.mkdirsSync(path);
    });
    //fs.mkdirsSync(path);
    //callback(null, path);
  },
  filename: (req, file, callback) => {
    //originalname is the uploaded file's name with extn
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
// const initStorage = () => {
//   if (!fs.existsSync(SAFES_ROOT_PATH)) {
//     fs.mkdirSync(SAFES_ROOT_PATH);
//   }
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now());
//     },
//   });

//   const upload = multer({ storage });
// };

// //const upload = multer({ storage });
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

module.exports = { upload };

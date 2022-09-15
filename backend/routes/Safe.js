const express = require('express');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req,res,cb) =>{
        const userFolder =  req.user["userName"];
        /*
        Folder Structure
            root '\'
            class '\c'

            \ - hold admin safe (safe access to all calsses by defult) Class (public)
            \c - Tournament 
            \c\s - hold student safe for the turnament my_safe
        */
        const folderName = (path.join(__dirname)).split('\\routes')[0] + '\\public\\safes\\'+ userFolder
        try {
            if (!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);
            }
          } catch (err) {
            console.error(err);
          }
        
        
        const loction = './backend/public/safes/' + userFolder;
        cb(null,loction)
    },
    filename: (req,file,cb) =>{
        const extantion = path.extname(file.originalname);
        const fileName = file.originalname.replace(extantion,"")+'-'+Date.now()+extantion;
        cb(null,fileName);
    }
});

const upload = multer({storage:fileStorageEngine}).single('safe');
// Init Upload


const {getSafe,setSafe,updateSafe,deleteSafe} = require('../controllers/safeController');
const router = express.Router();

//Auth
const {protect} = require('../middleware/authMiddleware');

//user can download public (bin) and his safe (asm or bin)
router.get('/',protect,getSafe);

//upload only his own safe (only one safe)
router.post('/',protect,setSafe);

router.post('/upload',protect,(req,res)=>{
    upload(req,res,err =>{
        console.log(err);
        /*
        if(path.extname(req.file.originalname) === '.asm'){
            console.log('the right type of file')
        }
        if(err){
            console.log(err.message);
        }else{
            console.log(req.file);
        }
        */
    });
    res.send('file uploaded');
})

//reupload only his own safe file
router.put('/:id',protect,updateSafe);

//remove only his own safe file
router.delete('/:id',protect,deleteSafe);

module.exports = router;
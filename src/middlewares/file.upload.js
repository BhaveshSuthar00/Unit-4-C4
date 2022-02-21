const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname, '../uploads_User_image'));
    },
    filename: function (req, file, cb) {
      const uniquepreSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniquepreSuffix}-${file.originalname}`);
    }
})

const upload = multer({storage});

const uploadImage = (filekey)=>{
    return function (req, res, next){
        const uploadfiles = upload.any(filekey);
        uploadfiles(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
                res.status(500).send('error in multer');
            } else if (err) {
                res.status(500).send('error during posting image');
              // An unknown error occurred when uploading.
                
            }
            // Everything went fine.
            next();
        })
    }
}

module.exports = {upload,uploadImage};

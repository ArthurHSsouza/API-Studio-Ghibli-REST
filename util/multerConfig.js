const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/')
    },
    filename:  (req, file, cb) => { 
      cb(null, Date.now()+'.jpg')
     
    }
  })
  const upload = multer({storage}).single('image')

  module.exports = upload
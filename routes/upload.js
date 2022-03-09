const multiparty = require('connect-multiparty')
const tmpimages = multiparty({uploadDir:'./images'})
const path = require('path')
const fs = require('fs')

const upload = app => {

  app.post('/upload', tmpimages, (req,res) => {
  
    var TempFile = req.files.upload
    var TempPathFile = TempFile.path
  
    const targetPathUrl = path.join(__dirname,"../public/uploads/"+TempFile.name)
    if(path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
      fs.rename(TempPathFile, targetPathUrl, err => {
        res.status(200).json({
          uploaded: true,
          url: `https://node-penulis.herokuapp.com/uploads/${TempFile.originalFilename}`
        })
        if(err) return console.log(err)
      })
    }
  })

}

module.exports = upload
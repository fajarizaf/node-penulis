const multiparty = require('connect-multiparty')
const tmpimages = multiparty({uploadDir:'./images'})
const path = require('path')
const fs = require('fs')

const upload = app => {

  app.post('/storage/upload', tmpimages, (req,res) => {
  
    var TempFile = req.files.upload
    var TempPathFile = TempFile.path
    
    res.status(200).json({
      uploaded: true,
      url: `${process.env.BASE_URL}/uploads/${TempFile.originalFilename}`
    })

  })

}

module.exports = upload
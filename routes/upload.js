
const upload = app => {

  app.post('/storage/upload', async (req,res) => {
  
    var TempFile = req.files.upload
    var TempPathFile = TempFile.path
    
    res.status(200).json({
      uploaded: true,
      url: `${process.env.BASE_URL}/uploads/${TempFile.originalFilename}`
    })

  })

}

module.exports = upload
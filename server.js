const express = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const sequelize = require('./models/').sequelize
const cors = require('cors')


app.use(express.static('public'))

app.use(cors({credentials:true, origin:[process.env.CORS_LOCAL,process.env.CORS_STAGING,process.env.CORS_PROD]}))

app.use(bodyParser.json())
app.use(cookieParser())

// public routes
require('./routes/welcome')(app)
require('./routes/posts')(app)
require('./routes/upload')(app)
require('./routes/auth')(app)

// private routes
require('./routes/backend/posts')(app)


sequelize.sync()
.then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log('Server udah running sekarang')
  })
})
.catch((e) => {
  console.log("Ada yang salah pada saat proses sync() error:"+e.message)
})

module.exports = app



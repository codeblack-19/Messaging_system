var express = require('express')
require('./db/dbConfig')
var app = express()
var authapi = require('./Routers/authApi')
var charts = require('./Routers/chartApi')
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.use('/auth/api/v1', authapi)
app.use('/users/api/v1/', charts)

app.listen(3001, function(){
    console.log('App is running 3001')
})
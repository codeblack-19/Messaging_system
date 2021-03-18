const mongoose = require('mongoose')
const {dbUrl}  = require('../appConfig.json')

 mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log('connected')
    }).catch((e) => {
        console.log(e)
    })

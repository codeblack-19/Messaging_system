const express = require('express')
const { auth0 } = require('../Auth0/_auth0_middleware')
const Users = require('../db/userModel')
const router = express()


router.post('/signUp', function (req, res){
    const {
        email, 
        password
    } = req.body

    

    auth0.createUser({
        "email": email,
        "password": password,
        "email_verified": false,
        "connection": "Username-Password-Authentication"
    }).then((doc) => {
        const User = new Users({
            Uid : doc.identities[0].user_id,
            email : doc.email,
            pic : doc.picture,
            isOnline : false,
            blockedIds : [],
            currentlyChatting : ""
        })

        User.save()
            .then((result) => {
                res.json(result)
            })
            .catch((e) => {
                res.json({
                    error: e.massage
                })
            })
    }).catch((e) => {
        res.send(e.massage)
    })
})


module.exports = router
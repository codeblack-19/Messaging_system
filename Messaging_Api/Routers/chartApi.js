const express = require('express')
const { auth0 } = require('../Auth0/_auth0_middleware')
const Message = require('../db/messageModel')
const Users = require('../db/userModel')
const router = express()

router.get('/getUser/:id', function(req, res){
    const { id } = req.params

    Users.updateOne({email: id}, 
        { $set: {"isOnline" : true}}
    ).then(() => {
        Users.find({ email: id })
            .then((doc) => {
                res.json(doc[0])
            }).catch((e) => {
                res.send('Error')
            })
    })

})

router.get('/getisOnline', function(req, res) {
    Users.find({'isOnline' : true})
        .then((doc) => {
            res.json(doc)
        }).catch((e) => {
            res.send('Error')
        })
})

router.get('/OpenChart/:uid/:oid', function(req, res){
    const {uid, oid} = req.params

    Users.updateOne({_id:uid}, 
        { $set: {"currentlyChatting": oid}}
    ).then((doc) => {
        res.send("done")
    }).catch((e) => {
        res.send('Error')
    })
})

router.post('/message', function(req, res) {
    const {
        Uid, 
        Oid, 
        message,
    } = req.body

    const Messages = new Message({
        Id : [Uid, Oid],
        Message : message,
        date : new Date().toLocaleString()
    })

    Messages.save()
        .then(() => {
            res.send('done')
        }).catch(() => {
            res.send('Error')
        })
})

router.get('/messages/:uid/:oid', function(req, res) {
    const {uid, oid} = req.params

    Message.find({
        $or: [{Id : [uid, oid]}, {Id : [oid, uid]}]
    }).then((doc) => {
            res.json(doc)
        }).catch((e) => {
            res.send('Error')
        })

})

router.get('/getUserId/:id', function (req, res) {
    const { id } = req.params

    Users.find({ _id: id })
        .then((doc) => {
            res.json(doc[0])
        }).catch((e) => {
            res.send('Error')
        })
})

router.get('/offline/:id', function(req, res){
    const { id } = req.params

    Users.updateOne({_id: id}, 
        {$set: {isOnline: false}}
        ).then(() => {
            res.send('Done')
        }).catch(() => {
            res.send('Error')
        })


})

router.post('/blockuser', function (req, res) {
    const { block, id } = req.body

    Users.updateOne({ _id: id },
        { $set: { "blockedIds": block } }
    ).then(() => {
        res.send('Done')
    }).catch(() => {
        res.send('Error')
    })


})

router.post('/unblock', function (req, res) {
    const { block, id } = req.body

    Users.updateOne({ _id: id },
        { $set: { "blockedIds": block } }
    ).then(() => {
        res.send('Done')
    }).catch(() => {
        res.send('Error')
    })


})

module.exports = router
// var MC = require('auth0').ManagementClient
const express = require('express')
const {domain, clientId, clientSecret, token} = require('../appConfig.json')
const MC = require('auth0').ManagementClient

var auth0 = new MC({
    token: token,
    clientId: clientId,
    domain: domain,
})


module.exports = {
    auth0
}
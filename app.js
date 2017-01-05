"use strict"

const path = require('path');
const router = require('express').Router();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

router.get('/red', function(req, res) {

	res.sendFile(path.join(__dirname, './public', 'index.html'))

})

router.get('/white', function(req, res) {

	res.sendFile(path.join(__dirname, './public', 'index.html'))

})

var opts = {
	production: true,
	static: path.join(__dirname, './public'),
	authentication: [
		{ hostname: appEnv.url, key: 'dogfight' }
	],
	router: router
}

const sns = require('simple-notification-service')(opts);
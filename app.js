"use strict"

const path = require('path');
const router = require('express').Router();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();


const game = function(req, res) {
	res.sendFile(path.join(__dirname, './public', 'game.html'))
};

router.get('/:gameid/white', game);
router.get('/:gameid/red', game);


const opts = {
	production: true,
	static: path.join(__dirname, './public'),
	authentication: [
		{ hostname: appEnv.url, key: 'dogfight' }
	],
	router: router
};

const sns = require('simple-notification-service')(opts);
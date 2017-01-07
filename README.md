# Dogfight

In 1983 I had a BBC Micro computer. One of my favourite games was [Dogfight](http://www.retrogames.co.uk/027297/Other-Formats/Dogfight-by-Opus-Software).

I decided to recreate it in JavaScript using the <a target="_new" class="front" href="https://www.npmjs.com/package/simple-notification-service">Simple Notification Service</a> 
to handle the transfer of data between the two participants.

## Screenshots

Original:

![BBC version](https://raw.githubusercontent.com/glynnbird/dogfight/master/public/img/original.gif)
        
This version:

![This version](https://raw.githubusercontent.com/glynnbird/dogfight/master/public/img/screenshot.png)

Homepage:

![Homepage](https://raw.githubusercontent.com/glynnbird/dogfight/master/public/img/homepage.png)

## Installation

To run locally you'll need [RethinkDB](https://www.rethinkdb.com/) running on your machine. Simply clone this repository and run `npm install` 
once to install the dependencies

```sh
npm install
```

then `npm start` to run the games

```sh
npm start
```

or you can play this game online at [dogfight.mybluemix.net](https://dogfight.mybluemix.net/).

## Controls

- left cursor - nose down
- right cursor - nose up
- space - fire
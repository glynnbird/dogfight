# Dogfight

This is a demonstration of real-time notifcations between web apps. It uses the [Simple Notification Service](https://www.npmjs.com/package/simple-notification-service") to provide the real-time connection between the client and server processes, which in turn use [RethinkDB on Compose](https://www.compose.com/rethinkdb) to store and publish the data.

You can use the *Simple Notification Service* to push data to your web applications to ensure that your web application surfaces the latest, freshest data as it arrives. e.g. web chat or pushing sports scores to a web front end as they arrive.

--------------------------------------

In 1983 I had a BBC Micro computer. One of my favourite games was [Dogfight](http://www.retrogames.co.uk/027297/Other-Formats/Dogfight-by-Opus-Software).

I decided to recreate it in JavaScript using the <a target="_new" class="front" href="https://www.npmjs.com/package/simple-notification-service">Simple Notification Service</a> to handle the transfer of data between the two participants. The SNS allows client-side web applications to send or receive real-time notifications. 

It uses RethinkDB as a back-end database and web sockets to deliver data between the server and the browser.


## Screenshots

Original:

![BBC version](https://raw.githubusercontent.com/ibm-cds-labs/dogfight/master/public/img/original.gif)
        
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

## License

This is an open-source project published under the Apache-2.0 license. Feel free to build upon, reference or contribute to this project.

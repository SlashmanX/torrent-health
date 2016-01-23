var health = require('./index.js');
var Q = require('q');
var magnet = 'magnet:?xt=urn:btih:b0bdbece174ec349403daad2b46e86f47dbe3c80&dn=Mount+%26+Blade%3A+With+Fire+and+Sword+Gold+Edition+%5BRUS%7C1C%5D+TRiViUM&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
var Tracker = require('node-tracker');
health(magnet)
.then(function(health) {
	console.log('DONE!');
	console.log(health);
})
.catch(function (err) {
    console.error(err)
})


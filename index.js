var Q = require('q');
var readtorrent = require('read-torrent');
var async = require('async');
var request = require('request');
var dgram = require('dgram');
var URI = require('URIjs');
var nbo = require('network-byte-order');
var pack = require('jspack').jspack;

module.exports = function getTorrentHealth(torrent) {
	var defer = Q.defer();
	var health = {};

	readtorrent(torrent, function(err, torrentInfo) {
		if(err) {
			defer.reject(err);
		}

		else {
			health = torrentInfo;
			health.peers = 0;

			async.each(
				torrentInfo.announce,
				function(tr, cb) {
					var client = dgram.createSocket('udp4');
					var uri = new URI(tr);
					var msg = new Buffer(16);
					msg = pack.PackTo('!q', msg, 0, '0x41727101980');
					msg = pack.PackTo('!i', msg, 8, '0x0');
					msg = pack.PackTo('!i', msg, 12, '0x4');
					var host = uri.hostname();
					var port = uri.port();
					console.log(host + ':' + port);

					client.send(msg, 0, msg.length, port, host, function(err, bytes) {
						console.log(err);
						console.log(bytes);
					});

					client.on('message', function(msg, rinfo) {
						console.log(msg.toString('utf-8'));
						console.log(rinfo);
						client.close();

						cb();
					});
				},
				function(err) {
					defer.resolve(health);
				}
			)
		}
	});

	return defer.promise;
}
var Q = require('q');
var readtorrent = require('read-torrent');
var async = require('async');
var Tracker = require('node-tracker');

module.exports = function (torrent) {
	var defer = Q.defer();
	var results = [];
	var health = {};

	readtorrent(torrent, function(err, torrentInfo) {
		if(err) {
			defer.reject(err);
		}

		else {
			var tracker;

			async.eachSeries(
				torrentInfo.announce,
				function(tr, cb) {
					if(tr == 'udp://open.demonii.com:80') {
						return cb(); // demonii is causing the module to time out and take ages
					}
					tracker = new Tracker(tr+'/announce');
					setTimeout(function() {
						tracker.scrape([torrentInfo.infoHash], function(err, msg) {
							if(err) return cb();
							if(msg[torrentInfo.infoHash]) {
								results.push({
									seeds: msg[torrentInfo.infoHash].seeders, 
									peers: msg[torrentInfo.infoHash].leechers
								});
							}
							tracker.close();
							cb();
						})
					}, 1000)
				},
				function(err) {
					var totalSeeds = 0;
					var totalPeers = 0;
					for(var r in results) {
						totalSeeds += results[r].seeds;
						totalPeers += results[r].peers;
					}
					health.seeds = Math.round(totalSeeds/results.length);
					health.peers = Math.round(totalPeers/results.length);
					defer.resolve(health);
				}
			)
		}
	});

	return defer.promise;
}
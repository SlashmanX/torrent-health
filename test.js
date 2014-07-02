var health = require('./index.js');
var Q = require('q');
var magnet = 'magnet:?xt=urn:btih:5W5KGVINEZWUHQKTWWTFFGVNVQPDNKGF&dn=24.S09E10.720p.HDTV.X264-DIMENSION&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80';

health(magnet)
.then(function(health) {
	console.log(health);
})
.catch(function (err) {
    console.log(err)
})

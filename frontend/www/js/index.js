var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');


		var debug = document.getElementById('debug');
		var poop = new CameraStream();
		poop.start();
		poop.getData(function() {
			debug.innerHTML = JSON.stringify(arguments, null, 2);
		}, function() {
			debug.innerHTML = JSON.stringify(arguments, null, 2);
		});

		// function pollLocation(cb) {
		// 	return navigator.geolocation.watchPosition(function success(pos) {
		// 		cb(null, pos);
		// 	}, function error(e) {
		// 		cb(e);
		// 	}, {
		// 		maximumAge: 500,
		// 		timeout: 3000,
		// 		enableHighAccuracy: true
		// 	});
		// }

		var numHits = 0;
		// pollLocation(function(err, pos) {
		// 	var debug = document.getElementById('debug');
		// 	var debugerr = document.getElementById('err');

		// 	if (err) {
		// 		debugerr.innerHTML = [
		// 			'     code: ' + err.code,
		// 			'  message: ' + err.message,
		// 			'timestamp: ' + (+new Date)
		// 		].join('\n');

		// 		console.log('error ' + err.code + ': ' + err.message);
		// 		return;
		// 	}

		// 	debug.innerHTML = [
		// 		'  numHits: ' + (numHits++),
		// 		' latitude: ' + pos.coords.latitude,
		// 		'longitude: ' + pos.coords.longitude,
		// 		' altitude: ' + pos.coords.altitude,
		// 		' accuracy: ' + pos.coords.accuracy,
		// 		'   altAcc: ' + pos.coords.altitudeAccuracy,
		// 		'  heading: ' + pos.coords.heading,
		// 		'    speed: ' + pos.coords.speed,
		// 		'timestamp: ' + (+pos.timestamp),
		// 	].join('\n');
		// 	debugerr.innerHTML = '';

		// 	var out = [
		// 		pos.coords.latitude,
		// 		pos.coords.longitude,
		// 		pos.coords.altitude,
		// 		pos.coords.accuracy,
		// 		pos.coords.altitudeAccuracy,
		// 		pos.coords.heading,
		// 		pos.coords.speed,
		// 		pos.timestamp,
		// 	].join(' ');

		// 	console.log(out);

		// });


		// navigator.accelerometer.watchAcceleration(function(acceleration) {
		// 	var debug = document.getElementById('debug');

		// 	debug.innerHTML = [
		//               '  numHits: ' + (numHits++),
		// 		'        x: ' + acceleration.x,
		// 		'        y: ' + acceleration.y,
		// 		'        z: ' + acceleration.z,
		// 		'timestamp: ' + acceleration.timestamp,
		// 	].join('\n');


		// }, function(err) {
		//           console.log(err);
		// }, {
		//           frequency: 100
		//       });

		// navigator.compass.watchHeading(function(heading) {
		// 	var debug = document.getElementById('debug');

		// 	debug.innerHTML = [
		// 		'        numHits: ' + (numHits++),
		// 		'magneticHeading: ' + heading.magneticHeading,
		// 		'    trueHeading: ' + heading.trueHeading,
		// 		'headingAccuracy: ' + heading.headingAccuracy,
		// 		'      timestamp: ' + heading.timestamp,
		// 	].join('\n');

		// }, function(err) {

		// }, {
		// 	filter: 0, // minimum change needed
		// 	frequency: 100,
		// });


	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		// var parentElement = document.getElementById(id);
		// var listeningElement = parentElement.querySelector('.listening');
		// var receivedElement = parentElement.querySelector('.received');

		// listeningElement.setAttribute('style', 'display:none;');
		// receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};
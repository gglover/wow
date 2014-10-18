window.position = (function() {
	var _position = {
		location: {},
		heading: {},
		acceleration: {},
	};

	var id_watchPosition,
		id_watchHeading,
		id_watchAcceleration;

	function pollingInit() {
		// id_watchPosition = navigator.geolocation.watchPosition(function success(pos) {
		// 	_position.location.latitude = pos.coords.latitude;
		// 	_position.location.longitude = pos.coords.longitude;
		// 	_position.location.altitude = pos.coords.altitude;
		// 	_position.location.accuracy = pos.coords.accuracy;
		// 	_position.location.altitudeAccuracy = pos.coords.altitudeAccuracy;
		// 	_position.location.heading = pos.coords.heading;
		// 	_position.location.speed = pos.coords.speed;
		// 	_position.location.timestamp = pos.timestamp;
		// }, function error(e) {
		// 	console.error(e);
		// }, {
		// 	maximumAge: 500,
		// 	timeout: 3000,
		// 	enableHighAccuracy: true
		// });

		id_watchHeading = navigator.compass.watchHeading(function(heading) {
			_position.heading.magneticHeading = heading.magneticHeading;
			_position.heading.trueHeading = heading.trueHeading;
			_position.heading.headingAccuracy = heading.headingAccuracy;
			_position.heading.timestamp = heading.timestamp;
		}, function(e) {
			console.error(e);
		}, {
			filter: 0, // minimum change needed
			frequency: 100,
		});

		id_watchAcceleration = navigator.accelerometer.watchAcceleration(function(acceleration) {
			_position.acceleration.x = acceleration.x;
			_position.acceleration.y = acceleration.y;
			_position.acceleration.z = acceleration.z;
			_position.acceleration.timestamp = acceleration.timestamp;
		}, function(e) {
			console.error(e);
		}, {
			frequency: 100
		});
	}

	function pollingEnd() {
		navigator.geolocation.clearWatch(id_watchPosition);
		navigator.compass.clearWatch(id_watchHeading);
		navigator.accelerometer.clearWatch(id_watchAcceleration);
	}

	return {
		getLocation: function() {
			return _position.location;
		},
		getHeading: function() {
			return _position.heading;
		},
		getAcceleration: function() {
			return _position.acceleration;
		},
		init: function() {
			pollingInit();
		},
	};
})();
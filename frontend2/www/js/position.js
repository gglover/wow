var position = (function() {
	var _position = {
		location: null,
		heading: null,
		acceleration: null,
	};

	var id_watchPosition,
		id_watchHeading,
		id_watchAcceleration;

	function pollingInit() {
		id_watchPosition = navigator.geolocation.watchPosition(function success(pos) {
			_position.location = pos;
		}, function error(e) {
			console.error(e);
		}, {
			maximumAge: 500,
			timeout: 3000,
			enableHighAccuracy: true
		});

		id_watchHeading = navigator.compass.watchHeading(function(heading) {
			_position.heading = heading;
		}, function(e) {
			console.error(e);
		}, {
			filter: 0, // minimum change needed
			frequency: 100,
		});

		id_watchAcceleration = navigator.accelerometer.watchAcceleration(function(acceleration) {
			_position.acceleration = acceleration;
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
			initPolling();
		},
	};
})();
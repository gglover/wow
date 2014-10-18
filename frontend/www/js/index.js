var dispatcher = new WebSocketRails('108.179.144.59:3000/websocket');
dispatcher.bind('post_location', function() {
	console.log('yeah');
});

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

		//TODO: remove
		// var msg = {
		// 	profile: '' + data.input1
		// };
		// console.log(JSON.stringify(msg));
		// dispatcher.trigger('authenticate', msg);
		// ready();

		navigator.notification.prompt('what ur last.fm acct name?', function(data) {
			var msg = {
				profile: '' + data.input1
			};
			console.log(JSON.stringify(msg));
			dispatcher.trigger('authenticate', msg);
			ready();
		}, 'acct', ["OK", "Cancel"], 'asparagus22')

	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	}
};



function ready() {
	position.init();

	var width = window.innerWidth - 10,
		height = window.innerHeight - 20;
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	var renderer = new THREE.CanvasRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	var light = new THREE.PointLight(0xffffff, 10, 100);
	light.position.set(5, 5, 5);
	scene.add(light);


	// var texture = THREE.ImageUtils.loadTexture('http://www.brandeis.edu/about/images/newformat/map2.jpg');


	var geometry = new THREE.BoxGeometry(5, 5, 0.1);
	var material = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xabdeae,
		// map: texture,
	});
	var plane = new THREE.Mesh(geometry, material);
	scene.add(plane);


	var cur_pos = {
		latitude: 0,
		longitude: 0,
		altitude: 0,
	};

	camera.position.z = 5;

	var max_nearby = 10;
	var cubes = [];
	for (var i = 0; i < max_nearby; i++) {
		cubes[i] = new THREE.Mesh(
			new THREE.BoxGeometry(0.1, 0.1, 0.1),
			new THREE.MeshBasicMaterial({
				side: THREE.DoubleSide,
				color: 0xfa3737,
			}));
		cubes[i].position.z = -10;
		scene.add(cubes[i]);
	}

	// console.log(JSON.stringify(cubes));

	dispatcher.bind('listeners', function(users) {
		console.log(JSON.stringify(users));
		users.message.forEach(function(user, index) {
			if (index > cubes.length) {
				return;
			}

			if (user.latitude == null || user.latitude == null) {
				return;
			}
			console.log('print user ' + i + ' ' + user);

			console.log('cube pos (pre): ' + JSON.stringify(cubes[i]));

			cubes[i].position.x = user.latitude - cur_pos.latitude;
			cubes[i].position.y = user.longitude - cur_pos.longitude;
			cubes[i].position.z = 1;

			console.log('cube pos: ' + JSON.stringify(cubes[i].position));
		});
	});
	setInterval(function() {
		dispatcher.trigger('get_listeners');
	}, 5000);



	function render() {

		var a = position.getAcceleration();
		var h = position.getHeading();

		if (Math.abs((a.x * a.x + a.y * a.y + a.z * a.z) - (9.81 * 9.81)) < 20) {
			// camera.position.z = -a.z;
		}

		camera.rotation.z = -h.magneticHeading * Math.PI / 180;

		// camera.position.x = Math.cos(h.magneticHeading * Math.PI / 180) * 5;
		// camera.position.y = Math.sin(h.magneticHeading * Math.PI / 180) * 5;

		// camera.lookAt(new THREE.Vector3(0, 0, 0));



		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();


	navigator.geolocation.watchPosition(function success(pos) {
		var msg = {
			lat: pos.coords.latitude,
			lon: pos.coords.longitude,
			alt: pos.coords.altitude,
		};

		cur_pos = {
			"latitude": pos.coords.latitude,
			"longitude": pos.coords.longitude,
			"altitude": pos.coords.altitude,
		};

		console.log(JSON.stringify(msg));
		dispatcher.trigger('post_location', msg);
	}, function error(e) {
		console.error(e);
	}, {
		maximumAge: 500,
		timeout: 3000,
		enableHighAccuracy: true
	});

}
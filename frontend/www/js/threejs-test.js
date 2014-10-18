$(function() {


	var exampleSocket = new WebSocket("ws://www.example.com/socketserver", ["protocolOne", "protocolTwo"]);
	




	
	var position = (function() {
		var _position = {};
		_position.heading = {
			magneticHeading: 0
		};
		_position.location = {
			latitude: 0,
			longitude: 0,
		};
		_position.acceleration = {
			x: 0,
			y: 15,
			z: 9.81,
		};


		$(document.body).keydown(function(event) {
			switch (event.key) {
				case 'Left':
					_position.heading.magneticHeading = (_position.heading.magneticHeading + 10) % 360;
					break;
				case 'Right':
					_position.heading.magneticHeading = (_position.heading.magneticHeading - 10) % 360;
					break;
			}
		});


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
			init: function() {},
		};
	})();

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


	var texture = THREE.ImageUtils.loadTexture('http://www.brandeis.edu/about/images/newformat/map2.jpg');


	var geometry = new THREE.BoxGeometry(5, 5, 0.1);
	var material = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: 0xff0000,
		map: texture,
	});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	cube.doubleSided = true;

	// var geo_line = new THREE.BoxGeometry(0.1, 0.1, 1.5);
	// var line = new THREE.Mesh(geo_line, material);
	// scene.add(line);
	// line.position.z = 1;

	camera.position.z = 5;



	function render() {
		var loc = position.getLocation();
		var hea = position.getHeading();
		var acc = position.getAcceleration();

		document.getElementById('debug').innerHTML = [
			'loc: ' + JSON.stringify(loc),
			'hea: ' + JSON.stringify(hea),
			'acc: ' + JSON.stringify(acc),
		].join('\n');


		cube.lookAt(new THREE.Vector3(0, acc.y, acc.z));

		cube.rotation.z = hea.magneticHeading * Math.PI / 360;
		// console.log(a.x * a.x + a.y * a.y + a.z * a.z);

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();
});
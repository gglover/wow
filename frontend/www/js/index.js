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

		ready();
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
        color: 0xff0000,
		// map: texture,
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
		// cube.rotation.x += 0.1;
		// cube.rotation.y += 0.1;

		var a = position.getAcceleration();
		// console.log(a.x + ' ' + a.y + ' ' + a.z);
		if (Math.abs((a.x * a.x + a.y * a.y + a.z * a.z) - (9.81 * 9.81)) < 20) {
			cube.lookAt(new THREE.Vector3(0, a.y, a.z));
		}

		var h = position.getHeading();
		var rh = h.magneticHeading * Math.PI / 180;
		cube.rotation.z = rh;
		// line.lookAt(new THREE.Vector3(Math.cos(rh), Math.sin(rh), 0));

		// console.log(a.x * a.x + a.y * a.y + a.z * a.z);

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();
}
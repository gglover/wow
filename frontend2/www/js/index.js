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


	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	camera.position.z = 5;


	function render() {
		// var a = position.getAcceleration();
		// cube.lookAt(new THREE.Vector3(a.x, a.y, a.z));

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();
}
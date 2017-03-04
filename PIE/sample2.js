<html>
	<head>
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
			canvas { width: 100%; height: 100% }
		</style>
	</head>
	<body>
		<script src="http://threejs.org/build/three.min.js"></script>
		<script>
			//Constant declaration
var RENDER_DIST = 1000,
    FOV = 75;

var WIDTH = window.innerWidth,
    HEIGHT= window.innerHeight;

//Create the scene
var scene = new THREE.Scene();

//Create the camera
var camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, 0.1, RENDER_DIST);

//Pull the camera back a bit
camera.z = 100;
//Then add it to the scene
scene.add(camera);

//Create a renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH,HEIGHT);
renderer.domElement.className = "glMain";

//Container is a div
$("#container").html(renderer.domElement);

//Boilerplate done! Celebrate!
(function init() {
    var geometry = new THREE.SphereGeometry(50); 
    var material = new THREE.MeshBasicMaterial({color: 0xff0000}); 
    var sphere = new THREE.Mesh(geometry, material); 
    scene.add(sphere);

    //debugging
    console.log("Sphere at " + sphere.position.x + " " + sphere.position.y + " " + sphere.position.z);


})();

//Our main function
(function loopRun() {
    requestAnimationFrame(loopRun);

    console.log("rendered");
    renderer.render(scene, camera);
})();
		</script>
	</body>
</html>

/*Ball Variables*/
var myBall;             /* Ball Object */
var myBallRadius = 0.4;       /* Radius */
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallZ;            /* Z Position for placing ball */

/*Image Variables*/
var myImage;             /* Image Object */
var myImageRadius = myBallRadius;       /* Radius */
var myImageX;            /* X Position */
var myImageY;            /* Y Position */
var myImageZ;            /* Z Position for placing Image */

/*Mirror Variables*/
var myMirror;			/*Mirror Object*/
var myMirrorX;			/*X position */
var myMirrorY;			/*Y position*/
var myMirrorZ;			/*Z position*/
var myMirrorMaterial;	/*Material*/
var distanceFromObject;

/*Incident ray*/
var IRay;

/*Normal*/

/*Reflected*/



function loadExperimentElements(){
	
	PIEscene.background = new THREE.Color(0xffffff);
	
	resetExperiment();
	
	PIErenderer.setSize(window.innerWidth, window.innerHeight);
	container = document.createElement('div');
	document.body.appendChild( container );
	container.appendChild(PIErenderer.domElement);
	var controls = new THREE.OrbitControls( PIEcamera, PIErenderer.domElement );
	
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	PIEscene.add(light);
	var ambientLight = new THREE.AmbientLight(0x111111);
	PIEscene.add(ambientLight);
	
	var axes = new THREE.AxisHelper(100);
	axes.position.set(0.0,0.0,0.0);
	PIEscene.add(axes);
	
	var lineGeometry = new THREE.Geometry();
	var vertArray = lineGeometry.vertices;
	vertArray.push( new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(-0.4, 0.4, 0.4) );
	lineGeometry.computeLineDistances();
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
	var line = new THREE.Line( lineGeometry, lineMaterial );
	line.position.set(0,0,0);
	PIEaddElement(line);
	
	geometry = new THREE.PlaneGeometry(new THREE.Vector3(0.1,0.1,0.1),0);
	material = new THREE.MeshLambertMaterial({color: 0xff0060});
	myMirror = new THREE.Mesh(geometry,material);
	myMirror.castShadow = true;
    myMirror.receiveShadow = true;
	PIEaddElement(myMirror);
	console.log("mirror exists");
	
	/*Ball*/
	myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0x00ffdd}));
    myBall.position.set(myBallX, myBallY, myBallZ);
    myBall.castShadow = true;
    myBall.receiveShadow = true;
    PIEaddElement(myBall);
	console.log("ball exists");
	
	myImage = new THREE.Mesh(new THREE.SphereGeometry(myImageRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xff0000}));
    myImage.position.set(myImageX, myImageY, myImageZ);
    myImage.castShadow = true;
    myImage.receiveShadow = true;
	PIEaddElement(myImage);
	console.log("image exists");
	
	
	
	PIErender();
	
}

function resetExperiment(){
	
	myBallX = -0.4;
	myBallY = 0.0;
	myBallZ = -7.0;
	myImageZ= myBallZ;
	myImageX = 0.8+myBallX;
	myImageY = myBallY;
}

function updateExperimentElements(t,dt){
	
	PIEanimate();
	PIErender();
	
}
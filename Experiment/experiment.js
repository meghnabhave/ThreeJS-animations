var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Sunrise and Rotation of earth help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the position of sunrise on earth and the rotation of earth.</p>";
    helpContent = helpContent + "<p>In the animation stage, the earth revolves around the earth and rotates about its axis which is tilted by 22 degrees. On the left, sun rises from the east according to the position of earth on its orbit.</p>";
    helpContent = helpContent + "<p>The display panel above shows: </p>";
    helpContent = helpContent + "<ul> <li><b>Day of Sunset/Sunrise</b> : If its a Solistice day or Equinox day.</li>"
    helpContent = helpContent + "<li><b>Date of Sunset/Sunrise</b> : Date when the sun rises or sets in the shown manner.</li>"
    helpContent = helpContent + "<li><b>Season in Northern Hemisphere:</b> : The season in northern hemisphere for the corresponding sunrise sunset configuration.</li>"
    helpContent = helpContent + "<li><b>Hemisphere towards the sun: </b> :Due to the tilt of the axis of earth's rotation, the hemisphere directly recieving the suns rays is different at different positions of revolution around the sun. This shows the hemisphere towards the sun at the specific configuration being shown on screen.</li> </ul>"
    helpContent = helpContent + "<p>You can go back to the setup stage by pressing the reset button.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting!</h2>";
    PIEupdateHelp(helpContent);
}
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Sunrise and Rotation of earth concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>>The experiment shows the position of sunrise on earth and the corresponding alignment of earth with respect to sun, while the earth rotates about it's axis.</p>";
    infoContent = infoContent + "<h3>Sunrise</h3>";
    infoContent = infoContent + "<p>Due to the 22 degree tilt of the earth's axis, sun rises from north of east when the northern hemisphere is towards the sun.</p>";
    infoContent = infoContent + "<p>Similarly, the sun rises in south of east when the northern hemisphere is away from the sun.</p>";
    infoContent = infoContent + "<p>The sun rises in the maximum north east on the day of Summer Solistice (21 June)</p>";
    infoContent = infoContent + "<p>The sun rises in the maximum south east on the day of Winter Solistice (21 December)</p>";
    infoContent = infoContent + "<p>The sun rises due east on the day of Spring and Autumn Equinoxes. (21 March and 23 September)</p>";
    
    infoContent = infoContent + "<h2>Happy Experimenting!</h2>";
    PIEupdateInfo(infoContent);
}




var earth;
var sphere;
var clouds;
var earthRadius;
var circle;
var sun;
var sunRadius;

var sun1,sun2,sun3;

var pressreset;

function initialise(){

	earthRadius = 18;
	sunRadius = 30;
	var height = 1000;
	var width = 1000 ;
	PIEsetAreaOfInterest(-(width/2),height/2,width/2,-(height/2));
	PIEadjustCamera(0,0,800);
	
}


function human(){
		
	var geometry = new THREE.BoxGeometry(20,40,10);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/human.jpg') } );
	var human = new THREE.Mesh(geometry,material);
	human.position.set(-200,0,10);
	PIEaddElement(human);
}


function MakePlane(){
	var geometry = new THREE.CircleGeometry( 500, 200 );
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/grass.jpg') } );	
	//var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, } );
	var plane = new THREE.Mesh( geometry, material );
	plane.position.set(-250,-500,0);
	PIEaddElement(plane);

	var geometry2 = new THREE.PlaneGeometry(470,600);
	var material2 = new THREE.MeshBasicMaterial( {color: 0x87ceeb, side: THREE.DoubleSide, } );
	var plane2 = new THREE.Mesh(geometry2,material2);
	plane2.position.set(-220,0,-10);
	PIEaddElement(plane2);

	var geometry3 = new THREE.PlaneGeometry(140,210);
	var material3 = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/galaxy.jpg') } );
	var plane3 = new THREE.Mesh(geometry3,material3);
	plane3.position.set(85,-205,0);
	PIEaddElement(plane3);
	
	var geometry4 = new THREE.PlaneGeometry(40,40);
	var plane4 = new THREE.Mesh(geometry4,material3);
	plane4.position.set(35,-80,0);
	PIEaddElement(plane4);
}

function MakeEast(){
	var curve = new THREE.EllipseCurve(
 	 -200, 0,             // ax, aY
	  200, 200,            // xRadius, yRadius
	  0, 0.5*Math.PI, // aStartAngle, aEndAngle
	  false             // aClockwise
	);
	var path = new THREE.Path(curve.getPoints(5000));
	var geometry = path.createPointsGeometry(50000);
	var material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 3});	
	var ellipse = new THREE.Line(geometry, material);
	ellipse.rotation.set(0,Math.PI/2,0);
	PIEaddElement(ellipse);
	ellipse.position.set(-200,0,0);
	console.log("ellipse");


	var sphere = new THREE.SphereBufferGeometry(10,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun1 = new THREE.Mesh(sphere,material);
	sun1.position.set(-200,0,0);
	PIEaddElement(sun1);
}

function MakeNorthEast(){
	var curve = new THREE.EllipseCurve(
  -200, 0,             // ax, aY
  200, 200,            // xRadius, yRadius
  0, 0.5*Math.PI, // aStartAngle, aEndAngle
  false             // aClockwise
);
var path = new THREE.Path(curve.getPoints(5000));
var geometry = path.createPointsGeometry(50000);
var material = new THREE.LineBasicMaterial({color: 0x0ff000, linewidth: 3});
var ellipse = new THREE.Line(geometry, material);
ellipse.rotation.set(0,Math.PI/2,0);
PIEaddElement(ellipse);
ellipse.position.set(-300,0,0);
	console.log("ellipse");
	
	var sphere = new THREE.SphereBufferGeometry(10,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun3 = new THREE.Mesh(sphere,material);
	sun3.position.set(-300,0,0);
	PIEaddElement(sun3);

}

function MakeSouthEast(){
	var curve = new THREE.EllipseCurve(
  -200, 0,             // ax, aY
  200, 200,            // xRadius, yRadius
  0, 0.5*Math.PI, // aStartAngle, aEndAngle
  false             // aClockwise
);
var path = new THREE.Path(curve.getPoints(5000));
var geometry = path.createPointsGeometry(50000);
var material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 3});
var ellipse = new THREE.Line(geometry, material);
ellipse.rotation.set(0,Math.PI/2,0);
PIEaddElement(ellipse);
ellipse.position.set(-100,-25,0);
	console.log("ellipse");
	
	var sphere = new THREE.SphereBufferGeometry(10,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun2 = new THREE.Mesh(sphere,material);
	sun2.position.set(-100,-20,0);
	PIEaddElement(sun2);
}

function makeEquator(){
	var geometry = new THREE.CircleGeometry( 60, 32 );
	var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth:3 } );
	circle = new THREE.Line( geometry, material );
	circle.position.set(210,0,0);
	circle.rotation.set(Math.PI/2,0,0);
	PIEaddElement(circle);
	
}

function makeEarth(){
// Earth params
	var width = 1000;
	var height = 1000;
	var radius   = 50,
		segments = 32,
		rotation = Math.PI/2+2;  

	var light = new THREE.SpotLight(0xffffff,2);
	light.position.set(2000,0,0);
	light.castShadow = true;
	PIEscene.add(light);

    	sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	sphere.position.set(210,0,0)
	PIEscene.add(sphere)

    	/*clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	clouds.position.set(210,0,0)
	PIEscene.add(clouds)*/
}

function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         new THREE.TextureLoader().load('images/2_no_clouds_4k.jpg'),
				bumpMap:     new THREE.TextureLoader().load('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: new THREE.TextureLoader().load('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}

	/*function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         new THREE.TextureLoader().load('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}*/




function makeSun(){
	var sphere = new THREE.SphereBufferGeometry(sunRadius,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun = new THREE.Mesh(sphere,material);
	sun.position.set(150,0,0);
	PIEaddElement(sun);
	PIErender();
}

var hack=0;

function loadExperimentElements(){
	
	control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	control.addEventListener('change',PIErender);

	if(window.attachEvent) {
    	window.attachEvent('onresize', PIEresize);
	}
	else if(window.addEventListener) {
	    window.addEventListener('resize', PIEresize, true);
	}

	initialise();
	PIEscene.background = new THREE.TextureLoader().load('images/galaxy.jpg');
	

	PIEsetExperimentTitle("Sunrise and Rotation of Earth");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
	
	console.log(PIEcamera.position.x +" "+PIEcamera.position.y+" "+PIEcamera.position.z);

	//MakeOrbit();
	MakeNorthEast();
	MakeSouthEast();
	MakeEast();
	makeEarth();
	//makeSun();
	makeEquator();
	MakePlane();
	//human();
	//text();

	PIErender()

	PIEaddDisplayText("Time: ","None");
	PIEaddDisplayText("Date: ","None");
	PIEaddDisplayText("Towards Sun: ","None");
	PIEaddDisplayText("Season in North: ","None");
	resetExperiment();

	PIErender()
}

function resetExperiment(){
	
	initialise();
	sun1.position.set(-200,100,0);
	sun2.position.set(-100,0,0);
	sun3.position.set(-300,0,0);
	
	window.addEventListener('resize', PIEresize, true);

	sun1.visible = false;
	sun2.visible = false;
	sun3.visible = false;
	PIEscene.remove(PIEspotLight);

}

var flag;
var x=0,y=x,z=x;
function updateExperimentElements(t,dt){
	//if(hack>5)
	{
	dt = dt/1000;
	t=t/250;       
	flag = t;
	flag = flag/8;
	flag = Math.floor(flag);
	flag = flag%8;
	if( flag == 0 || flag == 1){
	sun1.visible = true;
	sun2.visible = false;
	sun3.visible = false;

	sphere.rotation.z = 0;
	//clouds.rotation.z = 0;
	circle.rotation.y = 0;
	y=0;
	z=0;
	x = x+0.005;
	sun1.position.y = 200*Math.sin(x);
    	sun1.position.z = -200*Math.cos(x) +200;
	PIEchangeDisplayText("Time: ","Spring Equinox");
	PIEchangeDisplayText("Date: ","21 March");
	PIEchangeDisplayText("Towards Sun: ","Equator");
	PIEchangeDisplayText("Season in North: ","Spring");

	
	}
	else if(flag == 2 || flag == 3){
	sun1.visible = false;
	sun2.visible = false;
	sun3.visible = true;

	sphere.rotation.z =  -Math.PI/8;
	//clouds.rotation.z =  Math.PI/8;
	circle.rotation.y = -Math.PI/8;
	x=0; y=0; z=z+0.005;
	sun3.position.y = 200*Math.sin(z) ;
    	sun3.position.z = -200*Math.cos(z)+200 ;
	
		PIEchangeDisplayText("Time: ","Summer Solistice");
		PIEchangeDisplayText("Date: ","21 June");
		PIEchangeDisplayText("Towards Sun: ","Northern hemisphere.");
		PIEchangeDisplayText("Season in North: ","Summer");

	
		
	}
	else if(flag==4 || flag == 5){

	sun1.visible = true;
	sun2.visible = false;
	sun3.visible = false;	

	sphere.rotation.z = 0;
	//clouds.rotation.z = 0;
	circle.rotation.y = 0;
	y=0; z=0;
	x=x+0.005;
	sun1.position.y = 200*Math.sin(x);
	sun1.position.z = -200*Math.cos(x)+200 ;
	PIEchangeDisplayText("Time: ","Autumn Equinox");

	PIEchangeDisplayText("Date: ","23 September");
	PIEchangeDisplayText("Towards Sun: ","Equator");
	PIEchangeDisplayText("Season in North: ","Autumn");


	}
	else{
	
		sun1.visible = false;
	sun2.visible = true;
	sun3.visible = false;

		sphere.rotation.z = Math.PI/8;
	//clouds.rotation.z = -Math.PI/8;
		circle.rotation.y = Math.PI/8;
		x=0; z=0;
		y=y+0.005;
		sun2.position.y = 200*Math.sin(y);
	sun2.position.z = -200*Math.cos(y) +210 ;
		
		PIEchangeDisplayText("Time: ","Winter Solistice");
	PIEchangeDisplayText("Date: ","21 December");
	PIEchangeDisplayText("Towards Sun: ","Southern Hemisphere");
	PIEchangeDisplayText("Season in North: ","Winter");


	}
	
	sphere.rotation.y+=0.008;
	//clouds.rotation.y+=0.008;
	}
}

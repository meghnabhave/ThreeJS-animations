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
    helpContent = helpContent + "<li><b>Hemisphere towards the sun: </b> :Due to the tilt of the axis of earth's rotation, the hemisphere directly recieving the suns rays is different at different positions of revolution around the sun. This shows the hemisphere towards the sun at the specific configuration being shown on screen.</li>" 
    helpContent = helpContent + "<li><b>Angle from due East</b> : The angle that the shadow of an object on earth makes from the due east line.</li> </ul>"
 
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
    
	infoContent = infoContent + "<h3>Angles</h3>";
    infoContent = infoContent + "<p>Consider an obbserver looking at the sunrise facing east. An object kept on earth makes shadows according to the direction of sunrise. When the sun rises north of east, the shadow is 23.4 degrees right to the due east line. Similarly, when sun rises south of east, the shadow is 23.4 degrees to the left. On equinox days, the sun rises due east, and thus the angle made is zero degrees. </p>";
	
    infoContent = infoContent + "<h2>Happy Experimenting!</h2>";
    PIEupdateInfo(infoContent);
}

var earth;
var sphere;
var clouds;
var earthRadius;
var circle;

var sun1,sun2,sun3;

function initialise(){
	earthRadius = 18;
	sunRadius = 30;
	var height = 400;
	var width = 700 ;
	PIEsetAreaOfInterest(-(width/2),height/2,width/2,-(height/2));
}

function resize(event){
	PIEresize();
	PIEadjustDisplayScene();
	
}
var MAX_POINTS = 600;
var c=200;
function makeLine(){
	var geometry = new THREE.BufferGeometry();
	var positions = new Float32Array( MAX_POINTS * 3 );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	drawCount = c;
	geometry.setDrawRange( 0, drawCount );
	var material = new THREE.LineBasicMaterial( { color: 0x262626, linewidth: 10 } );
	line = new THREE.Line( geometry,  material );
	return( line );
}
function updatePositions(c1,c2,line) {
	var positions = line.geometry.attributes.position.array;
	var x = -200,y = -100,z = 10
	var index = 0;
	for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {

		positions[ index ++ ] = x;
		positions[ index ++ ] = y;
		positions[ index ++ ] = z;

		x -= c1;
		y -= c2;
		
	}
}
var line1,line2,line3,normal;
var shadow1,shadow2,shadow3;
var f=0.3;
function showAngles(){

	shadow1 = makeLine(new THREE.Vector3(-200,-100,10),new THREE.Vector3(-200,-160,10),0x262626,100);
	shadow2 = makeLine(new THREE.Vector3(-200,-100,10),new THREE.Vector3(-317,-182,10),0x262626,100);
	shadow3 = makeLine(new THREE.Vector3(-200,-100,10),new THREE.Vector3(-117,-182,10),0x262626,100);
	
	PIEaddElement(shadow1);
	PIEaddElement(shadow2);
	PIEaddElement(shadow3);	

	shadow1.visible=false;
	shadow2.visible=false;
	shadow3.visible=false;

	updatePositions(0,f,shadow1);
	updatePositions(f,f,shadow2);
	updatePositions(-f,f,shadow3);
}
var spotlight,spotlightH;

function object(){
	var geometry = new THREE.CylinderGeometry(4,4,40);
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});
	var object = new THREE.Mesh(geometry,material);
	object.position.set(-202,-80,0);
	PIEaddElement(object);
	object.receiveShadow = true;
}

function MakePlane(){
	var geometry = new THREE.CircleGeometry( 500, 200 );
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/grass.jpg') } );	
	var plane = new THREE.Mesh( geometry, material );
	plane.position.set(-250,-500,-20);
	PIEaddElement(plane);

	var geometry2 = new THREE.PlaneGeometry(470,600);
	var material2 = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/galaxy.png') });
	var plane2 = new THREE.Mesh(geometry2,material2);
	plane2.position.set(250,0,-10);
	PIEaddElement(plane2);
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


	var sphere = new THREE.SphereBufferGeometry(15,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun1 = new THREE.Mesh(sphere,material);
	sun1.position.set(-200,0,0);
	PIEaddElement(sun1);
	sun1.visible=false;
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
	
	var sphere = new THREE.SphereBufferGeometry(15,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') }  );	
	sun3 = new THREE.Mesh(sphere,material);
	sun3.position.set(-300,0,0);
	PIEaddElement(sun3);
	sun3.visible=false;

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
ellipse.position.set(-100,-20,-15);
	console.log("ellipse");
	
	var sphere = new THREE.SphereBufferGeometry(15,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') }  );	
	sun2 = new THREE.Mesh(sphere,material);
	sun2.position.set(-100,-20,0);
	PIEaddElement(sun2);
	sun2.visible=false;
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

var hack;

function loadExperimentElements(){
	
	//control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	//control.addEventListener('change',PIErender);
	    window.addEventListener('resize',resize, true);

	initialise();
	PIEscene.background = new THREE.Color(0x87ceeb)
	

	PIEsetExperimentTitle("Sunrise and Rotation of Earth");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    	initialiseHelp();
    	initialiseInfo();
	
	console.log(PIEcamera.position.x +" "+PIEcamera.position.y+" "+PIEcamera.position.z);

	MakeNorthEast();
	MakeSouthEast();
	MakeEast();
	makeEarth();
	makeEquator();
	MakePlane();
	object();
	showAngles();	

	PIEaddDisplayText("Time: ","None");
	PIEaddDisplayText("Date: ","None");
	PIEaddDisplayText("Towards Sun: ","None");
	PIEaddDisplayText("Season in North: ","None");
	PIEaddDisplayText("Angle from due East:","None");

	resetExperiment();
	PIEscene.remove(PIEspotLight);
	PIEresetExperiment(); hack=0;
	PIEstartAnimation();
}

function resetExperiment(){
	
	initialise();
	sun1.position.set(-200,100,0);
	sun2.position.set(-100,0,0);
	sun3.position.set(-300,0,0);
	
	window.addEventListener('resize', resize, true);

	sun1.visible = false;
	sun2.visible = false;
	sun3.visible = false;
	PIEscene.remove(PIEspotLight);

}

var flag;
var x=0,y=x,z=x;
var drawCount1=c,drawCount2=c,drawCount3=c;
function updateExperimentElements(t,dt){
	
	if(hack<5){
		hack++;
		PIEscene.remove(PIEspotLight);
		if(hack==5)
		PIEstopAnimation();
	}
	else{
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

		shadow1.visible=true;
		shadow2.visible = false;
		shadow3.visible = false;
	
		sphere.rotation.z = 0;
		circle.rotation.y = 0;
		y=0;
		z=0;
		x = x+0.005;
		sun1.position.y = 200*Math.sin(x);
	    	sun1.position.z = -200*Math.cos(x) +200;
		
		drawCount1 = ( drawCount1 - 1 ) % MAX_POINTS;
		drawCount2=c;
		drawCount3=c;
		shadow1.geometry.setDrawRange( 0, drawCount1 );

		if ( drawCount1 === 0 ) {
		updatePositions(0,f,shadow1);
		shadow1.geometry.attributes.position.needsUpdate = true; // required after the first render
		}
		
		PIEchangeDisplayText("Time: ","Spring Equinox");
		PIEchangeDisplayText("Date: ","21 March");
		PIEchangeDisplayText("Towards Sun: ","Equator");
		PIEchangeDisplayText("Season in North: ","Spring");
		PIEchangeDisplayText("Angle from due East:","0");
		}
	else if(flag == 2 || flag == 3){
		sun1.visible = false;
		sun2.visible = false;
		sun3.visible = true;

		shadow1.visible = false;
		shadow2.visible = false;
		shadow3.visible = true;
		
		sphere.rotation.z =  -Math.PI/8;
		circle.rotation.y = -Math.PI/8;
		x=0; y=0; z=z+0.005;
		sun3.position.y = 200*Math.sin(z) ;
	    	sun3.position.z = -200*Math.cos(z)+200 ;

		drawCount3 = ( drawCount3 - 1 ) % MAX_POINTS;
		drawCount2=c;
		drawCount1=c;
		shadow3.geometry.setDrawRange( 0, drawCount3 );

		if ( drawCount3 === 0 ) {
		updatePositions(-f,f,shadow3);
		shadow3.geometry.attributes.position.needsUpdate = true; // required after the first render
		}
		
		PIEchangeDisplayText("Time: ","Summer Solistice");
		PIEchangeDisplayText("Date: ","21 June");
		PIEchangeDisplayText("Towards Sun: ","Northern hemisphere.");
		PIEchangeDisplayText("Season in North: ","Summer");
		PIEchangeDisplayText("Angle from due East:","-23.4");
	
		
			
		}
	else if(flag==4 || flag == 5){
	
		sun1.visible = true;
		sun2.visible = false;
		sun3.visible = false;

		shadow1.visible = true;
		shadow2.visible = false;
		shadow3.visible = false;	
	
		//spotlight.position.x=-100;
		sphere.rotation.z = 0;
		//clouds.rotation.z = 0;
		circle.rotation.y = 0;
		y=0; z=0;
		x=x+0.005;
		sun1.position.y = 200*Math.sin(x);
		sun1.position.z = -200*Math.cos(x)+200 ;

		drawCount1 = ( drawCount1 - 1 ) % MAX_POINTS;
		drawCount2=c;
		drawCount3=c;
		shadow1.geometry.setDrawRange( 0, drawCount1 );

		if ( drawCount1 === 0 ) {
		updatePositions(0,f,shadow1);
		shadow1.geometry.attributes.position.needsUpdate = true; // required after the first render
		}

		PIEchangeDisplayText("Time: ","Autumn Equinox");
		
		PIEchangeDisplayText("Date: ","23 September");
		PIEchangeDisplayText("Towards Sun: ","Equator");
		PIEchangeDisplayText("Season in North: ","Autumn");
		PIEchangeDisplayText("Angle from due East:","0");
	
	
	}
	else{
	
		sun1.visible = false;
		sun2.visible = true;
		sun3.visible = false;


		shadow1.visible = false;
		shadow2.visible = true;
		shadow3.visible = false;

		sphere.rotation.z = Math.PI/8;
		circle.rotation.y = Math.PI/8;
		x=0; z=0;
		y=y+0.005;
		sun2.position.y = 200*Math.sin(y);
		sun2.position.z = -200*Math.cos(y) +210 ;

		drawCount2 = ( drawCount2 - 1 ) % MAX_POINTS;
		drawCount1=c;
		drawCount3=c;
		shadow2.geometry.setDrawRange( 0, drawCount2 );

		if ( drawCount2 === 0 ) {
		updatePositions(f,f,shadow2);
		shadow2.geometry.attributes.position.needsUpdate = true;
		}
		
		PIEchangeDisplayText("Time: ","Winter Solistice");
		PIEchangeDisplayText("Date: ","21 December");
		PIEchangeDisplayText("Towards Sun: ","Southern Hemisphere");
		PIEchangeDisplayText("Season in North: ","Winter");
		PIEchangeDisplayText("Angle from due East:","23.4");
	}
	
	sphere.rotation.y+=0.008;	
	}	
}

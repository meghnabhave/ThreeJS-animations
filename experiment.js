var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Solar System help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the sun and 8 planets revolving around the sun.</p>";
    helpContent = helpContent + "<p>In the animation stage, the planets revolves around the sun with their respective speeds and rotates about their respective axes.</p>";
     helpContent = helpContent + "<p>On clicking on a planet, the display panel gets updated with the planets information.</p>";
    helpContent = helpContent + "<p>The display panel above shows: </p>";
    helpContent = helpContent + "<ul> <li><b>Name</b> : Name of the planet.</li>"
    helpContent = helpContent + "<li><b>Distance from Sun</b> : Distance of the planet from the sun in AU (Astronimical units)</li>"
    helpContent = helpContent + "<li><b>Orbital Time</b> : Time period of revolution around sun in earth years.</li></ul>"
    helpContent = helpContent + "<p>You can zoom in/zoom out using the buttons provided in the right upper corner.</p>";
    helpContent = helpContent + "<p>You can go back to the setup stage by pressing the reset button.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting!</h2>";
    PIEupdateHelp(helpContent);
}
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Solar System concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>>The experiment shows the sun and 8 planets revolving around the sun.</p>";
    infoContent = infoContent + "<h3>Sun</h3>";
    infoContent = infoContent + "<p>The sun shown in the animation is very small, if made to scale, the planets will appear to be point objects. The actual size of sun to the chosen scale of the animation is 10,000 times larger than the assumed size.</p>";
    infoContent = infoContent + "<h3>Some Facts: </h3>"
    infoContent = infoContent + "<p>Planets revolve around the sun due to the centripetal acceleration provided by the sun's gravitational force on the planets.</p>";
    infoContent = infoContent + "<p>Jupiter is the largest planet in the solar system, followed by Saturn.</p>";
    infoContent = infoContent + "<h3>Units: </h3>"
    infoContent = infoContent + "<p><b>Astronomical Units(AU) :</b>Astronomical Units is the unit of measurement of distance of a planet from the sun. 1AU is the distance of earth from the sun.</p>";
    infoContent = infoContent + "<p><b>Earth Year or year :</b>It is a unit of measuring time. 1 year is equal to the time taken by the earth to revolve around the sun. 1 year = 365 days.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting!</h2>";
    PIEupdateInfo(infoContent);
}


var sunRadius;

var mercury;
var mercuryRadius;
var mercuryOrbitX;
var mercuryOrbitY;
var mercurySpeed;

var venus;
var venusRadius;
var venusOrbitX;
var venusOrbitY;
var venusSpeed;

var earth;
var earthRadius;
var earthOrbitX;
var earthOrbitY;
var earthSpeed;

var mars;
var marsRadius;
var marsOrbitX;
var marsOrbitY;
var marsSpeed;

var jupiter;
var jupiterRadius;
var jupiterOrbitX;
var jupiterOrbitY;
var jupiterSpeed;

var saturn;
var saturnRadius;
var saturnOrbitX;
var saturnOrbitY;
var saturnSpeed;

var uranus;
var uranusRadius;
var uranusOrbitX;
var uranusOrbitY;
var uranusSpeed;

var neptune;
var neptuneRadius;
var neptuneOrbitX;
var neptuneOrbitY;
var neptuneSpeed;

function initialise(){
	
	var factor=0.55;
	sunRadius  = 1*factor;
	mercuryRadius = (2.6-2)*factor;
	venusRadius = (3.7-2)*factor;
	earthRadius = (6.9-0.5)*factor;
	marsRadius =(6.6-0.5)*factor;
	jupiterRadius = (55.2-15)*factor;
	saturnRadius=(48.7-10)*factor;
	uranusRadius = (20.6-5)*factor;
	neptuneRadius = (19.8-5)*factor;

	mercuryOrbitX = (31.724-30)*factor;
	mercuryOrbitY = (28.285-30)*factor;

	venusOrbitX = (56.185-50)*factor;
	venusOrbitY = (56.016-50)*factor;

	earthOrbitX=(81.882-60)*factor;
	earthOrbitY=(81.2243-60)*factor;

	marsOrbitX=(124.731-70)*factor;
	marsOrbitY=(118.7633-70)*factor;

	jupiterOrbitX=(425.995-300)*factor;
	jupiterOrbitY=(415.538-300)*factor;

	saturnOrbitX=(782.215-510)*factor;
	saturnOrbitY=(760.0115-510)*factor;

	uranusOrbitX=(1571.354-1200)*factor;
	uranusOrbitY=(1534.8-1200)*factor;

	neptuneOrbitX=(2463.484-2000)*factor;
	neptuneOrbitY=(2452.373-2000)*factor;

	var height = window.innerheight;
	var width = window.innerwdth;
	PIEsetAreaOfInterest(-(width/2),height/2,width/2,-(height/2));
	PIEsetCameraDepth(Infinity);
	//PIEsetCameraFOV(90);
	//PIEcamera.near = 0.1;
	//PIEsetCameraAspect(width/height);
	PIEadjustCamera(0,0,1000);
	//PIEadjustDisplayScene();

	mercurySpeed = 0.473*factor;
	venusSpeed = 0.3502*factor;
	earthSpeed = 0.3800*factor;
	marsSpeed = 0.2407*factor;
	jupiterSpeed = 0.1307*factor;
	saturnSpeed = 0.0969*factor;
	uranusSpeed = 0.068*factor;
	neptuneSpeed = 0.0543*factor;
}

function WindowResize(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.position.x = camera.position.y = 0;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}

function MakeOrbit(xRadius,yRadius){
	var curve = new THREE.EllipseCurve(
  0, 0,             // ax, aY
  xRadius, yRadius,            // xRadius, yRadius
  0, 2 * Math.PI, // aStartAngle, aEndAngle
  false             // aClockwise
);
var path = new THREE.Path(curve.getPoints(500000));
var geometry = path.createPointsGeometry(50000);
var material = new THREE.LineBasicMaterial({color: 0xffffff});
var ellipse = new THREE.Line(geometry, material);
PIEaddElement(ellipse);
//ellipse.rotation.set(-Math.PI/4-Math.PI/8,0,0);
console.log("ellipse");
}

function makeEarth(){
	MakeOrbit(earthOrbitX,earthOrbitY);
	var sphere = new THREE.SphereBufferGeometry(earthRadius,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/earth.jpg') } );
	earth = new THREE.Mesh(sphere,material);
	earth.rotation.set(Math.PI/2, 0.4101, 0);
	earth.position.set(earthOrbitX,0,0);
	PIEaddElement(earth);	
}



function makeSun(){
	var sphere = new THREE.SphereBufferGeometry(sunRadius,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun = new THREE.Mesh(sphere,material);
	sun.position.set(0,0,0);
	PIEaddElement(sun);
	PIErender();
}

function makeMercury(){
	MakeOrbit(mercuryOrbitX,mercuryOrbitY);
	var geometry	= new THREE.SphereGeometry(mercuryRadius, 15, 15)
	var material	= new THREE.MeshPhongMaterial({
		map	: new THREE.TextureLoader().load('images/mercurymap.jpg'),
		bumpMap	: new THREE.TextureLoader().load('images/mercurybump.jpg'),
		bumpScale: 0.005,
	})
	mercury	= new THREE.Mesh(geometry, material);
	mercury.position.set(mercuryOrbitX,0,0);
	mercury.rotation.set(Math.PI/2, 0.4101, 0);
	PIEaddElement(mercury);	
}

function makeVenus(){
	MakeOrbit(venusOrbitX,venusOrbitY);
	var geometry	= new THREE.SphereGeometry(venusRadius, 15, 15)
	var material	= new THREE.MeshPhongMaterial({
		map	: new THREE.TextureLoader().load('images/venusmap.jpg'),
		bumpMap	: new THREE.TextureLoader().load('images/venusbump.jpg'),
		bumpScale: 0.005,
	})
	venus	= new THREE.Mesh(geometry, material);
	venus.position.set(venusOrbitX,0,0);
	venus.rotation.set(Math.PI/2, 0.4101, 0);	
	PIEaddElement(venus);	
}


function makeMars(){
	MakeOrbit(marsOrbitX,marsOrbitY);
	var geometry	= new THREE.SphereGeometry(marsRadius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: new THREE.TextureLoader().load('images/marsmap1k.jpg'),
		bumpMap	: new THREE.TextureLoader().load('images/marsbump1k.jpg'),
		bumpScale: 0.05,
	})
	mars	= new THREE.Mesh(geometry, material);
	mars.position.set(marsOrbitX,0,0);
	mars.rotation.set(Math.PI/2, 0.4101, 0);
	PIEaddElement(mars);	
}

function makeJupiter(){
	MakeOrbit(jupiterOrbitX,jupiterOrbitY);
	var geometry	= new THREE.SphereGeometry(jupiterRadius, 32, 32)
	var texture	= new THREE.TextureLoader().load('images/jupitermap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.02,
	})
	jupiter	= new THREE.Mesh(geometry, material);
	jupiter.position.set(jupiterOrbitX,0,0);
	jupiter.rotation.set(Math.PI/2, 0.4101, 0);
	PIEaddElement(jupiter);	
}


function makeSaturn(){
	MakeOrbit(saturnOrbitX,saturnOrbitY);
	var geometry	= new THREE.SphereGeometry(saturnRadius, 32, 32)
	var texture	= new THREE.TextureLoader().load('images/saturnmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	saturn	= new THREE.Mesh(geometry, material);
	saturn.position.set(saturnOrbitX,0,0);
	saturn.rotation.set(Math.PI/2, 0.4101, 0);
	PIEaddElement(saturn);	
}




function makeUranus(){
	MakeOrbit(uranusOrbitX,uranusOrbitY);
	var geometry	= new THREE.SphereGeometry(uranusRadius, 32, 32)
	var texture	= new THREE.TextureLoader().load('images/uranusmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	uranus	= new THREE.Mesh(geometry, material);
	uranus.position.set(uranusOrbitX,0,0);
	uranus.rotation.set(-(Math.PI/2), 0.4101, 0);
	PIEaddElement(uranus);	
}




function makeNeptune(){
	MakeOrbit(neptuneOrbitX,neptuneOrbitY);
	var geometry	= new THREE.SphereGeometry(neptuneRadius, 32, 32)
	var texture	= new THREE.TextureLoader().load('images/neptunemap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	neptune	= new THREE.Mesh(geometry, material);
	neptune.position.set(neptuneOrbitX,0,0);
	neptune.rotation.set(Math.PI/2, 0.4101, 0);
	PIEaddElement(neptune);	
}



function createPluto(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.TextureLoader().load('images/plutomap1k.jpg'),
		bumpMap	: THREE.TextureLoader().load('images/plutobump1k.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


function zoomIn(){
	PIEcamera.position.z -=50;
	if(PIEcamera.position.z<10)
		PIEcamera.position.z=10;
}

function zoomOut(){
	var z = PIEcamera.position.z;
	if(z<1000){
		PIEcamera.position.z+=50;
	}
	if(PIEcamera.position.z>1000)
		PIEcamera.position.z = 1000;
}

var mouse=new THREE.Vector2();
var raycaster;
function onDocumentMouseDown( event ) {
	
	raycaster = new THREE.Raycaster();
    	event.preventDefault();
    	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    	// find intersections
    	raycaster.setFromCamera( mouse, PIEcamera );
    	var intersects = raycaster.intersectObjects( PIEscene.children );
    	if(intersects.length>0){
		var obj = intersects[0].object;
		var name="None",distance="None",time="None";
		if(obj === mercury){name ="Mercury"; distance="0.39 AU"; time="88 days";}
		else if(obj === venus){name ="Venus"; distance="0.723 AU"; time="225 days";}
		else if(obj === earth){name ="Earth"; distance="1 AU"; time="365 days";}
		else if(obj === mars){name ="Mars"; distance="1.524 AU"; time="687 days";}
		else if(obj === jupiter){name ="Jupiter"; distance="5.203 AU"; time="12 years";}
		else if(obj === saturn){name ="Saturn"; distance="9.6 AU"; time="29 years";}
		else if(obj === uranus){name ="Uranus"; distance="19.18 AU"; time="84 years";}
		else if(obj === neptune){name ="Neptune"; distance="30.06 AU"; time="165 years";}
		else
			console.log("obj problem")

		displayPlanet(name,distance,time);
	}
	
}
function displayPlanet(name,distance,time){
	PIEchangeDisplayText("Name",name);
	PIEchangeDisplayText("Distance from Sun",distance)
	PIEchangeDisplayText("Orbital time",time)
}


function loadExperimentElements(){
	//control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	//control.addEventListener('change',PIErender);
	PIEsetExperimentTitle("Solar System");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    	initialiseHelp();
    	initialiseInfo();

	PIEscene.background = new THREE.TextureLoader().load('images/galaxy.jpg');
	initialise();
	makeEarth();
	makeSun();
	makeMercury();
	makeVenus();
	makeMars();
	makeJupiter();
	makeSaturn();
	makeUranus();
	makeNeptune();

	PIEaddDualCommand("Zoom in", zoomIn)
	PIEaddDualCommand("Zoom out",zoomOut)
	PIEaddDisplayText("Name","None");
	PIEaddDisplayText("Distance from Sun","None")
	PIEaddDisplayText("Orbital time","None")

	WindowResize(PIErenderer,PIEcamera);
	//window.addEventListener( 'resize', PIEresize, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );   



}

function resetExperiment(){

	initialise();

}
function updateExperimentElements(t,dt){
	 
	t=t/800;
	//dt=dt/1000;
	
	mercury.position.x = mercuryOrbitX*Math.sin(mercurySpeed*t);
	mercury.position.y = mercuryOrbitY*Math.cos(mercurySpeed*t);
	
	venus.position.x = venusOrbitX*Math.sin(venusSpeed*t);
	venus.position.y = -venusOrbitY*Math.cos(venusSpeed*t);
	
	earth.position.x = earthOrbitX*Math.sin(earthSpeed*t);
	earth.position.y = -earthOrbitY*Math.cos(earthSpeed*t);
	
	mars.position.x = marsOrbitX*Math.sin(marsSpeed*t);
	mars.position.y = -marsOrbitY*Math.cos(marsSpeed*t);
	
	
	jupiter.position.x = jupiterOrbitX*Math.sin(t*jupiterSpeed);
	jupiter.position.y = -jupiterOrbitY*Math.cos(t*jupiterSpeed);
	
	saturn.position.x = saturnOrbitX*Math.sin(saturnSpeed*t);
	saturn.position.y = -saturnOrbitY*Math.cos(saturnSpeed*t);
	
	uranus.position.x = uranusOrbitX*Math.sin(uranusSpeed*t);
	uranus.position.y = -uranusOrbitY*Math.cos(uranusSpeed*t);
	
	neptune.position.x = neptuneOrbitX*Math.sin(neptuneSpeed*t);
	neptune.position.y = -neptuneOrbitY*Math.cos(neptuneSpeed*t);
	
}


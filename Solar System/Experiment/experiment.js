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

var saturnRing;

var uranusRing;

var asteroidBeltRadius;

var planets=[];
var planetRadius;
var planetsOrbitX;
var planetsOrbitY;
var planetsSpeed;
var textures;

function initialise(){
	
	sunRadius  = 5
	var mercuryRadius = 7.48683936 
	var venusRadius = 10.65434832 
	var earthRadius = 12.901896 
	var marsRadius = 13.340944
	var jupiterRadius = 29.256 
	var saturnRadius= 25.811 
	var uranusRadius = 19.6524 
	var neptuneRadius = 18.8892 
	var mercuryOrbitX = 15.89566038 
	var mercuryOrbitY = 4.949753223
	var venusOrbitX =44.62509754
	var venusOrbitY = 13.46681671
	
	var earthOrbitX=80.5703978 
	var earthOrbitY=24.26010231 
	var marsOrbitX=146.198472 
	var marsOrbitY=40.20263178
	var jupiterOrbitX= 204.338691
	var jupiterOrbitY=57.83318778
	var saturnOrbitX=285.662421
	var saturnOrbitY=80.97594694
	var uranusOrbitX= 389.698886 
	var uranusOrbitY=108.438 
	var neptuneOrbitX=486.3801096 
	var neptuneOrbitY=146.5185883 
	
	var height = 200
	var width = 600
	PIEsetAreaOfInterest(-(width),height,width,-(height));
	PIEadjustCamera(0,0,1000);
	PIEcameraZ = 1000;

	var mercurySpeed = 0.002
	var venusSpeed = 0.0008
	var earthSpeed = 0.0004
	var marsSpeed = 0.00025
	var jupiterSpeed = 0.0001
	var saturnSpeed = 0.00005
	var uranusSpeed = 0.00003
	var neptuneSpeed = 0.00002

	var texMerc =  new THREE.TextureLoader().load('images/mercurymap.jpg');
	var texVenus= new THREE.TextureLoader().load('images/venusmap.jpg');
	var texEarth = new THREE.TextureLoader().load('images/earth.jpg') ;
	var texMars = new THREE.TextureLoader().load('images/marsmap1k.jpg')
	var texJupiter= new THREE.TextureLoader().load('images/jupitermap.jpg')
	var texSaturn= new THREE.TextureLoader().load('images/saturnmap.jpg')
	var texUranus= new THREE.TextureLoader().load('images/uranusmap.jpg')
	var texNeptune= new THREE.TextureLoader().load('images/neptunemap.jpg')

	planetRadius=[mercuryRadius,venusRadius,earthRadius,marsRadius,jupiterRadius,saturnRadius,uranusRadius,neptuneRadius];
	planetsOrbitX=[mercuryOrbitX,venusOrbitX,earthOrbitX,marsOrbitX,jupiterOrbitX,saturnOrbitX,uranusOrbitX,neptuneOrbitX];
	planetsOrbitY=[mercuryOrbitY,venusOrbitY,earthOrbitY,marsOrbitY,jupiterOrbitY,saturnOrbitY,uranusOrbitY,neptuneOrbitY];
	planetsSpeed=[mercurySpeed,venusSpeed,earthSpeed,marsSpeed,jupiterSpeed,saturnSpeed,uranusSpeed,neptuneSpeed];
	textures = [texMerc,texVenus,texEarth,texMars,texJupiter,texSaturn,texUranus,texNeptune];

	asteroidBeltRadius=156;
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
console.log("ellipse");
}

function makeSun(){
	var sphere = new THREE.SphereBufferGeometry(sunRadius,15,15);
	var material = new THREE.MeshBasicMaterial( {map:  new THREE.TextureLoader().load('images/sun.jpg') } );	
	sun = new THREE.Mesh(sphere,material);
	sun.position.set(0,0,0);
	PIEaddElement(sun);
}

function func(){

}

function makePlanets(){
	var i;
	for(i=0;i<8;i++){
		MakeOrbit(planetsOrbitX[i],planetsOrbitY[i]);
		var sphere = new THREE.SphereBufferGeometry(planetRadius[i],15,15);
		var material = new THREE.MeshBasicMaterial( {map:  textures[i] } );
		planets[i] = new THREE.Mesh(sphere,material);
		planets[i].rotation.set(0, 0.4101, 0);
		planets[i].position.set(planetsOrbitX[i],0,0);
		PIEaddElement(planets[i]);
		PIEdragElement(planets[i]);
    		PIEsetDrag(planets[i], func);
	}
	var texture2	= new THREE.TextureLoader().load('images/uranusringcolour.jpg')
	uranusRing = makeRing(planetRadius[6]+2,planetRadius[6]+7,texture2);
	uranusRing.position.set(planetsOrbitX[6],0,0);
	uranusRing.rotation.set(Math.PI/2-0.2,0,0);
	PIEaddElement(uranusRing);

	texture2 = new THREE.TextureLoader().load('images/saturnringcolor.jpg')
	saturnRing = makeRing(planetRadius[5]+2,planetRadius[5]+8,texture2);
	saturnRing.position.set(planetsOrbitX[5],0,0);
	saturnRing.rotation.set(Math.PI/2-0.2,0,0);
	PIEaddElement(saturnRing);
}

function makeRing(innerRadius,outerRadius,texture){
	var geometry = new THREE.RingGeometry(innerRadius, outerRadius, 30000);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var ring = new THREE.Mesh(geometry, material);
	return ring;
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
var raycaster=new THREE.Raycaster();
var intersects; 
function onMouseDown(event){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, PIEcamera );	
    	intersects = raycaster.intersectObjects( PIEscene.children );
		var name="None",distance="None",time="None";
    		if(intersects.length>0){
			var obj1 = intersects[0].object;
			var i,p=-1;
			for(i=0;i<8 && p==-1;i++){
				if(obj1==planets[i])
					p=i;     }
			switch(p){
				case 0: {name ="Mercury"; distance="0.39 AU"; time="88 days";}
					break;
				case 1: {name ="Venus"; distance="0.723 AU"; time="225 days";}
					break;	
				case 2: {name ="Earth"; distance="1 AU"; time="365 days";}
					break;	
				case 3: {name ="Mars"; distance="1.524 AU"; time="687 days";}
					break;
				case 4: {name ="Jupiter"; distance="5.203 AU"; time="12 years";}
					break;
				case 5: {name ="Saturn"; distance="9.6 AU"; time="29 years";}
					break;
				case 6: {name ="Uranus"; distance="19.18 AU"; time="84 years";}
					break;
				case 7: {name ="Neptune"; distance="30.06 AU"; time="165 years";}	
			}
			
			console.log("click and show");
		}
		displayPlanet(name,distance,time);
		inputPlanet(name,distance,time);	

}

function displayPlanet(name,distance,time){
	PIEchangeDisplayText("Name",name);
	PIEchangeDisplayText("Distance from Sun",distance)
	PIEchangeDisplayText("Orbital time",time)
}

function inputPlanet(name,distance,time){
	PIEchangeInputText("Name",name);
	PIEchangeInputText("Distance from Sun",distance)
	PIEchangeInputText("Orbital time",time)
}

function Windowresize(){
	PIEresize();
	PIEadjustCamera(0,0,1000);
	PIEadjustDisplayScene();
}

var hack;
function loadExperimentElements(){
	//control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	//control.addEventListener('change',PIErender);
	PIEsetExperimentTitle("Solar System");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    	initialiseHelp();
    	initialiseInfo();

	PIEscene.background = new THREE.TextureLoader().load('images/galaxy.png');
	initialise();
	makeSun();
	makePlanets();

	PIEaddDualCommand("Zoom in", zoomIn)
	PIEaddDualCommand("Zoom out",zoomOut)
	PIEaddDisplayText("Name","None");
	PIEaddDisplayText("Distance from Sun","None")
	PIEaddDisplayText("Orbital time","None")

	PIEaddInputText("Name","None");
	PIEaddInputText("Distance from Sun","None")
	PIEaddInputText("Orbital time","None")
	PIEadjustCamera(0,0,1000);

	PIEresetExperiment(); hack=0;
	PIEstartAnimation();

	window.addEventListener('resize', Windowresize, false);	
	window.addEventListener( 'mousedown', onMouseDown, false );		
}

function resetExperiment(){
	initialise();
	var i;
	for(i=0;i<8;i++){
		planets[i].position.set(planetsOrbitX[i],0,0);
	}
	uranusRing.position.set(planetsOrbitX[6],0,0);
	saturnRing.position.set(planetsOrbitX[5],0,0);
	PIEchangeInputText("Name","None");
	PIEchangeInputText("Distance from Sun","None")
	PIEchangeInputText("Orbital time","None")
	PIEchangeDisplayText("Name","None");
	PIEchangeDisplayText("Distance from Sun","None")
	PIEchangeDisplayText("Orbital time","None")
}

function updateExperimentElements(t,dt){
	if(hack<7){
		hack++;
		if(hack==7)
		PIEstopAnimation();
	}
	else
	{
		var i;
		for(i=0;i<8;i++){
			planets[i].position.x = planetsOrbitX[i]*Math.cos(planetsSpeed[i]*t);
			planets[i].position.y = planetsOrbitY[i]*Math.sin(planetsSpeed[i]*t);	
		}	
		saturnRing.position.x = planetsOrbitX[5]*Math.cos(planetsSpeed[5]*t);
		saturnRing.position.y = planetsOrbitY[5]*Math.sin(planetsSpeed[5]*t);		
		uranusRing.position.x = planetsOrbitX[6]*Math.cos(planetsSpeed[6]*t);
		uranusRing.position.y = planetsOrbitY[6]*Math.sin(planetsSpeed[6]*t);
	}
}


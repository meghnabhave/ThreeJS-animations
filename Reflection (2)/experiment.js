
/*Ball Variables*/
var ball;             /* Ball Object */
var myBallRadius;       /* Radius */
var ballX;            /* X Position */
var ballY;            /* Y Position */
var ballZ;            /* Z Position for placing ball */

/*Image Variables*/
var ballImage;             /* Image Object */
var myImageRadius;       /* Radius */
var ballImageX;            /* X Position */
var ballImageY;            /* Y Position */
var ballImageZ;            /* Z Position for placing Image */

/*Mirror Variables*/
var mirror;			/*Mirror Object*/

/*Incident ray*/
var IRay;
var first;
var second;

/*Normal*/
var normal;


/*Reflected*/
var RRay;

var control;
var line;
var v;

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Reflection of Light experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a ball and its image separated by a plane mirror.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    //helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the incident ray on plane mirror.</li>";
    //helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
    //helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
    //helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
    helpContent = helpContent + "</ul>";
    //helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the normal and the reflected ray will be drawn, along with the extended ray to the image.</p>";
    //helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
    //helpContent = helpContent + "<ul>";
    //helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
    //helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
    //helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
    //helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
    //helpContent = helpContent + "</ul>";
    //helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
    //helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    //helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<p>You can go back to the setup stage by pressing the reset button.</p>";
	//helpContent = helpContent + "<h3>The drag and drop</h3>";
    helpContent = helpContent + "<p>You can give new incident ray coordinates using the slider. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Reflection of Light by Plane Mirror experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows a ball and its image separated by a plane mirror.</p>";
    infoContent = infoContent + "<h3>Reflection</h3>";
    infoContent = infoContent + "<p>When an object is kept in front of a plane mirror, rays incident on the mirror from the object get reflected by the plane mirror.</p>";
    infoContent = infoContent + "<p>At the point of incidence, we can define a normal, which lies in the same plane as the incident ray and is perpendicular to the plane mirror.</p>";
    infoContent = infoContent + "<p>The angle of incidence is the angle between the incident ray and the normal.</p>";
    infoContent = infoContent + "<p>The angle of incidence is equal to the angle of reflection. The angle of reflection is the angle between the reflected ray and the normal.</p>";
    infoContent = infoContent + "<p>To the normall eye, when the reflected rays enter the eye, the reflected ray seems to come from behind the mirror.</p>";
    //infoContent = infoContent + "<h3></h3>";
    infoContent = infoContent + "<p>Thus, if we extend the reflected ray behind the mirror, it will seem to originate from the image of the object.</p>";
    infoContent = infoContent + "<p>The exact position of the image is found out when two such reflected rays intersect.</p>";
    //infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
    //infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
    //infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
    //infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
    //infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
    //infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialise(){
	ballX=-4;
	ballY=0;
	ballZ=0;
	myBallRadius = 0.4;
	myImageRadius = myBallRadius;
	ballImageX= -ballX;
	ballImageY= ballY;
	ballImageZ= ballZ;
}

function init(){
	
	PIEscene.background = new THREE.Color(0xffffff);
	
	PIEcamera.position.set(0,0,50);
	
	control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	control.addEventListener('change',PIErender);
	PIErenderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(PIErenderer.domElement);
	
	ball = makeBall(myBallRadius);
	ball.position.set(ballX,ballY,ballZ);
	PIEscene.add(ball);
	
	ballImage = makeBall(myBallRadius);
	
	ballImage.position.set(ballImageX,ballImageY,ballImageZ);
	PIEscene.add(ballImage);
	
	mirror = makeMirror();
	
	
	
}

 /*function onMouseMove(evt) {
        if(PIErenderer) {
       
 				 var x = ( event.clientX / window.innerWidth ) * 2 - 1;
  				var y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
            var vNow = new THREE.Vector3(x, y, 0);

          vNow.unproject(PIEcamera);
        	splineArray.push(vNow);
            
        }
    }
  function onMouseUp(evt) {
          document.removeEventListener("mousemove",onMouseMove,false);
 }

function onMouseDown(evt) {
               
    if(evt.which == 3) return;
    

    var x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	var y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        // do not register if right mouse button is pressed.
        
        vNow = new THREE.Vector3(x, y, 0);
       vNow.unproject(PIEcamera);
      console.log(vNow.x + " " + vNow.y+  " " + vNow.z); 
      splineArray.push(vNow);
        
       	document.addEventListener("mousemove",onMouseMove,false);
        document.addEventListener("mouseup",onMouseUp,false);
}
	
// update positions
function updatePositions() {

	var positions = line.geometry.attributes.position.array;

	var index = 0;
  
		for ( var i = 0; i < splineArray.length;  i ++ ) {

		positions[ index ++ ] = splineArray[i].x;
		positions[ index ++ ] = splineArray[i].y;
		positions[ index ++ ] = splineArray[i].z;


		}
}


function doSomething(){
	var geometry = new THREE.BufferGeometry();

	// attributes
	var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

	// drawcalls
	drawCount = 2; // draw the first 2 points, only
	geometry.setDrawRange( 0, drawCount );

	// material
	var material = new THREE.LineBasicMaterial( { color: 0xff4500, linewidth: 2 } );

	// line
	line = new THREE.Line( geometry,  material );
	PIEscene.add( line );

	// update positions
	updatePositions();
    
        document.addEventListener('mousedown', onMouseDown, false);
}*/
function drawPA(){
	
	first = new THREE.Vector3(-window.innerWidth,ballY,ballZ);
	second = new THREE.Vector3(+window.innerWidth,ballY,ballZ);
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0x000000});
	geometry.vertices.push(first);
	geometry.vertices.push(second);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
	
	
}

function drawIncidentRay(){
	
	//doSomething();
	first = new THREE.Vector3(ballX,ballY,ballZ);
	second = new THREE.Vector3(0.0,v,ballZ);
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xff7800});
	geometry.vertices.push(first);
	geometry.vertices.push(second);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
	console.log("Inci: "+v+" value v");
	
}

function drawNormal(){
	var f = second;
	var s = new THREE.Vector3(f.x+ballX,f.y,f.z);
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xee7800});
	geometry.vertices.push(f);
	geometry.vertices.push(s);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
}

function drawReflected(){
	var f = second;
	var s = new THREE.Vector3(ballX,ballY,ballZ);
	
	if(v>=0)
	s.y = s.y + 2*(Math.abs(f.y - ballY)) ;
	else
	s.y = s.y - 2*(Math.abs(f.y - ballY)) ;
	
	
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0x778800});
	geometry.vertices.push(f);
	geometry.vertices.push(s);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);	
}

function drawExtended(){
	
	var f2 = new THREE.Vector3(ballImageX,ballImageY,ballImageZ);
	var s2 = second;
	var geometry2 = new THREE.Geometry();
	var material2 = new THREE.LineDashedMaterial({color: 0x000000 , dashSize: 1, gapSize: 0.5});
	geometry2.vertices.push(f2);
	geometry2.vertices.push(s2);
	var line2 = new THREE.Line(geometry2,material2,THREE.LineSegments);
	PIEscene.add(line2);
}

function makeBall(BallRadius){
	var sphere = new THREE.SphereBufferGeometry(BallRadius,32,32);
	var material = new THREE.MeshLambertMaterial({color: 0xff0000});
	var ball = new THREE.Mesh(sphere,material);
	
	return ball;
}

function makePlane(){
	var size = 14, step=1;
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 'black'});
	
	for(var i = -size; i<=size ; i+=step){
		geometry.vertices.push(new THREE.Vector3(-size,-0.4,i));
		geometry.vertices.push(new THREE.Vector3(size,-0.4,i));
		geometry.vertices.push(new THREE.Vector3(i,-0.4,-size));
		geometry.vertices.push(new THREE.Vector3(i,-0.4,size));
	}
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
}

function makeMirror(){
	var size = 14, step=1;
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xa9a9a9});
	
	for(var i = -size; i<=size ; i+=step){
		geometry.vertices.push(new THREE.Vector3(0,-size,i));
		geometry.vertices.push(new THREE.Vector3(0,size,i));
		geometry.vertices.push(new THREE.Vector3(0,i,-size));
		geometry.vertices.push(new THREE.Vector3(0,i,size));
	}
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
}
function handleY(newValue)
{
    v = newValue;
    //vNow.position.set(0.0, v, ballZ);
    PIErender();
	console.log(v+" value v");
}

function initialiseControlVariables()
{
    /* Labels */
    PosY="Y";                  /* Y Position Slider Label */
    /* Default (initial) Values */

    Ydefault=0.0;        /* Y Position Slider Default Value */
    /* Slider Limits */
    Ymin=-90; /* Y Position Slider Minimum Value */
    Ymax=+90;    /* Y Position Slider Maximum Value */
    /* Slider Steps */
    Ystep=0.1;                  /* Y Position Slider Step */

}

function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(PosY, Ydefault, handleY, Ymin, Ymax, Ystep);

}


function loadExperimentElements(){
	
	PIEsetExperimentTitle("Reflection");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
	
	initialise();
	init();
	
	initialiseControlVariables();
	initialiseControls();
	resetExperiment();
	drawIncidentRay();
	drawPA();
}

function resetExperiment(){
	
	
	initialise();
	initialiseControlVariables();
}

function updateExperimentElements(t,dt){
	
	
	drawIncidentRay();
	drawNormal();
	drawReflected();
	drawExtended();
	
	PIEanimate();
	control.update();
}
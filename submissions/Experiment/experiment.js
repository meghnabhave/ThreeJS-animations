
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
var count;
var mouse;
var down;
var flag;
var positions;
var positionsR;
var lineR;
var x;
var countR;
var mouseR ;
var downR ;

// update line
function updateLine() {
	
  positions[count * 3 - 3] = mouse.x;
  positions[count * 3 - 2] = mouse.y;
  positions[count * 3 - 1] = mouse.z;
  line.geometry.attributes.position.needsUpdate = true;
}

// mouse move handler
function onMouseMove(event) {
	
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouse.z = ballZ;
  if( down%2 !== 0){
  	updateLine();
  }
}

// add point
function addPoint(){
	
	ballZ = ballZ;
  console.log("point nr " + count + ": " + mouse.x + " " + mouse.y + " " + ballZ);
  positions[count * 3 + 0] = mouse.x;
  positions[count * 3 + 1] = mouse.y;
  positions[count * 3 + 2] = ballZ;
  count++;
  line.geometry.setDrawRange(0, count);
  if(down%2 !== 0)
  updateLine();
}

// mouse down handler
function onMouseDown(evt) {
  // on first click add an extra point
  if( down%2 === 0 ){
	  mouse.x = ballX;
	  mouse.y = ballY;
      addPoint();
      addPoint();
	  
  }
  else{ 
	second = new THREE.Vector3(mouse.x,mouse.y,ballZ);
	
	console.log("sec = "+second.x+" "+second.y+" "+second.z);
  	
  }
  down++;

}
function incidence(){
	var geometry = new THREE.BufferGeometry();
  var MAX_POINTS = 500;
  positions = new Float32Array(MAX_POINTS * 3);
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

  // material
  var material = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  });

  // line
  line = new THREE.Line(geometry, material);
  PIEscene.add(line);

  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener('mousedown', onMouseDown, false);
}

var helpContent;
function initialiseHelp(){
    helpContent="";
    helpContent = helpContent + "<h2>Reflection of Light experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a ball and its image separated by a plane mirror.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>On pressing start, you will find an incident ray coming from the ball object, which you can control.</p>";
    //helpContent = helpContent + "<h3>The setup stage</h3>";
    //helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
    //helpContent = helpContent + "<p>You can control the following:</p>";
    //helpContent = helpContent + "<ul>";
    //helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
    //helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the incident ray on plane mirror.</li>";
    //helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
    //helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
    //helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
    //helpContent = helpContent + "</ul>";
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
    helpContent = helpContent + "<p>Once the reflected and normal are drawn, you will again have an incident ray you can control after clicking once. To exit the animation, press the reset button.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo(){
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

function onWindowResize() {

				PIEcamera.aspect = window.innerWidth / window.innerHeight;
				PIEcamera.updateProjectionMatrix();
				PIErenderer.setSize( window.innerWidth, window.innerHeight );

			}

function initialise(){
	ballX= -0.4;
	ballY=0;
	ballZ=0;
	myBallRadius = 0.04;
	myImageRadius = myBallRadius;
	ballImageX= -ballX;
	ballImageY= ballY;
	ballImageZ= ballZ;
	first = new THREE.Vector3(ballX,ballY,ballZ);
    second = new THREE.Vector3(ballX,ballY,ballZ);
	count = 0;
	mouse = new THREE.Vector3(ballX,ballY,ballZ);
	down = 0;
	x;
	countR = 0;
	mouseR = new THREE.Vector3();
``	 downR = 0;
	//mirrorNormal = new THREE.Vector3(0,0,50);
}

function init(){
	
	PIEscene.background = new THREE.Color(0xffffff);	
	PIEcamera.position.set(0,0,2);	
	control = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	control.addEventListener('change',PIErender);
	PIErenderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(PIErenderer.domElement);
	window.addEventListener( 'resize', onWindowResize, false );	
	ball = makeBall(myBallRadius);
	ball.position.set(ballX,ballY,ballZ);
	PIEscene.add(ball);	
	ballImage = makeBall(myBallRadius);	
	ballImage.position.set(ballImageX,ballImageY,ballImageZ);
	PIEscene.add(ballImage);	
	mirror = makeMirror();	
}


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

function drawInciFull(){
	
	
	{
	second.z = ballZ;
	var slope = (second.y - ballY)/(second.x-ballX);
	slope = slope * second.x;
	slope = second.y - slope;
	
	var f = new THREE.Vector3(second.x,second.y,second.z);
	var s = new THREE.Vector3(0.0,slope,second.z);
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xff0000});
	geometry.vertices.push(f);
	geometry.vertices.push(s);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
	second.x = 0.0;
	second.y = slope;
	
	console.log("slope: "+slope);
	}
	//console.log("test" + test.x);
}

function drawNormal(){
	
	
	if(second.x >= 0){
	var f = new THREE.Vector3(second.x,second.y,second.z);
	var s = new THREE.Vector3(f.x+ballX,f.y,f.z);
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xee7800});
	geometry.vertices.push(f);
	geometry.vertices.push(s);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);
	}
}
var x;
var countR = 0;
var mouseR = new THREE.Vector3();
var downR = 0;
// mouse move handler
function onMouseMoveR(event) {
  mouseR.x =(event.clientX / window.innerWidth) * 2 - 1; 
  mouseR.y = -(event.clientY / window.innerHeight) * 2 + 1;
   //((mouseR.y - second.y)*ballX)/(second.y);
  mouseR.z = ballZ;
  //mouseR.unproject(PIEcamera);
  if( downR === 1 ){
  	updateLineR();
  }
}


// update line
function updateLineR() {
  positionsR[countR * 3 - 3] = x;
  positionsR[countR * 3 - 2] = mouseR.y;
  positionsR[countR * 3 - 1] = ballZ;
  lineR.geometry.attributes.position.needsUpdate = true;
}

// add point
function addPointR(event){
  console.log("point nrR " + countR + ": " + mouseR.x + " " + mouseR.y + " " + mouseR.z);
  positionsR[countR * 3 + 1] = mouseR.y;
  x = ((mouseR.y - second.y)*ballX)/(second.y);
  console.log("x= "+x + "y= "+mouseR.y);
  positionsR[countR * 3 + 0] = x;
  positionsR[countR * 3 + 2] = ballZ;
  countR++;
  lineR.geometry.setDrawRange(0, countR);
  
  if(downR === 1)
  updateLineR();
}

// mouse down handler
function onMouseDownR(event) {
  // on first click add an extra point
  if( downR === 0 ){
	  mouseR.set(second.x,second.y,second.z);
      addPointR();
	  //mouseR.set(second.x,second.y,second.z);
	  addPointR();
  }
  else if(downR === 1)
	  addPointR(); 
  downR++;
}

function drawReflected(){
	mouseR.set(second.x,second.y,second.z);
	downR=0;
	//flag=0;
	var geometry = new THREE.BufferGeometry();
  var MAX_POINTS = 500;
  positionsR = new Float32Array(MAX_POINTS * 3);
  geometry.addAttribute('positionR', new THREE.BufferAttribute(positionsR, 3));

  // material
  var material = new THREE.LineBasicMaterial({
    color: 0x008000,
    linewidth: 2
  });

  // line
  lineR = new THREE.Line(geometry, material);
  PIEscene.add(lineR);

  
  document.addEventListener('mousedown', onMouseDownR, false);
	document.addEventListener("mousemove", onMouseMoveR, false);
}

/*function drawReflected(){
	var f = second;
	var s = new THREE.Vector3(ballX,ballY,ballZ);
	
	if(second.y>=0)
	s.y = s.y + 2*(Math.abs(f.y - ballY)) ;
	else
	s.y = s.y - 2*(Math.abs(f.y - ballY)) ;
	
	
	if(second.x>=0){
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0x778800});
	geometry.vertices.push(f);
	geometry.vertices.push(s);
	var line = new THREE.Line(geometry,material,THREE.LineSegments);
	PIEscene.add(line);	
	}
}*/

function drawExtended(){
	
	if(second.x >= 0){
	var f2 = new THREE.Vector3(ballImageX,ballImageY,ballImageZ);
	var s2 = second;
	var geometry2 = new THREE.Geometry();
	var material2 = new THREE.LineDashedMaterial({color: 0x000000 , dashSize: 1, gapSize: 0.5});
	geometry2.vertices.push(f2);
	geometry2.vertices.push(s2);
	var line2 = new THREE.Line(geometry2,material2,THREE.LineSegments);
	PIEscene.add(line2);
	}
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

function loadExperimentElements(){
	
	PIEsetExperimentTitle("Reflection");
	PIEsetDeveloperName("Meghna Bhave");
	/* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
	
	initialise();
	init();
	
	resetExperiment();
	
	incidence();
	//drawInciFull();
	
	
	
	drawPA();
}

function resetExperiment(){
	
	initialise();	
	PIEcamera.position.set(0,0,2);	
	//init();
}

function updateExperimentElements(t,dt){
	
	drawReflected();
	drawNormal();
	drawExtended();
	control.update();
	//console.log("update");
}
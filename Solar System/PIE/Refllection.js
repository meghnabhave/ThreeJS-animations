

/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/*Ball Variables*/
var myBall;             /* Ball Object */
var myBallRadius;       /* Radius */
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallZ;            /* Z Position for placing ball */

/*Image Variables*/
var myImage;             /* Image Object */
var myImageRadius;       /* Radius */
var myImageX;            /* X Position */
var myImageY;            /* Y Position */
var myImageZ;            /* Z Position for placing Image */

/*Mirror Variables*/
var myMirror;			/*Mirror Object*/
var myMirrorX;			/*X position */
var myMirrorY;			/*Y position*/
var myMirrorZ;			/*Z position*/
var myMirrorSX;			/*Size dimension along X axis*/
var myMirrorSY;			/*Size dimension along Y axis*/
var myMirrorSZ;			/*Size dimension along Z axis*/
var myMirrorMaterial;	/*Material*/
var distanceFromObject;

/**/




/*Interaction Functions*/

function myBallDrag(element, newpos)
{
	
	distanceFromObject = 2.0 - newpos.x - myBallRadius;
    myBallX = newpos.x;
    if (newpos.x < (leftB + myBallRadius)) 
	{ myBallX = (leftB + myBallRadius) }
    else if (newpos.x > (rightB - myBallRadius)) 
	{ myBallX = (rightB - myBallRadius) }
    myBallY = newpos.y;
    if (newpos.y < (bottomB + myBallRadius)) 
	{ myBallY = (bottomB + myBallRadius); }
    else if (newpos.y > (topB - myBallRadius)) 
	{ myBallY = (topB  - myBallRadius); }
    myBallZ = newpos.z;
	
	myImageZ=myBallZ
	myImageX=2.0 + distanceFromObject;
	myImageY=myBallY;
	
	myMirrorX= 2.0;
	myMirrorY= 1.5;
	myMirrorZ = -2.0;
	

    myBall.position.set(myBallX, myBallY, myBallZ);
	myImage.position.set(myImageX, myImageY, myImageZ);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);
	
	console.log("myBallDrag");
}

//to drag incident ray to be done.

/*GUI Control Objects Code*/

var PosX;           /* X Position Slider Label */
var PosY;           /* Y Position Slider Label */
var Xdefault;       /* X Position Slider Default Value */
var Ydefault;       /* Y Position Slider Default Value */
var Xmin;           /* X Position Slider Minimum Value */
var Xmax;           /* X Position Slider Maximum Value */
var Ymin;           /* Y Position Slider Minimum Value */
var Ymax;           /* Y Position Slider Maximum Value */
var Xstep;          /* X Position Slider Step */
var Ystep;          /* Y Position Slider Step */

/*Slider Change functions*/

function handleX(newValue)
{
    myBallX = newValue;
	myImageX = 0.8+newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
	myImage.position.set(myImageX, myImageY, myImageZ);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);
    PIErender();
	console.log("handleX");
}

function handleY(newValue)
{
    myBallY = newValue;
	myImageY = newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
	myImage.position.set(myImageX, myImageY, myImageZ);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);
    PIErender();
	console.log("handleY");
}

function initialiseControlVariables()
{
    /* Labels */
    PosX="X";                  /* X Position Slider Label */
    PosY="Y";                  /* Y Position Slider Label */

    /* Default (initial) Values */
    Xdefault=myCenterX;        /* X Position Slider Default Value */
    Ydefault=myCenterY;        /* Y Position Slider Default Value */

    /* Slider Limits */
    Xmin=leftB+myBallRadius;   /* X Position Slider Minimum Value */
    Xmax=rightB-myBallRadius;  /* X Position Slider Maximum Value */
    Ymin=bottomB+myBallRadius; /* Y Position Slider Minimum Value */
    Ymax=topB-myBallRadius;    /* Y Position Slider Maximum Value */

    /* Slider Steps */
    Xstep=0.1;                 /* X Position Slider Step */
    Ystep=0.1;                  /* Y Position Slider Step */
	console.log("initialiseControoVariables");
	
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(PosX, Xdefault, handleX, Xmin, Xmax, Xstep);
    PIEaddInputSlider(PosY, Ydefault, handleY, Ymin, Ymax, Ystep);
    /* Create Display Panel */
    PIEaddDisplayText(PosX, Xdefault);
    PIEaddDisplayText(PosY, Ydefault);
	
	console.log("initialiseControls");
}




/*Experiment code*/


function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myBallZ    = -2.0;
	myImageZ   = -2.0;
	myMirrorX= 2.0;
	myMirrorY= 1.5;
	myMirrorZ = -2.0;
	
	PIEscene.background({color: 0xffffff});
	
	console.log("initialiseScene");
	
}
function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;

	myMirrorSY = 20.0;
	myMirrorSX = 40.0;
	myMirrorSZ = 40.0;
	/*initialise Image variables*/
	myImageRadius = myBallRadius;


    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
	
	console.log("initialiseOtherVariables");
}

function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Reflection");
    PIEsetDeveloperName("Meghna Bhave");
    PIEhideControlElement();

    /* initialise help and info content */
    //initialiseHelp();
    //initialiseInfo();
	
    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
	
	geometry = new THREE.BoxBufferGeometry(myMirrorSX,myMirrorSY,myMirrorSZ);
	material = new THREE.MeshLambertMaterial({color: 0xff0000});
	myMirror = new THREE.Mesh(geometry,material);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);
	myMirror.castShadow = true;
    myMirror.receiveShadow = true;
	PIEaddElement(myMirror);
	console.log("mirror exists");


    /* Create Ball and add it to scene */
    myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xedefedf}));
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
    
	/* Allow Dragging of the ball */
    PIEdragElement(myBall);
    PIEsetDrag(myBall, myBallDrag);
	
	

    /* Instantiate experiment controls */
    initialiseControls();

    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
	
	PIEanimate();
	
	console.log("loadExperimentElements");
	
	
}

function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();
	
	/*initialiseMirrorVariables*/
	myMirrorX = myCenterX;
	myMirrorY = myCenterY;

    /* Initialise Ball variables */
    myBallX      = myMirrorX -10 ;
    myBallY      = myMirrorY;
	
	/*Initialise Image Variables*/
	myImageX = myMirrorX + 10;
	myImageY = myMirrorY;

    /* Reset Ball position */
    myBall.position.set(myBallX, myBallY, myBallZ);
	myImage.position.set(myImageX,myImageY,myImageZ);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);
	
	console.log("resetExperiment");

    
}

function updateExperimentElements(t, dt)
{
var newX;           /* new X position of ball */
var newY;           /* new Y position of ball */
var changeX;        /* X boundary hit */
var changeY;        /* Y boundary hit */
var boundaryT;      /* Boundary Event Time */
var tempT;          /* Temporary time */

    /* Load Ball coordinates */
    myBallX = myBall.position.x + 0.1;
    myBallY = myBall.position.y + 0.1;
    myBallZ = myBall.position.z;
	
	distanceFromObject = 2.0 - myBall.position.x - myBallRadius;
	myImageZ=myBallZ
	myImageX=2.0 + distanceFromObject;
	myImageY=myBallY;
	
	myMirrorX = myMirror.position.x;
	myMirrorY = myMirror.position.y;
	myMirrorZ = myMirror.position.z;

    /* Intialise for boundary detection */
    changeX   = 1;
    changeY   = 1;
    boundaryT = dt / 1000.0;    /* convert to seconds */

    

    /* Set Ball position */
    myBall.position.set(myBallX, myBallY, myBallZ);
	myMirror.position.set(myMirrorX,myMirrorY,myMirrorZ);

    /* Adjust Simulation time in case boundary event has occured */
    boundaryT *= 1000;
    if (boundaryT < dt) { PIEadjustAnimationTime(dt - boundaryT); }

    /* Finally Update the Display Panel with new values */
    PIEchangeDisplayText(PosX, myBallX);
    PIEchangeDisplayText(PosY, myBallY);
	
	console.log("updateExperimentElements");

}
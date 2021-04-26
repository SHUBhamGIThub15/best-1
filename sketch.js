var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;

 var balloonPosition=database.ref('balloon/height')
balloonPosition.on("value",readPosition,showError)
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0)
    balloon.x =balloon.x-10
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(+10,0)
    balloon.x =balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
   balloon.y =balloon.y -10
   balloon.scale=balloon.scale-0.0060
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10)
    balloon.y =balloon.y +10
    balloon.scale=balloon.scale+0.0060
  }

  drawSprites();
  
}
function updatePosition(x,y){
  database.ref('balloon/position').set({
    x: balloon.x + x ,
    y: balloon.y + y
  })
}

function readPosition(data){
position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

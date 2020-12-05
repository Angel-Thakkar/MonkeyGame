var PLAY = 1
var END = 0
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var groundImage
var score
var survivalTime = 0

function preload(){
  
  
  monkey_running= loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 500)
  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(1000, 350, 800, 10)
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x)
  

 
  obstacleGroup = createGroup()
  foodGroup = createGroup()
}


function draw() {
  background("lightgreen")
  
    stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+survivalTime,200,50)

  
  if(gameState === PLAY){
    if(ground.x < 0){
    ground.x = ground.width/2
  }
  if(keyDown("space")){
    monkey.velocityY = -12
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
  
if(obstacleGroup.isTouching(monkey)){
  gameState = END
}
  
  food()
  obstacles()
  }
  
  if(gameState === END){
      ground.velocityX = 0;
      monkey.velocityY = 0
    
     obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
  }
  
    

  drawSprites()
}

function food(){
  if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07
    banana.velocityX = -3;
    banana.liftime = 400
    monkey.depth = banana.depth
    foodGroup.add(banana)
}
}

function obstacles() {
if(frameCount % 300 === 0) {
obstacle = createSprite(400,325,10,40);
  obstacle.velocityX = -3
obstacle.addImage("obstacle",obstacleImage)      
obstacle.scale = 0.1;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);
  }
}




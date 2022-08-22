var PLAY = 1;
var END = 0;
var gameState = PLAY;

var coelho, raposa;
var cenoura, tronco, cenouras, troncos;
var score;
var gameOver, gameOverIMG, restart, restartIMG;



function preload(){
  gameOverIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");
}

function setup() {
  createCanvas(1325, 695);
  
  coelho = createSprite(320, 695/2, 50, 40);
  coelho.shapeColor = "white";

  raposa = createSprite(100, coelho.y, 160, 120);
  raposa.shapeColor = "orange";

  gameOver = createSprite(width/2, height/2 - 120);
  gameOver.addImage(gameOverIMG);
  gameOver.visible = false;

  restart = createSprite(width/2, height/2)
  restart.addImage(restartIMG);
  restart.visible  = false;

  cenouras = new Group();
  troncos = new Group();
  
  score = 0;
  
  
}

function draw() {
  
  background("LIGHTGREEN");
  
  raposa.y  = coelho.y;

  if(gameState === PLAY){

    coelhoMoves();

    if(frameCount % 100 == 0){
      cenouraCriar();
    }
    troncoCriar();
    bateu();
  
    textSize(20);
    text("score: "+ score, 25, 25);

  }
  
  if(score === 25){
    gameState = END;
    coelho.y = 695/2;
  }

  if(gameState === END){
    cenouras.setVelocityXEach(0);
    troncos.setVelocityXEach(0);

    cenouras.destroyEach();
    troncos.destroyEach();
    
    gameOver.visible = true;
    restart.visible = true;

    textSize(50) 
    text("Parabéns por Vencer", 420 , 130)

    if(mousePressedOver(restart)){
      gameState = PLAY;
      score = 0 
      gameOver.visible = false;
      restart.visible = false;
      coelho.scale -2.5;
      coelho.x = 320
    }
  }
  
  drawSprites();
}

function coelhoMoves(){

  if(keyIsDown(UP_ARROW)||keyDown('w')){
    coelho.y -=10;
  }
  if(keyIsDown(DOWN_ARROW)||keyDown('s')){
    coelho.y +=10;
  } 
}

function cenouraCriar(){

  cenoura = createSprite(1400,random(50,650), 30, 30);
  cenoura.shapeColor = "orange";
  cenoura.velocityX = -10;
  cenoura.lifetime = 150;

  cenouras.add(cenoura);

}

function troncoCriar(){
  if (frameCount % 60 === 0){
    tronco = createSprite(1400,random(50, 650),40,100);
    tronco.shapeColor = "brown";
    tronco.velocityX = -6;
    tronco.lifetime = 250;

    troncos.add(tronco);

 }
}

function bateu(){

coelho.overlap(cenouras,function(collector, collected){
  collected.remove();
  coelho.scale += 0.1;
  score += 1;
})

coelho.overlap(troncos,function(collector, collected){
  collected.remove();
  coelho.scale -=0.1;
  coelho.x -= 5;
  score -= 1;
})
}


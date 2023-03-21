
var PLAY = 1;
var END = 2;
var gameState = PLAY;

quilometros = 0;

var SpawnGG, SpawnOG;
var GC, OC;
var PathImg, GameOverImg;
var Path;
var GreenCar, RedCar, OrangeCar;
var GreenImg, RedImg, OrangeImg;
var Barreira1, Barreira2;

var mensagemFinalImg;

function preload() {

  GreenImg = loadImage("GreenCar.png");
  RedImg = loadImage("RedCar.png");
  OrangeImg = loadImage("OrangeCar.png");

  GameOverImg = loadImage("GameOver.png");

  PathImg = loadImage("Path.png");

  mensagemFinalImg = loadImage("mensagemFinal.png");

}

function setup() {

  // TAMANHO DA TELA

createCanvas(500, 600);

// Mensagem FINAL

Final = createSprite(250, 440);
Final.addImage(mensagemFinalImg);
Final.scale = 2;

// PISTA

Path = createSprite(265, 600);
Path.addImage(PathImg);
Path.scale = 8;
Path.velocityY = 5;

// CARROS

RedCar = createSprite(245, 530, 20, 20);
RedCar.addImage(RedImg);
RedCar.scale = 2;

  // IMAGEM DO GAMEOVER

  GameOverMessage = createSprite(250, 300, 20, 20); 
  GameOverMessage.addImage("GameOver", GameOverImg);
  GameOverMessage.scale = 5;

// BARREIRAS

Barreira1 = createSprite(370, 300, 20, 600);
Barreira1.visible = false;

Barreira2 = createSprite(115, 300, 20, 600);
Barreira2.visible = false;

 // SPAWN GROUPS

 SpawnGG = new Group();
 SpawnOG = new Group();

 // FUNCTION DRAW

}

function draw() {

  background("green");

  // PROFUNDIDADE

  Final.depth +=1;

  GameOverMessage.depth +=1;
  
  // CONDIÇÕES

  if(SpawnOG.isTouching(RedCar)){
    gameState = END;


  }

  if(SpawnGG.isTouching(RedCar)) {
    gameState = END;

  }

  // ESTADOS DO JOGO

  if(gameState === PLAY) {

    Final.visible = false;

    GameOverMessage.visible = false;

    Path.velocityY = 5;

   quilometros = quilometros + Math.round(getFrameRate()/50);

  if(keyDown(RIGHT)) {
    RedCar.x = RedCar.x + 6;

  }

  if(keyDown(LEFT)) {
    RedCar.x = RedCar.x - 6;

  }

  CreateGreenCar();

  CreateOrangeCar();

  }

  if(gameState === END) {

    Final.visible = true;

    GameOverMessage.visible = true;

    Path.velocityY = 0;

    SpawnOG.setVelocityYEach(0);
    SpawnGG.setVelocityYEach(0);

    SpawnOG.setLifetimeEach(-1);
    SpawnGG.setLifetimeEach(-1);

    if(keyDown(ENTER)) {

      restart();
  
    }

  }

  // COLISÃO - 1

  RedCar.collide(Barreira1);
  RedCar.collide(Barreira2);

  // COLISÕES - 2

  RedCar.setCollider("rectangle", -2, - 1, 40, 54);
  RedCar.debug = false;

  Barreira1.setCollider("rectangle", 15, 0, 0, 600);
  Barreira1.debug = false;
  Barreira2.setCollider("rectangle", -15, 0, 0, 600);
  Barreira2.debug = false;

  // INFINITO

  if(Path.y > 390 ){
    Path.y = height/2;
  }

  drawSprites();

  // TEXTO

  textFont("minecraftia");
  textSize(20);
  stroke("black");
  text("Quilômetros: " +quilometros, 165, 60);

 }

function CreateGreenCar() {

  if (World.frameCount % 235 == 0) {
    var GC = createSprite(Math.round(random(170, 300), 250, 300));
    GC.addImage(GreenImg);
    GC.scale = 2;
    GC.velocityY = 5;
    GC.lifetime = 130;
    GC.setCollider("rectangle", -2, - 1, 40, 54);
    GC.debug = false;
    SpawnGG.add(GC);

  }

}

function CreateOrangeCar() {

  if(World.frameCount % 100 == 0) {
    var OC = createSprite(Math.round(random(120,350), 250, 300));
    OC.addImage(OrangeImg);
    OC.scale = 2;
    OC.velocityY = 5;
    OC.lifetime = 130;
    OC.setCollider("rectangle", -2, -1, 40, 54);
    OC.debug = false;
    SpawnOG.add(OC);

  }

}

function restart() {

gameState = PLAY;
GameOverMessage.visible = false;

SpawnGG.destroyEach();
SpawnOG.destroyEach();

RedCar.x = 245;
RedCar.y = 530;

quilometros = 0;

if(keyDown(RIGHT)) {
  RedCar.x = RedCar.x + 6;

}

if(keyDown(LEFT)) {
  RedCar.x = RedCar.x - 6;

  }
 }
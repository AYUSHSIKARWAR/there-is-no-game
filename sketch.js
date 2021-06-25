//Ground
var Ground;
var InGround;
//Game State
var gameState = 0;
//Background
var Background;
//Speech State
var speechState = 17;
//Speech Count
var speechCount = 0;
//Delay Count
var delayCount = 0;
var CdelayCount = 0;
var creditState = 0;
//Speech Count
var creditCount = 0;
//Trophy
var Trophy, TrophyI;
var TrophyState = "FREE";
//Box
var Box, BoxI;
var boxState = "DEFAULT";
//Hammer
var Hammer, HammerI;
var HammerY = -50;
var HammerState = "FIXED";
//Sounds
var Thud;
//Others
let bA = 0;
let hA = 0;
let tA = 0;

function preload() {
  Background = loadImage("Assets/Back.jfif");
  TrophyI = loadImage("Assets/trophy.png");
  BoxI = loadImage("Assets/Box.png");
  HammerI = loadImage("Assets/Hammer.png");
  Thud = loadSound("Assets/Thud.wav");
}

function setup() {
  createCanvas(700, 700);
  Trophy = createSprite(width / 2, height - 60);
  Ground = createSprite(width / 2, height + 10, width, 30);
  InGround = createSprite(width / 2, height, width, 30);
  Box = createSprite(Trophy.x, Trophy.y);
  Hammer = createSprite(width - 50, HammerY);
}

function draw() {
  InGround.visible = false;
  //Hammer
  if (Hammer.y > height) {
    Hammer.y = height - 10;
  }
  if (Hammer.x > width) {
    Hammer.x = width - 10;
  }
  if (Hammer.x < 0) {
    Hammer.x = 10;
  }
  Hammer.addImage(HammerI);
  if (HammerState == "FIXED") {
    Hammer.y = HammerY;
  } else if (HammerState == "FREE" && hA == 1) {
    Hammer.velocityY += 0.9;
  }
  if (mousePressedOver(Hammer) && HammerState != "FIXED") {
    HammerState = "HELD";
  } else if (HammerState != "FIXED") {
    HammerState = "FREE";
  }
  if (Hammer.isTouching(Ground)) {
    hA = 0
  } else {
    hA = 1
  }
  Hammer.collide(Ground);
  Hammer.collide(Box);
  Hammer.collide(Trophy);
  //Box
  Box.addImage(BoxI);
  Box.scale = 1.9;
  Box.visible = false;
  Box.collide(Ground);
  Box.setCollider("rectangle", 0, 0, 75, 75);
  if (boxState == "DEFAULT" && bA == 1) {
    Box.velocityY += 0.9;
  }
  if (Box.isTouching(Ground)) {
    bA = 0
  } else {
    bA = 1
  }
  //Trophy
  if (TrophyState == "FIXED") {
    Trophy.x = Box.x;
    Trophy.y = Box.y;
  } else if (TrophyState == "FREE" && tA == 1) {
    Trophy.velocityY += 0.9;
  }
  if (mousePressedOver(Trophy) && TrophyState != "FIXED") {
    TrophyState = "HELD";
  } else if (TrophyState != "FIXED") {
    TrophyState = "FREE";
  }
  if (TrophyState == "HELD") {
    Trophy.velocityY = 0;
    Trophy.x = mouseX;
    Trophy.y = mouseY;
  }
  if (Trophy.isTouching(Ground)) {
    tA = 0
  } else {
    tA = 1
  }
  Trophy.collide(Ground);
  Trophy.addImage(TrophyI);
  Trophy.setCollider("rectangle", 0, -10);
  //Game State 0
  if (gameState === 0) {
    background(Background);
    //Text Box
    fill('white');
    stroke('black');
    rect(-10, -5, width + 20, 50);
    speech(17, "Ok Then, If You Cheat, I Cheat", 75, 0);
    if (speechState === 18) {
      gameState = 1;
    }
  } else if //Game State 1
  (gameState === 1) {
    background(Background);
    //Text Box
    fill('white');
    stroke('black');
    rect(-10, -5, width + 20, 50);
    Box.visible = true;
    Trophy.visible = false;
    TrophyState = "FIXED";
    //Box State
    if (mousePressedOver(Box)) {
      boxState = "HELD";
    } else {
      boxState = "DEFAULT";
    }
    //Holding The Hammer
    if (HammerState == "HELD") {
      Hammer.x = mouseX;
      Hammer.y = mouseY;
      Hammer.velocityY = 0;
    }
    //Holding The Box
    if (boxState == "HELD") {
      Box.x = mouseX;
      Box.y = mouseY;
      Box.velocityY = 0;
    }
    //Dropping The Box
    if (Box.velocityY > 20 && speechState == 19 && proximity(Box, Ground, 1)) {
      speechState = 20;
      HammerY += 20;
      Thud.play();
    }
    if (Box.velocityY > 20 && speechState == 21 && proximity(Box, Ground, 1)) {
      speechState = 22;
      HammerY += 20;
      Thud.play();
    }
    if (Box.velocityY > 20 && speechState == 23 && proximity(Box, Ground, 1)) {
      speechState = 24;
      HammerY += 20;
      Thud.play();
    }
    if (Box.velocityY > 20 && speechState == 25 && proximity(Box, Ground, 1)) {
      speechState = 26;
      HammerY += 20;
      Thud.play();
    }
    if (Box.velocityY > 20 && speechState == 25 && proximity(Box, Ground, 1)) {
      speechState = 26;
      HammerY += 20;
      Thud.play();
    }
    if (Box.velocityY > 20 && speechState == 27 && proximity(Box, Ground, 1)) {
      speechState = 28;
      HammerY += 20;
      HammerState = "FREE";
      Thud.play();
    }
    //Dropping The Hammer
    if (Hammer.velocityY > 15 && speechState == 29 && proximity(Hammer, Box, 1)) {
      speechState = 30;
      Box.destroy();
      Hammer.destroy();
      Thud.play();
      gameState = 2;
    }
    //Speech
    speech(18, "Bet You Can't Get The Trophy Now!", 75, 0);
    speech(20, "Hey! What Are You Doing?", 55, 0);
    speech(22, "Stop It Now!", 40, 0);
    speech(24, "This Is Getting Irritating Now", 75, 0);
    speech(26, "Ugh.. I Guess I Have To Live With It", 75, 0);
    speech(28, "Where Did That Hammer Come From!", 75, 0);

  } else if (gameState === 2) {
    background(Background);
    //Text Box
    fill('white');
    stroke('black');
    rect(-10, -5, width + 20, 50);
    Trophy.visible = true;
    TrophyState = "FREE";
    //Speech
    speech(30, "No! That Was Not Meant To Happen", 75, 0);
    speech(31, "But... I Must Appreciate Your Wits", 75, 10);
    speech(32, "So.. You Won The Game ", 65, 10);
    speech(33, "I Am Sending You To The Credits Scene ", 85, 10);
    speech(34, "Bye Bye.. Also Remember One More Thing", 85, 10);
    speech(35, "DON'T COME BACK!", 75, 20);
    console.log(speechState);
    if (speechState == 36) {
      gameState = 3;
    } 
  }else if (gameState == 3) {
    Trophy.visible = false;
    background(0, 0, 0);
    credit(0,"Not A Game By Ayush Sikarwar",130,15);
    credit(1,"Not Made In Javascript",130,15);
    credit(2,"Thanks For Not Playing A Game",100,15);
    credit(3,"I Hope You Didn't Like It",100,15);
    credit(4,"Now You Can Go And Play A Game",100,15);
    credit(5,"The End (Maybe?)",Infinity,15);
    
  }
  drawSprites();
}

//Speech Function
function speech(state, message, timer, delay) {
  if (speechState === state) {
    speechCount++;
    delayCount++;
    if (speechCount < timer + 1 && delayCount > delay) {
      textAlign(CENTER);
      textSize(20);
      fill('black');
      text(message, width / 2, 30);
    }
    if (speechCount === timer) {
      speechState = (state + 1);
      speechCount = 0;
      delayCount = 0;
    }
  }
}
//Credits
function credit(state, message, timer, delay) {
  if (creditState === state) {
    creditCount++;
    CdelayCount++;
    if (creditCount < timer + 1 && CdelayCount > delay) {
      textAlign(CENTER);
      textSize(35);
      fill('white');
      text(message, width / 2, height/2);
    }
    if (creditCount === timer) {
      creditState = (state + 1);
      creditCount = 0;
      CdelayCount = 0;
    }
  }
}

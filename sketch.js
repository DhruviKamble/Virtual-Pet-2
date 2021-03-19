//Create variables here
var dog, dogImg;
var happyDog, happyDogImg;
var database;
var foodS;
var foodObj;
var feedTime;
var feedButton, addFoodButton;

function preload() {
	//load images here
  happyDogImg = loadImage("images/happyDog.png");
  dogImg = loadImage("images/dog.png");
}

function setup() {
	createCanvas(1200, 400);
  database = firebase.database();

  dog = createSprite(1130, 330);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodObj = new Food();
  foodObj.readStock();

  var lastFedRef = database.ref('lastFed');
  lastFedRef.on("value", (data) =>{
    feedTime = data.val();
  });
  //.on = permanent listener

  feedButton = createButton("Feed the Dog");
  feedButton.position(310, 70);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(230, 70);
}


function draw() {
  background(142, 8, 109);

  //!== undefined to handle delay
  if(feedTime !== undefined) {
    textSize(20);
    fill("white");
    if(feedTime > 12) {
      text("Last Fed: " + feedTime%12 + "PM", 20, 35);
    } else if (feedTime === 0){
      text("Last Fed: 12 AM", 20, 35);
    } else if (feedTime === 12) {
      text("Last Fed: 12 PM", 20, 35);
    } else {
      text("Last Fed: " + feedTime + "AM", 20, 35);
    }
  }

  drawSprites();
  //add styles here
  foodObj.display(foodS);

  feedButton.mousePressed(() => {
    dog.addImage(happyDogImg);
    foodS = foodS-1
    foodObj.updateStock(foodS);
    feedTime = hour();

    database.ref('/').update({
      lastFed: feedTime
    });
  });

  addFoodButton.mousePressed(() => {
    foodS = foodS+1
    foodObj.updateStock(foodS);
  });
}
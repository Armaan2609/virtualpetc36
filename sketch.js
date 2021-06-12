//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var food;
var foodStock;
var lastFed,fedTime,feed,adFood;
var wall1,wall2,wall3,wall4;


function preload()
{
	//load images here
  dogImage1=loadImage("images/Dog.png");
  dogHappy=loadImage("images/happyDog.png");

  

  ;
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);

  food=new Food();

  foodStock=database.ref("food");
  foodStock.on("value",readStock);


  dog=createSprite(800,200);
  dog.addImage(dogImage1);
  dog.scale=0.2;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  

 
   

  foodStock=database.ref("Food");
  foodStock.on("value",readStock)
  
}



function draw() {  
background("green");

food.display();  

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed=data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed: "+lastFed%12 + "PM",350,30)
}else if(lastFed==0){
text("Last Feed:12 AM",350,30)
}else {
  text("Last Feed:"+lastFed + "AM",350,30)}


  drawSprites();
  

}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogHappy);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref("/").update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
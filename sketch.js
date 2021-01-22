var dog,sadDog,happyDog;
var feed; 
var addFood; 
var database; 
var foodTotal; 
var food; 
var fedTime, lastFed;
function preload(){ 
  sadDog=loadImage("Dog.png"); 
  happyDog=loadImage("happy dog.png"); 
} 
function setup() {
   createCanvas(1000,400);
    database = firebase.database();
    
    food = new Food(); 

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    feed = createButton("feed the dog"); 
    feed.position(700, 95); 
    feed.mousePressed(feedDog); 
    
    dog=createSprite(800,200,150,150); 
    dog.addImage(sadDog);
    dog.scale=0.15; 
     
    addFood = createButton("Add Food"); 
    addFood.position(800, 95); 
    addFood.mousePressed(addFoods); 
  } 
  function draw() { 
    background(46,139,87); 
    food.display();
    drawSprites();
    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
      lastFed = data.val();
    });
    fill(255,255, 254);
    textSize(15);
    if(lastFed>=12) {
      text("Last Fed: "+lastFed%12+" PM", 300, 30);
    }
    else if(lastFed==0) {
      text("Last Fed: NotDefined", 300, 30);
    }
    else {
      text("Last Fed: "+lastFed+" AM", 300, 30);
    }
   } 
   
   //function to update food stock and last fed time 
   function feedDog() { 
     dog.addImage(happyDog); 
     food.updateFoodStock(food.getFoodStock()-1); 
     database.ref('/').update({
        Food:food.getFoodStock(), 
        FeedTime:hour()
      }); 
    } 
    //function to add food in stock function 
    function addFoods() { 
      foodTotal++; 
      database.ref('/').update({ Food:foodTotal, 
      });
    }

    function readStock(data) {
      foodTotal = data.val();
      food.updateFoodStock(foodTotal);

    }
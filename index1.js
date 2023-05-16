var numberOfButtons = document.querySelectorAll(".btn").length;
var start = true;
var gamePattern = [];
var userPattern = [];
var level = 0;

// Add click event listeners to all buttons
for (var i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function(event) {
    var userChosenColour = this.id;
    userPattern.push(userChosenColour);
    makeSound(userChosenColour);
    buttonAnimation(userChosenColour);
    checkAnswer(userPattern.length - 1);

  });
}
document.querySelector("h1").addEventListener("click", function(event) {
  if (start === true){
    startGame();
  }
  start = false;
});
// Add keypress event listener to start the game
$(document).keypress(function(event) {
  if (start === true){
    startGame();
  }
  start = false;
});

function startGame() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  nextSequence();
}


function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  makeSound(randomChosenColour);
  buttonAnimation(randomChosenColour);
  
}


    
  function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");
      if (userPattern.length === gamePattern.length) {
        setTimeout(function() {
          userPattern = [];
          nextSequence();
          console.log(userPattern);
          console.log(gamePattern);
        }, 1000);
      }
    } 
    else {
      console.log("wrong");
      endGame();
    }
  }
  
      
  
  

function makeSound(key) {
  switch (key) {
    case "red":
      var tom1 = new Audio("sounds/red.mp3");
      tom1.play();
      break;
    case "green":
      var tom2 = new Audio("sounds/green.mp3");
      tom2.play();
      break;
    case "blue":
      var tom3 = new Audio("sounds/blue.mp3");
      tom3.play();
      break;
    case "yellow":
      var tom4 = new Audio("sounds/yellow.mp3");
      tom4.play();
      break;
    default:
      console.log(key);
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function endGame(){
        $("h1").text("YOU LOST, CLICK ANY KEY TO RESTART");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        start = true;
        
}

var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedButtons=[];
var gamelevel=0;
var counter=false;

$(document).keypress(function(){
  if(!counter){
    $("#level-title").text("Game Level"+gamelevel);
  sequence();
  counter=true;
}
});

$(".btn").click(function(){
  var userChosenButton=$(this).attr("id");
  userClickedButtons.push(userChosenButton);
  playSound(userChosenButton);
  animatePress(userChosenButton);
  checkAnswer(userClickedButtons.length-1);
});


function sequence () {
  gamelevel++;
  $("#level-title").text("Game Level:"+gamelevel);
  var n=Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[n];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  }


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedButtons[currentLevel]){
      console.log("success");

    if(userClickedButtons.length===gamePattern.length){
      setTimeout(function(){
        sequence();
      },1000);
      userClickedButtons=[];
    }
  }
  else{
    var x=new Audio("sounds/wrong.mp3")
    x.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Restart the page");
    startover();
  }
}

function startover(){
  gamelevel=0;
  gamePattern=[];
  counter=false;
}

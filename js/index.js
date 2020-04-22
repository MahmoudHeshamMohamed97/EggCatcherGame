var basket = document.querySelector(".basket");
var translationValue;
var widthOfBasket;
document.addEventListener("mousemove", function (e) {

    translationValue = e.screenX - (screen.width / 2);
    widthOfBasket = getComputedStyle(basket).width;
    var px = widthOfBasket.indexOf("px");
    widthOfBasket = Number(widthOfBasket.slice(0, px)) / 2;
    // console.log(widthOfBasket);    // 50
    if (e.screenX >= widthOfBasket && e.screenX <= screen.width - widthOfBasket) {   // This condition to avoid exceeding screenWidth
        basket.style.transform = "translateX(" + translationValue + "px)";

    }
    // console.log(e.screenX);
});


var playBtn = document.getElementById("playBtn");  //The Play button
playBtn.addEventListener('click', function () {
    startTheGame();
});

var firstEgg = document.querySelectorAll(".eggImage")[0];
var secondEgg = document.querySelectorAll(".eggImage")[1];
var thirdEgg = document.querySelectorAll(".eggImage")[2];
var brokenEgg = document.querySelectorAll(".brokenEgg");
function startTheGame() {
    disappearTheWelcomMessage();
    playStartSound();
    startAnimation();
}

// function starts the game audio
function playStartSound() {
    var audio = document.getElementById("start");
    audio.autoplay = true;
    audio.loop = true;
    audio.load();
}

// This function to hide the Play Section
function disappearTheWelcomMessage() {
    var playSection = document.querySelector(".playSection");
    playSection.style.visibility = "hidden";
}

// 
var allEggs = document.querySelectorAll(".eggImage");
function startAnimation() {
    for (let i = 0; i < allEggs.length; i++) {
        allEggs[i].style.visibility = "visible";
        allEggs[i].classList.add("eggAnimation");
    }
    repeatProcess();

}


// console.log(firstEgg.offsetParent.offsetLeft);              // translationValue+500
// console.log(secondEgg.offsetParent.offsetLeft);             // translationValue+500
// console.log(thirdEgg.offsetParent.offsetLeft);              // translationValue+500
var score = document.getElementById("score");
var lifes = document.getElementById("lifes");
var currentScore = document.getElementById("currentScore");
var totalScore = 0;
function eggMovement(egg, sadEgg) {
    if ( (lifes.innerHTML) <= 0) {
        lifes.innerHTML = 0;
        endGame();
        return;
    }
    else {
        if ((translationValue + 500) >= (egg.offsetParent.offsetLeft - widthOfBasket) && (translationValue + 500) <= (egg.offsetParent.offsetLeft + widthOfBasket)) {
            if (egg.offsetTop > 430 && egg.offsetTop < 470) {
                console.log("picked up");
                // egg.style.animation = "none";
                var pickedUpSound = document.getElementById("picked");
                pickedUpSound.autoplay = true;
                pickedUpSound.load();
                egg.classList.remove("eggAnimation");
                repeatProcess();
                score.innerHTML = Number(score.innerHTML) + 1;
                currentScore.innerHTML = ++totalScore;
                return;
            }
        }
        else if (egg.offsetTop > 490) {
            // egg.style.animation = "none";
            var brockedSound = document.getElementById("brocked");
            brockedSound.autoplay = true;
            brockedSound.load();
            egg.classList.remove("eggAnimation");
            repeatProcess();
            console.log("brocked");
            lifes.innerHTML = Number(lifes.innerHTML) - 1;
            sadEgg.style.visibility = "visible";

            setTimeout(function () {
                sadEgg.style.visibility = "hidden";
            }, 2000);
            return;
        }
    }
    var timer = setTimeout(function () {
        eggMovement(egg, sadEgg);
    }, 1000 / 60);
}


function repeatProcess() {
    
    eggMovement(firstEgg, brokenEgg[0]);
    eggMovement(secondEgg, brokenEgg[1]);
    eggMovement(thirdEgg, brokenEgg[2]);
    firstEgg.classList.add("eggAnimation");
    secondEgg.classList.add("eggAnimation");
    thirdEgg.classList.add("eggAnimation");

    var text = getComputedStyle(firstEgg).animationDuration;
    text = text.slice(0,text.length-1);
    text = Number(text);
    console.log("text = " + text);
    var newSpeed = text - 0.03;
    if(newSpeed <= 0.7) newSpeed = 0.7;

    for(let i=0; i<allEggs.length; i++){
        allEggs[i].style.animationDuration = newSpeed+"s";
        console.log(getComputedStyle(allEggs[i]).animationDuration );
    }

    // if( Number(score.innerHTML)%5 == 0 ){
    //     alert("H");
    // }

    // repeatProcess();

}


var playBtn = document.getElementById("playBtn");
function endGame() {

    var startAudio = document.getElementById("start");
    startAudio.pause();
    startAudio.currentTime = 0;
    var endAudio = document.getElementById("end");
    endAudio.autoplay = true;
    endAudio.load();
    for(let i=0; i<allEggs.length; i++){
        allEggs[i].style.visibility = "hidden";
        allEggs[i].classList.remove("eggAnimation");
    }
    var chickensSection = document.querySelector(".chickens");

    chickensSection.style.visibility = "hidden";

    var playSection = document.querySelector(".happyEggs");

    playSection.style.visibility = "visible";
    playSection.style.position = "absolute";
    playSection.style.top = "10vh";
    playSection.style.padding = "100px";
    playSection.style.height = "400px";

    var finalScore = document.getElementById("finalScore");
    finalScore.innerHTML = score.innerHTML;

    playBtn.style.width = "350px";
    playBtn.innerHTML = "Play again?";
    playBtn.addEventListener("click", function () {
        location.reload();
    });

}
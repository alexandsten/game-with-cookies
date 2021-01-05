// Globala konstanter och variabler
//array för 1-40 brickor
/* const allBricks; */

var brickElem;   //bricka som flyttas, kan byta class mellan front och back

var dragBrickElem; //den brickan som blir dragen

var brickHolder;  //där fyra nya brickor visas
var gameBoard;   //planen där alla brickor ska placeras

var markElem;    //markerar om raden är korrekt

var newGameBtn;      //knapp för nytt spel
var newBricksBtn;    //knapp för nya brickor

var numberGames;     //antal spel
var totalPoints;     //det totala antalet poäng, sparas med hjälp av cookies


//========== Init ===============//

function init() {

newGameBtn = document.getElementById("newGameBtn");
newBricksBtn  = document.getElementById("newBricksBtn");

gameBoard = document.getElementById("board");
brickHolder = document.getElementById("newBricks").
getElementsByClassName("empty");

numberGames = document.getElementById("countGames");
totalPoints = document.getElementById("totPoints");

newGameBtn.addEventListener("click",startGame);
newBricksBtn.addEventListener("click",addBricks);
}
//==============================//

window.addEventListener("load",init); 		// Se till att init aktiveras då sidan är inladdad

//======= start game =========//
//Funktion som ** 
function startGame() {
    alert("Hello! I am an alert box!!");
    newGameBtn.disabled = true;
    newBricksBtn.disabled = false;
}

//===========================//

//======= newBricks ========//

function addBricks() {  
   //här måste jag få fram 4 front brickor med varsit nummer från arrayen

    for (let i = 0; i < brickHolder.length; i++) {   
    alert("Hello! I am an alert box!!");
    brickHolder[i].draggable = true;
    brickHolder[i].src = "img/2.png";
    brickHolder[i].addEventListener("dragstart",dragStartBrick);
    brickHolder[i].addEventListener("dragend",dragEndBrick);
    }
}


//=========================//

//======= drag start brick =====//

function dragStartBrick() {
    alert("dragstart");
}

// ==========================//


//======= drag end brick =====//

function dragEndBrick() {
    alert("dragend");
}

// ==========================//

// ======== bricka över tom bricka ======//

function brickOverEmpty() {

}


//==============================//


// ======== end game ==========//

function endGame() {

}
//=============================//
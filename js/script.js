// Globala konstanter och variabler
//array för 1-40 brickor
const allBricks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", " 37","38", "39", "40"]; 

var brickElem;   //bricka som flyttas, kan byta class mellan front och back

var dragBrickElem; //den brickan som blir dragen

var brickHolder;  //där fyra nya brickor visas
var gameBoard;   //planen där alla brickor ska placeras

var markElem;    //markerar om raden är korrekt

var newGameBtn;      //knapp för nytt spel
var newBricksBtn;    //knapp för nya brickor

var numberGames;     //antal spel
var totalPoints;     //det totala antalet poäng, sparas med hjälp av cookies

var numberList;     //alla bricknummer kopieras till denna array


//========== Init ===============//

function init() {

newGameBtn = document.getElementById("newGameBtn");
newBricksBtn  = document.getElementById("newBricksBtn");

gameBoard = document.getElementById("board").
getElementsByTagName("img");


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
    totalPoints.innerHTML = "spel startas";
    newGameBtn.disabled = true;
    newBricksBtn.disabled = false;
    numberList = allBricks.slice(0);
}

//===========================//

//======= newBricks ========//

function addBricks() {  
   //här måste jag få fram 4 front brickor med varsit nummer från arrayen
    for (let i = 0; i < brickHolder.length; i++) {   
    var r = Math.floor(numberList.length * Math.random())+1;
    brickHolder[i].draggable = true;
    brickHolder[i].src = "img/" + r + ".png";
    brickHolder[i].addEventListener("dragstart",dragStartBrick);
    brickHolder[i].addEventListener("dragend",dragEndBrick);
    numberList.splice(r,1);
    }
}


//=========================//

//======= drag start brick =====//

function dragStartBrick(e) {
    totalPoints.innerHTML = "dragstart";
    for (let i = 0; i < gameBoard.length; i++) {
		gameBoard[i].addEventListener("dragover",brickOverEmpty);
        gameBoard[i].addEventListener("drop",brickOverEmpty);
        gameBoard[i].addEventListener("dragleave",brickLeaveEmpty);
        e.dataTransfer.setData("text",this.innerHTML);
    }
    e.dataTransfer.setData("text",this.innerHTML);
}

// ==========================//


//======= drag end brick =====//

function dragEndBrick(e) {

}

// ==========================//

// ======== bricka över tom bricka ======//

function brickOverEmpty(e) {
    e.preventDefault();
   
    this.style.backgroundColor = "#CCC"; 
    if (e.type == "drop") {
        this.style.backgroundColor = "#4287f5";
        this.innerHTML = e.dataTransfer.getData("text");
    }

    /* for (let i = 0; i < gameBoard.length; i++) {   
        totalPoints.innerHTML = "spelplan";
        ";
        } */
}


//==============================//

//========== brick leave empty =====//

function brickLeaveEmpty(e) {
    this.style.backgroundColor = "";
}


// ======== end game ==========//

function endGame() {

}
//=============================//
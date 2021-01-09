// Globala konstanter och variabler
//array för 1-40 brickor
const allBricks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", " 37","38", "39", "40"]; 

var brickElem;   //bricka som flyttas, kan byta class mellan front och back

var dragBrickElem; //den brickan som blir dragen

var brickHolder;  //där fyra nya brickor visas
var brickHolderCount; // räknar antalet brickor
var gameBoard;   //planen där alla brickor ska placeras

var markElem;    //markerar om raden är korrekt

var newGameBtn;      //knapp för nytt spel
var newBricksBtn;    //knapp för nya brickor

var numberGames;     //antal spel
var totalPoints;     //det totala antalet poäng, sparas med hjälp av cookies

var numberList;     //alla bricknummer kopieras till denna array
var finalCount;

//========== Init ===============//

function init() {

newGameBtn = document.getElementById("newGameBtn");
newBricksBtn  = document.getElementById("newBricksBtn");

gameBoard = document.getElementById("board").
getElementsByClassName("empty");

gameBoardBrick = document.getElementById("board").
getElementsByClassName("brick");

brickHolder = document.getElementById("newBricks").
getElementsByClassName("empty");
/* brickHolderCount = document.getElementById("countGames"); */


numberGames = document.getElementById("countGames");
totalPoints = document.getElementById("totPoints");

newGameBtn.addEventListener("click",startGame);
newBricksBtn.addEventListener("click",addBricks);

newBricksBtn.disabled = true;
}
//==============================//

window.addEventListener("load",init); 		// Se till att init aktiveras då sidan är inladdad

//======= start game =========//
//Funktion som ** 
function startGame() {
    newGameBtn.disabled = true;
    newBricksBtn.disabled = false;
    numberList = allBricks.slice(0);
    brickHolderCount = 0;
    finalCount = 15;
}

//===========================//

//======= newBricks ========//

function addBricks() {  
   //här måste jag få fram 4 front brickor med varsit nummer från arrayen
    newBricksBtn.disabled = true;
    for (let i = 0; i < brickHolder.length; i++) {   
    var r = Math.floor(numberList.length * Math.random())+1;
    brickHolder[i].draggable = true;
    brickHolder[i].src = "img/" + r + ".png";
    brickHolder[i].addEventListener("dragstart",dragStartBrick);
    brickHolder[i].addEventListener("dragend",dragEndBrick);
    brickHolder[i].classList.add("brick");
 /* brickHolder[i].classList.remove("empty"); */
    numberList.splice(r,1); 
    }
    for (let i = 0; i < brickHolder.length; i++) {
        brickHolder[i].classList.remove("empty");
    }
    for (let i = 0; i < brickHolder.length; i++) {
        brickHolder[i].classList.remove("empty");
    }
    for (let i = 0; i < brickHolder.length; i++) {
        brickHolder[i].classList.remove("empty");
    }
    brickHolderCount = 4;
}
//=========================//

//======= drag start brick =====//

function dragStartBrickBoard(e) {
 /*   alert("Du kan ej flytta brickor på spelplanen!"); */
}

function dragStartBrick(e) {
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i].addEventListener("dragover",brickOverEmpty);
        gameBoard[i].addEventListener("drop",brickOverEmpty);
        gameBoard[i].addEventListener("dragleave",brickLeaveEmpty); 
        e.dataTransfer.setData("text",this.src);
   /*   this.classList.remove("empty"); */
        dragBrickElem = this;
    }
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
    /* if (this.getAttribute('class') === 'brickFront' ) {
        break;
    } */
     if (e.type == "drop") {
        this.classList.add("brick");
        this.classList.remove("empty");
        this.src = e.dataTransfer.getData("text"); 
        this.style.backgroundColor = "";
        dragBrickElem.src = "img/empty.png";
        dragBrickElem.classList.add("empty");
        dragBrickElem.classList.remove("brick");
        //  ta bort dragfunktioner för bricka på spelplan
        for (let i = 0; i < gameBoardBrick.length; i++) {
        gameBoardBrick[i].draggable = false;    
        gameBoardBrick[i].addEventListener("dragstart",dragStartBrickBoard);
        gameBoardBrick[i].removeEventListener("dragover",brickOverEmpty);
        gameBoardBrick[i].removeEventListener("drop",brickOverEmpty);
        gameBoardBrick[i].removeEventListener("dragleave",brickLeaveEmpty);  
        gameBoardBrick[i].removeEventListener("dragstart",dragStartBrick);
        gameBoardBrick[i].removeEventListener("dragend",dragEndBrick);
        } 
        brickHolderCount --;
       finalCounter();
    }
  /*      for (let i = 0; i < brickHolder.length; i++) {
        if (brickHolder.length == draggable) {
        alert("Dra först ord till alla bilder!!");
        return; }
  }  */
}
//==============================//

//========== brick leave empty =====//

function brickLeaveEmpty(e) {
    this.style.backgroundColor = "";
}

//===============================

//===== counters =============

function finalCounter() {
    
    if (brickHolderCount<1) {
        newBricksBtn.disabled = false;
    }
    if (finalCount<1) {
        alert("spelslut");
    }
    finalCount--;
}

// ======== end game ==========//

function endGame() {

}
//=============================//
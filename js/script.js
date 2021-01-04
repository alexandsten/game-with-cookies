// Globala konstanter och variabler
//array för 1-40 brickor
const allBricks 

brickElem   //bricka som flyttas, kan byta class mellan front och back

dragBrickElem //den brickan som blir dragen

brickHolder   //där fyra nya brickor visas
gameBoard   //planen där alla brickor ska placeras

markElem    //markerar om raden är korrekt

newGameBtn      //knapp för nytt spel
newBricksBtn    //knapp för nya brickor

numberGames     //antal spel
totalPoints     //det totala antalet poäng, sparas med hjälp av cookies


//========== Init ===============//

function init() {

newGameBtn = document.getElementById("newGameBtn");
newBricksBtn  = document.getElementById("newBricksBtn");

gameBoard = document.getElementById("board");
brickHolder = document.getElementById("newBricks");

numberGames = document.getElementById("countGames");
totalPoints = document.getElementById("totPoints");
}
//==============================//

window.addEventListener("load",init); 		// Se till att init aktiveras då sidan är inladdad

//======= start game =========//
//Funktion som ** 
function startGame() {
    newGameBtn.disabled = true;
    newBricksBtn.disabled = false;

}

//===========================//

//======= newBricks ========//



//=========================//



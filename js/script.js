// Globala konstanter och variabler
//array för 1-40 brickor
const allBricks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37","38", "39", "40"]; 
var varv = ["1", "2", "3", "4"];        // räknar varv för rader och columner
var brickElem;   //bricka som flyttas, kan byta class mellan front och back
var dragBrickElem; //den brickan som blir dragen
var brickHolder;  //där fyra nya brickor visas
var brickHolderCount; // räknar antalet brickor
var gameBoard;   //alla empty brickor
var gameBoardTag; // grabba vid tag
var markElem;    //markerar om raden är korrekt
var newGameBtn;      //knapp för nytt spel
var newBricksBtn;    //knapp för nya brickor
var numberGames;     //antal spel
var numberGamesElem; //antal spel element
var totalPoints;          // siffran för det totala antalet poäng
var totalPointsElem;     //det totala antalet poäng, sparas med hjälp av cookies
var messageElem;        // meddelande till spelaren
var numberList;     //alla bricknummer kopieras till denna array
var finalCount;     // nedräkning till endGame

//========== Init ===============//
function init() {
newGameBtn = document.getElementById("newGameBtn");
newBricksBtn  = document.getElementById("newBricksBtn");
gameBoard = document.getElementById("board").
getElementsByClassName("empty");
gameBoardBrick = document.getElementById("board").
getElementsByClassName("brick");
gameBoardTag = document.getElementById("board").
getElementsByTagName("img");
brickHolder = document.getElementById("newBricks").
getElementsByClassName("empty");
brickHolderId = document.getElementById("newBricks");
numberGames = document.getElementById("countGames");
totalPointsElem = document.getElementById("totPoints");
newGameBtn.addEventListener("click",startGame);
newBricksBtn.addEventListener("click",addBricks);
markElem = document.getElementById("board").
getElementsByClassName("mark");
messageElem = document.getElementById("message");
numberGamesElem = document.getElementById("countGames")

newBricksBtn.disabled = true;
totalPoints = 0;
totalPointsElem.innerHTML = 0;
numberGames = 0;
numberGamesElem.innerHTML = 0;
getData();
}

// ==== hämta cookie ===== //
function getData() {
	let dataStr = getCookie("kakan"); // Cookiens innehåll, om den finns, annars null
	if (dataStr != null) {
		let dataArr = dataStr.split("&"); // Array med datan uppdelat
		let text = decodeURIComponent(dataArr[0]); // Texten
		let textTwo = decodeURIComponent(dataArr[1]); // Array med färgerna 
        totalPoints = text;
        totalPointsElem.innerHTML = totalPoints;
        numberGames = textTwo;
        numberGamesElem.innerHTML = numberGames;
	}
}
 // End getData

//==============================//

window.addEventListener("load",init); 		// Se till att init aktiveras då sidan är inladdad

//======= start game =========//
//Funktion som gör spelet redo, med knappar, array och räknare
function startGame() {
    newGameBtn.disabled = true;
    newBricksBtn.disabled = false;
    numberList = allBricks.slice(0);
    console.log(numberList);
    brickHolderCount = 0;
    finalCount = 15;
}
//===========================//

//======= newBricks ========//
function addBricks() {  
   //här måste jag få fram 4 front brickor med varsit nummer från arrayen
    newBricksBtn.disabled = true;
    for (let i = 0; i < brickHolder.length; i++) {     
    var r = Math.floor(numberList.length * Math.random());
    brickHolder[i].src = "img/" + numberList[r] + ".png";
    brickHolder[i].addEventListener("dragstart",dragStartBrick);
    brickHolder[i].addEventListener("dragend",dragEndBrick);
    brickHolder[i].classList.add("brick");
    brickHolder[i].draggable = true; 
    ix = numberList[r];
    brickHolder[i].id = ix;
    numberList.splice(r,1); 
    // ta bort classen empty från de nya brickorna
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
function dragStartBrick(e) {
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i].addEventListener("dragover",brickOverEmpty);
        gameBoard[i].addEventListener("drop",brickOverEmpty);
        gameBoard[i].addEventListener("dragleave",brickLeaveEmpty); 
        e.dataTransfer.setData("text",this.src);
        dragBrickElem = this;
    }
}
// ==========================//
//======= drag end brick =====//
function dragEndBrick(e) {
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i].removeEventListener("dragover",brickOverEmpty);
        gameBoard[i].removeEventListener("drop",brickOverEmpty);
        gameBoard[i].removeEventListener("dragleave",brickLeaveEmpty); 
        }
    for (let i = 0; i < brickHolder.length; i++) {
        brickHolder[i].removeEventListener("dragstart",dragStartBrick);
     }
}
// ==========================//
// ======== bricka över tom bricka ======//

function brickOverEmpty(e) {
    e.preventDefault(); 
    this.style.backgroundColor = "#2FC09F";  
     if (e.type == "drop") {
        this.classList.add("brick");
        this.classList.remove("empty");
        this.src = e.dataTransfer.getData("text"); 
        this.style.backgroundColor = "";
        this.id = dragBrickElem.id;
        dragBrickElem.src = "img/empty.png";
        dragBrickElem.classList.add("empty");
        dragBrickElem.classList.remove("brick");
     /*   dragBrickElem.draggable = false; */
        //  ta bort dragfunktioner för bricka på spelplan
        for (let i = 0; i < gameBoardBrick.length; i++) { 
            gameBoardBrick[i].removeEventListener("dragover",brickOverEmpty);
            gameBoardBrick[i].removeEventListener("drop",brickOverEmpty);
            }  
        brickHolderCount --;
       finalCounter();
    }
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
        endGame();
    }
    finalCount--;
}
// ======== end game ==========//
function endGame() {     // rätta rader
  
    var corrRows = 0;       // räknar antal korrekta rader för denna spelomgång
    

    for (let i = 0; i < varv.length; i++) {     // lägger till symboler för felaktiga rader
        scoreMarkR = document.getElementById("r" + varv[i] + "mark");
        scoreMarkR.innerHTML = "&cross;";
        scoreMarkC = document.getElementById("c" + varv[i] + "mark");
        scoreMarkC.innerHTML = "&cross;";
    }
    //rader och kolumner till variabler /*
    // referenser till brickornas värde
    var brickIdOne;
    var brickIdTwo;
    var brickIdThree;
    var brickIdFour;
    var rowDive;
// rättning för rader
    for (let i = 0; i < varv.length; i++) { 
        rowDive = document.getElementById("board").getElementsByClassName("r" + varv[i] + "");
    for (let i = 0; i < rowDive.length; i++) {         // loop som tar ut id / värde ur rad 1
        brickIdOne = rowDive[0].id;
        brickIdTwo = rowDive[1].id;
        brickIdThree = rowDive[2].id;
        brickIdFour = rowDive[3].id;
            } 
            var brickIdOneNum = parseInt(brickIdOne, 10);
            var brickIdTwoNum = parseInt(brickIdTwo, 10);
            var brickIdThreeNum = parseInt(brickIdThree, 10);
            var brickIdFourNum = parseInt(brickIdFour, 10);
    if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
        scoreMark = document.getElementById("r" + varv[i] + "mark");
        scoreMark.innerHTML = "&check;";
        totalPoints++;
        totalPointsElem.innerHTML = totalPoints;
        corrRows++;
        }
    }
// rättning för columner
    for (let i = 0; i < varv.length; i++) { 
        rowDive = document.getElementById("board").getElementsByClassName("c" + varv[i] + "");
    for (let i = 0; i < rowDive.length; i++) {         // loop som tar ut id / värde ur rad 1
        brickIdOne = rowDive[0].id;
        brickIdTwo = rowDive[1].id;
        brickIdThree = rowDive[2].id;
        brickIdFour = rowDive[3].id;
            } 
            var brickIdOneNum = parseInt(brickIdOne, 10);
            var brickIdTwoNum = parseInt(brickIdTwo, 10);
            var brickIdThreeNum = parseInt(brickIdThree, 10);
            var brickIdFourNum = parseInt(brickIdFour, 10);
    if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
        scoreMark = document.getElementById("c" + varv[i] + "mark");
        scoreMark.innerHTML = "&check;";
        totalPoints++;
        totalPointsElem.innerHTML = totalPoints;
        corrRows++;
        }
    }
// ======================================== // meddelar om antal korrekta rader
    messageElem.innerHTML = "Du fick " + corrRows + " antal rader korrekt.";
    numberGames++;
    numberGamesElem.innerHTML = numberGames;
    SetKakan(); //==== sätt en cookie för spelets resultat
}       
//================ // skapar en cookie för denna spelomgång
    function SetKakan() {
    let text = totalPoints; // Texten i formuläret
    let textTwo = numberGames; // Texten i formuläret 
    let theData = encodeURIComponent(text) + "&" + encodeURIComponent(textTwo);
        setCookie("kakan",theData,30);	// Datan sparas i en cookie
    newGameBtn.disabled = false;
    newBricksBtn.disabled = true;
    // ====  nytt spel //
   newGameBtn.addEventListener("click",startAnotherGame); 
}
//================= gör allt redo för en ny omgång ============//
 function startAnotherGame() {       // rensa bort alla resultat och brickor, så att spelaren kan börja om på nytt 
   for (let i = 0; i < gameBoardTag.length; i++) { 
    gameBoardTag[i].removeEventListener("drop",brickOverEmpty);
    gameBoardTag[i].removeEventListener("dragover",brickOverEmpty);
    gameBoardTag[i].classList.add("empty");
    gameBoardTag[i].classList.remove("brick");
    gameBoardTag[i].id = "";
    } 
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoardTag[i].src = "img/empty.png";
    }
    for (let i = 0; i < varv.length; i++) {
        scoreMarkR = document.getElementById("r" + varv[i] + "mark");
        scoreMarkR.innerHTML = "";
        scoreMarkC = document.getElementById("c" + varv[i] + "mark");
        scoreMarkC.innerHTML = "";
    }
    messageElem.innerHTML = "";
}          
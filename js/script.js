// Globala konstanter och variabler
//array för 1-40 brickor
const allBricks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37","38", "39", "40"]; 

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
//Funktion som ** 
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
 /*   brickHolder[i].classList.remove("empty"); */
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

function endGame() {
    // rätta rader
    var corrRows = 0;
    //rader och kolumner blir variabler
    row1 = document.getElementById("r1mark"); row2 = document.getElementById("r2mark");
    row3 = document.getElementById("r3mark"); row4 = document.getElementById("r4mark");

    col1 = document.getElementById("c1mark"); col2 = document.getElementById("c2mark");
    col3 = document.getElementById("c3mark"); col4 = document.getElementById("c4mark");

    //rader och kolumner får img element från init
    row1.innerHTML = "&cross;";
    row2.innerHTML = "&cross;";
    row3.innerHTML = "&cross;";
    row4.innerHTML = "&cross;";
    col1.innerHTML = "&cross;";
    col2.innerHTML = "&cross;";
    col3.innerHTML = "&cross;";
    col4.innerHTML = "&cross;";

    //rader och kolumner till variabler
     var rowOne = document.getElementById("board").getElementsByClassName("r1");  
     var rowTwo = document.getElementById("board").getElementsByClassName("r2");
     var rowThree = document.getElementById("board").getElementsByClassName("r3");
     var rowFour = document.getElementById("board").getElementsByClassName("r4");
     var colOne = document.getElementById("board").getElementsByClassName("c1");
     var colTwo = document.getElementById("board").getElementsByClassName("c2");
     var colThree = document.getElementById("board").getElementsByClassName("c3");
     var colFour = document.getElementById("board").getElementsByClassName("c4");
    // få fram värde ur brickor (den måste ju gå igenom brickorna för att komma åt värdena, annars stannar det bara på en bricka)

    var brickIdOne;
    var brickIdTwo;
    var brickIdThree;
    var brickIdFour;
// rad 1 ======================================
    for (let i = 0; i < rowOne.length; i++) {         // loop som tar ut id / värde ur rad 2
        brickIdOne = rowOne[0].id;
        brickIdTwo = rowOne[1].id;
        brickIdThree = rowOne[2].id;
        brickIdFour = rowOne[3].id;
            }
    
            var brickIdOneNum = parseInt(brickIdOne, 10);
            var brickIdTwoNum = parseInt(brickIdTwo, 10);
            var brickIdThreeNum = parseInt(brickIdThree, 10);
            var brickIdFourNum = parseInt(brickIdFour, 10);
    if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
        row1.innerHTML = "&check;";
        totalPoints++;
        totalPointsElem.innerHTML = totalPoints;
        corrRows++;
    }
// rad 2 ================
    for (let i = 0; i < rowTwo.length; i++) {         // loop som tar ut id / värde ur rad 2
        brickIdOne = rowTwo[0].id;
        brickIdTwo = rowTwo[1].id;
        brickIdThree = rowTwo[2].id;
        brickIdFour = rowTwo[3].id;
            }
    
            var brickIdOneNum = parseInt(brickIdOne, 10);
            var brickIdTwoNum = parseInt(brickIdTwo, 10);
            var brickIdThreeNum = parseInt(brickIdThree, 10);
            var brickIdFourNum = parseInt(brickIdFour, 10);
    if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
        row2.innerHTML = "&check;";
        totalPoints++;
        totalPointsElem.innerHTML = totalPoints;
        corrRows++;
    }
// rad 3 ================
for (let i = 0; i < rowThree.length; i++) {         // loop som tar ut id / värde ur rad 2
    brickIdOne = rowThree[0].id;
    brickIdTwo = rowThree[1].id;
    brickIdThree = rowThree[2].id;
    brickIdFour = rowThree[3].id;
        }

        var brickIdOneNum = parseInt(brickIdOne, 10);
        var brickIdTwoNum = parseInt(brickIdTwo, 10);
        var brickIdThreeNum = parseInt(brickIdThree, 10);
        var brickIdFourNum = parseInt(brickIdFour, 10);
if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
    row3.innerHTML = "&check;";
    totalPoints++;
    totalPointsElem.innerHTML = totalPoints;
    corrRows++;
}
// rad 4 ================
for (let i = 0; i < rowFour.length; i++) {         // loop som tar ut id / värde ur rad 2
    brickIdOne = rowFour[0].id;
    brickIdTwo = rowFour[1].id;
    brickIdThree = rowFour[2].id;
    brickIdFour = rowFour[3].id;
        }

        var brickIdOneNum = parseInt(brickIdOne, 10);
        var brickIdTwoNum = parseInt(brickIdTwo, 10);
        var brickIdThreeNum = parseInt(brickIdThree, 10);
        var brickIdFourNum = parseInt(brickIdFour, 10);
if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
    row4.innerHTML = "&check;";
    totalPoints++;
    totalPointsElem.innerHTML = totalPoints;
    corrRows++;
}



// column 1 ================
for (let i = 0; i < colOne.length; i++) {         // loop som tar ut id / värde ur rad 2
    brickIdOne = colOne[0].id;
    brickIdTwo = colOne[1].id;
    brickIdThree = colOne[2].id;
    brickIdFour = colOne[3].id;
        }

        var brickIdOneNum = parseInt(brickIdOne, 10);
        var brickIdTwoNum = parseInt(brickIdTwo, 10);
        var brickIdThreeNum = parseInt(brickIdThree, 10);
        var brickIdFourNum = parseInt(brickIdFour, 10);
if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
    col1.innerHTML = "&check;";
    totalPoints++;
    totalPointsElem.innerHTML = totalPoints;
    corrRows++;
}
// column 2 ================
    for (let i = 0; i < colTwo.length; i++) {         // loop som tar ut id / värde ur rad 2
        brickIdOne = colTwo[0].id;
        brickIdTwo = colTwo[1].id;
        brickIdThree = colTwo[2].id;
        brickIdFour = colTwo[3].id;
            }
    
            var brickIdOneNum = parseInt(brickIdOne, 10);
            var brickIdTwoNum = parseInt(brickIdTwo, 10);
            var brickIdThreeNum = parseInt(brickIdThree, 10);
            var brickIdFourNum = parseInt(brickIdFour, 10);
    if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
        col2.innerHTML = "&check;";
        totalPoints++;
        totalPointsElem.innerHTML = totalPoints;
        corrRows++;
    }
// column 3 ================
for (let i = 0; i < colThree.length; i++) {         // loop som tar ut id / värde ur rad 2
    brickIdOne = colThree[0].id;
    brickIdTwo = colThree[1].id;
    brickIdThree = colThree[2].id;
    brickIdFour = colThree[3].id;
        }

        var brickIdOneNum = parseInt(brickIdOne, 10);
        var brickIdTwoNum = parseInt(brickIdTwo, 10);
        var brickIdThreeNum = parseInt(brickIdThree, 10);
        var brickIdFourNum = parseInt(brickIdFour, 10);
if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
    col3.innerHTML = "&check;";
    totalPoints++;
    totalPointsElem.innerHTML = totalPoints;
    corrRows++;
}
// column 4 ================
for (let i = 0; i < colFour.length; i++) {         // loop som tar ut id / värde ur rad 2
    brickIdOne = colFour[0].id;
    brickIdTwo = colFour[1].id;
    brickIdThree = colFour[2].id;
    brickIdFour = colFour[3].id;
        }

        var brickIdOneNum = parseInt(brickIdOne, 10);
        var brickIdTwoNum = parseInt(brickIdTwo, 10);
        var brickIdThreeNum = parseInt(brickIdThree, 10);
        var brickIdFourNum = parseInt(brickIdFour, 10);
if (brickIdOneNum < brickIdTwoNum && brickIdTwoNum < brickIdThreeNum && brickIdThreeNum < brickIdFourNum) {
    col4.innerHTML = "&check;";
    totalPoints++;
    totalPointsElem.innerHTML = totalPoints;
    corrRows++;
    }
    messageElem.innerHTML = "Du fick " + corrRows + " antal rader korrekt.";
numberGames++;
numberGamesElem.innerHTML = numberGames;
    SetKakan(); //==== sätt en cookie för spelets resultat

}
//================
    function SetKakan() {
    let text = totalPoints; // Texten i formuläret
    let textTwo = numberGames; // Texten i formuläret 
    let theData = encodeURIComponent(text) + "&" + encodeURIComponent(textTwo);
        setCookie("kakan",theData,30);	// Datan sparas i en cookie
    newGameBtn.disabled = false;
    newBricksBtn.disabled = true;
    // ==== testa med nytt spel //
    newGameBtn.addEventListener("click",startAnotherGame);
}
//================= gör allt redo för en ny omgång ============//
function startAnotherGame() {       // rensa bort alla resultat och brickor, så att spelaren kan börja om på nytt
   /* location.href = "index.html"; */
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
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";
    row4.innerHTML = "";
    col1.innerHTML = "";
    col2.innerHTML = "";
    col3.innerHTML = "";
    col4.innerHTML = "";
    messageElem.innerHTML = "";
}

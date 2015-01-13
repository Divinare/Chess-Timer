 
/*
 function resizeDiv() {
    $(document.getElementById('winning-screen')).hide();
    $(document.getElementById('player1')).css('color', 'blue');
    $(document.getElementById('player2')).css('color', 'green');
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    $(".playButton").css({"height": (windowHeight*0.44) + "px"});
    $(".playButton").css({"width": windowWidth + "px"});
    $(".menuButton").css({"height": (windowHeight*0.119) + "px"});
    $(".menuButton").css({"width": (windowWidth*0.5) + "px"});
}

var timePlayer1; // 10 of this is one second
var timePlayer2; // 10 of this is one second
var paused;
var turn;
var incrementP1 = 0;
var incrementP2 = 0;
var startNew = false;

function startGame() {
    paused = false;
    turn = "player1"; // player 1 = blue, player 2 = green
    showButtonScreen();
    hideStartScreen();
    timeMin = document.getElementById("timer-setting").value * 60 * 10;
    timePlayer1 = timeMin;
    timePlayer2 = timeMin;
    makeSettings();
    setTimeout('Decrease()',100);
    
}

function makeSettings() {
    if (document.getElementById("incrementP1").value % 1 === 0) {
        incrementP1 = (document.getElementById("incrementP1").value*10);
    }
    if (document.getElementById("incrementP2").value % 1 === 0) {
        incrementP2 = (document.getElementById("incrementP2").value*10);
    }
}

function changeTurn(player) {
    if (paused) {
        return;
    }
    if (player == player1) {
        if (turn == "player1") {
            turn = "player2";
            timePlayer1 = (parseInt(timePlayer1) + parseInt(incrementP1));
        }
        
    } else {
        if (turn == "player2") {
            turn = "player1";
            timePlayer2 = (parseInt(timePlayer2) + parseInt(incrementP2));
        }
    }
}

function pauseGame() {
    if (paused) {
        paused = false;
        changePauseText("Pause");
        setTimeout('Decrease()',100);
    } else {
        paused = true
        changePauseText("Unpause");
    }
}

function newGame() {
    hideButtonScreen();
    showStartScreen();
    startNew = true;
}

function Decrease() {
    if (paused) {
        return;
    }
    if (startNew == true) {
        startNew = false;
        return;
    }
    if (turn == "player1") {
        timePlayer1--;
    } else {
        timePlayer2--;
    }
    setTimerToButtons();
    var gameEnd = isGameEnded();
    if (gameEnd == "gameContinues") {
        setTimeout('Decrease()', 100);
    } else {
        endGame(gameEnd);
    }
}


function isGameEnded() {
    if (timePlayer1 <= 0) {
        return "player2wins"
    } else if (timePlayer2 <= 0) {
        return "player1wins"
    }
    return "gameContinues";
}

function endGame(gameEnd) {
    if (gameEnd == "player1wins") {
        showWinner("blue");
    } else {
        showWinner("green");
    }
}

function setTimerToButtons() {
    setTimerToPlayer("player1");
    setTimerToPlayer("player2");
}

function setTimerToPlayer(player) {
    var playerTime;
    if (player == "player1") {
        playerTime = timePlayer1; 
    } else {
        playerTime = timePlayer2;
    }

    var mins = Math.floor(playerTime/10/60);
    var secs = (Math.floor(playerTime/10) - mins*60);
    if (secs <= 9) {
        secs = "0" + secs
    }
    var milSecs = playerTime.toString().charAt(playerTime.toString().length-1);
    
    document.getElementById(player).innerHTML = mins + ":" + secs + ":" + milSecs;



}

function showStartScreen () {
    $(document.getElementById('start-screen')).show();
}
function hideStartScreen () {
    $(document.getElementById('start-screen')).hide();
}
function hideButtonScreen () {
    $(document.getElementById('button-screen')).hide();
}
function showButtonScreen () {
    $(document.getElementById('button-screen')).show();
}
function changePauseText (text) {
    document.getElementById('pauseButton').innerHTML = text;
}
function showWinner(winner) {
    if (winner == "blue") {
        document.getElementById("player2").innerHTML = "Time out";
    } else if (winner == "green") {
        document.getElementById("player1").innerHTML = "Time out";
    }
}

*/
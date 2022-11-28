const gameBoard = document.querySelector(".game-board")
let currentScore = document.querySelector(".num-score")
const postGame = document.querySelector(".post-game")
const yourScoreText = document.querySelector(".your-score")
const resetButton = document.querySelector("#reset-button")

let score = 0
let num
const count = 4;

let running = false


let playBoard = [
   row1 = [0, 0, 0, 0],
   row2 = [0, 0, 0, 0],
   row3 = [0, 0, 0, 0],
   row4 = [0, 0, 0, 0]
]

let eachRow

let eachColumn

let noChange

let notEmpty

startGame()





function pushFirstTwo() {
    if (!fullBoard()){
        return;
    }

    let notEmpty = false;
    while (!notEmpty) {
        let rN = Math.floor(Math.random() * count)
        let rN2 = Math.floor(Math.random() * count)
        let chance = Math.floor(Math.random() * 20)

        if (playBoard[rN][rN2] === 0){
                playBoard[rN][rN2] = 2
                tiles = document.getElementById(rN.toString() + "-" + rN2.toString())
                tiles.innerText = "2"
                tiles.classList.add(`t2`)
            }
            notEmpty = true;
        }
        


    }


function pushNumber() {

    if (!fullBoard()){
        return;
    }
    
    notEmpty = false;
    while (!notEmpty) {
        let rN = Math.floor(Math.random() * count)
        let rN2 = Math.floor(Math.random() * count)
        let chance = Math.floor(Math.random() * 20)

        if (playBoard[rN][rN2] === 0){
            if (chance >= 15){
                playBoard[rN][rN2] = 4
                tiles = document.getElementById(rN.toString() + "-" + rN2.toString())
                tiles.innerText = "4"
                tiles.classList.add(`t4`)
            } else {
                playBoard[rN][rN2] = 2
                tiles = document.getElementById(rN.toString() + "-" + rN2.toString())
                tiles.innerText = "2"
                tiles.classList.add(`t2`)
            }
            notEmpty = true;
        }


    }
    
}


function startGame(){
    running = true;
    
    for (let i = 0; i < count; i++){
        for (let j = 0; j < count; j++) {
            let tiles = document.createElement("div");  
            gameBoard.append(tiles)
            tiles.id = (i.toString() + "-" + j.toString());
            let num = playBoard[i][j];
            updateTiles(tiles, num);
            
        }
    }
    pushFirstTwo()
    pushFirstTwo()
}



function updateTiles(tiles, num) {
    tiles.classList.value = "";
    tiles.classList.add("tile");
    if (num > 0) {
        tiles.innerText = num;
        if (num <= 4096) {
            tiles.classList.add(`t${num.toString()}`)
        } else {
            tiles.classList.add(`t8192`)
        }
    } else if (num === 0) {
        tiles.innerText = ""
        tiles.classList.add(`t0`)
    }
}


document.addEventListener("keyup", event => {
    if (event.code == "ArrowLeft") {
        shiftLeft()
        pushNumber()
        
        
        
    } else if (event.code == "ArrowRight") {
        shiftRight();
        pushNumber()
       
        
    }else if (event.code == "ArrowUp") {
        upShift()
        pushNumber()
      
        
       
    }else if (event.code == "ArrowDown") {
        downShift()
        pushNumber()
        
    }
    updateScore()
    checkStatus()
    resetButton.addEventListener('click', resetGame);
})



function noZeros(num) {
    return num > 0
}


function shift(arr) {
    arr = arr.filter(noZeros);
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i] == arr[i+1]) {
            arr[i] = arr[i] * 2;
            arr[i+1] = 0;
            score = score + arr[i]
            noChange = false
        }

    }
    arr = arr.filter(noZeros);
    for (let j = arr.length; j < count; j++) {
        arr.push(0);
    }
    return arr

}



function shiftLeft() {
    for (let i = 0; i < count; i++){
            
            eachRow = playBoard[i]
            eachRow = shift(eachRow);
         
            playBoard[i] = eachRow;
            
            for (let j = 0; j < count; j++) {
                tiles = document.getElementById(i.toString() + "-" + j.toString());
                num = playBoard[i][j]
                updateTiles(tiles, num)

            }
       
    }

}



function shiftRight() {
    for (let i = 0; i < count; i++){
        eachRow = playBoard[i]
        
        eachRow = eachRow.reverse()
        
        eachRow = shift(eachRow);
    
        eachRow = eachRow.reverse()
       
        playBoard[i] = eachRow
        


        for (let j = 0; j < count; j++) {
            tiles = document.getElementById(i.toString() + "-" + j.toString());
            num = playBoard[i][j]
            updateTiles(tiles, num)

        }
    }
}



function upShift() {
    for(let i = 0; i < playBoard.length; i++){
        eachColumn = [playBoard[0][i], playBoard[1][i], playBoard[2][i], playBoard[3][i]]
        

        
        eachColumn = shift(eachColumn)

        playBoard[0][i] = eachColumn[0]
        playBoard[1][i] = eachColumn[1]
        playBoard[2][i] = eachColumn[2]
        playBoard[3][i] = eachColumn[3]
        
        

        
        for (let j = 0; j < count; j++){
            tiles = document.getElementById(j.toString() + "-" + i.toString());
                num = playBoard[j][i]
                updateTiles(tiles, num)

        }
        
        
    }
    
}

function downShift() {
    for(let i = 0; i < playBoard.length; i++){
        eachColumn = [playBoard[0][i], playBoard[1][i], playBoard[2][i], playBoard[3][i]]
        
        eachColumn = eachColumn.reverse()
        
        eachColumn = shift(eachColumn)
        
        eachColumn = eachColumn.reverse()

        playBoard[0][i] = eachColumn[0]
        playBoard[1][i] = eachColumn[1]
        playBoard[2][i] = eachColumn[2]
        playBoard[3][i] = eachColumn[3]
        
        

        
        for (let j = 0; j < count; j++){
            tiles = document.getElementById(j.toString() + "-" + i.toString());
                num = playBoard[j][i]
                updateTiles(tiles, num)

        }
        
        
    }
    
}




function rowSalvation(arr, arr2){
    
    cellSalvation(arr, arr2, 0)
    cellSalvation(arr, arr2, 1)
    cellSalvation(arr, arr2, 2)
    cellSalvation(arr, arr2, 3)

    function cellSalvation(arr, arr2, num){
            if(arr[num] == 0){
                arr[num] = arr2[num]
                arr2[num] = 0
            }
            if (arr[num] == arr2[num]){
                arr[num] = (arr[num] * 2)
                arr2[num] = 0
            }
        
}
}

function updateScore(){
    currentScore.innerText = score
}

function fullBoard() {
    noChange = false
    for (let i = 0; i < playBoard.length; i++){
        for (let j = 0; j < playBoard.length; j++){
            if (playBoard[i][j] === 0){
                return true;
            } else {
                noChange = true
            }

        }
    }
    return false;

}

function checkStatus() {
    for (let i = 0; i < playBoard.length; i++){
        for (let j = 0; j < playBoard.length; j++){
            if (!fullBoard() || playBoard[i][j] === 32){
                running = false
                postGame.classList.add('show')
                yourScoreText.innerText = `Your score was ${score}`
                
                
            }
        }
    }
}

function resetGame() {
    running = true;
    score = 0
    currentScore.innerText = score
    playBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
    ]

    for (let i = 0; i < count; i++){
        for (let j = 0; j < count; j++) {
                tiles = document.getElementById(j.toString() + "-" + i.toString());
                num = playBoard[j][i]
                updateTiles(tiles, num)
            
        }
    }
    pushFirstTwo()
    pushFirstTwo()

    postGame.classList.remove('show')


}
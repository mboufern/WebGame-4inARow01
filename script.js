let virtualTable = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]];

let colors = ["", "red", "blue"];

let min = 0;
let max = 6;

let currentPlayer = 1;
let roundsCount = 0

let score1 = 0;
let score2 = 0;


function choice(collId){
    let coll = parseInt(collId.substring(1, 2));
    let index = 0

    for(cell of virtualTable[coll])
    {
        if(cell == 0)
        {
            virtualTable[coll][index] = currentPlayer;
            document.getElementById("c" + coll + index).style.backgroundColor = colors[currentPlayer];
            winLogic(coll, index);
            break;
        }

        index++;
    }
}

function winLogic(coll, cell){
    let v = false;
    let d1 = false;
    let d2 = false;
    
    //horizontally
    let h = horizontally(coll, cell);

    console.log(roundsCount);
    console.log("h:  " + h);

    if(!h)
    {
        //vertically
        v = vertically(coll, cell);

        console.log("v:  " + v);

        if(!v)
        {
            //diagonally
            d1 = diagonally1(coll, cell);

            console.log("d1:  " + d1);
            
            if(!d1)
            {
                d2 = diagonally2(coll, cell);

                console.log("d2:  " + d2);
            }
        }
    }

    if(h || v || d1 || d2)
    {
        roundsCount = 50;
        
        let winner = document.createElement("h2");
        winner.style.color = colors[currentPlayer];
        winner.innerHTML = document.getElementById("name" + currentPlayer).value;

        let msg = document.createElement("h2");
        msg.innerText = " has won the game";

        let M = document.createElement("h2");

        M.id = "text";
        winner.id = "text";
        msg.id = "text";

        M.append(winner);
        M.append(msg);

        message(M);

        (currentPlayer == 1)? score1++ : score2++;

        document.getElementById("score1").innerHTML = score1;
        document.getElementById("score2").innerHTML = score2;

        setTimeout(replay, 2500);
    }
    else
    {
        endround();
    }

}

function endround(){
    if(roundsCount < 49)
    {
        roundsCount++;
        if(roundsCount == 49)
        {
            setTimeout(message("The game ends with a tie!"), 2000)
            replay();
        }
        else
        {
            (currentPlayer == 1) ? (currentPlayer = 2) : (currentPlayer = 1);
    
            let playerName = document.createElement("h2");
            playerName.innerText = document.getElementById("name" + currentPlayer).value;
            playerName.style.color = colors[currentPlayer];
            playerName.id = "text";
    
            let msg = document.createElement("h2");
            msg.innerText = "your turn "
            msg.append(playerName);
            msg.id = "text";
            message(msg);
        }

    }
}

function replay()
{
    roundsCount = 0;
    virtualTable = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]];

    for(i = 0; i < 7; i++)
    {
        for(j = 0; j < 7; j++)
        {
            document.getElementById("c" + i + j).style.backgroundColor = "white";
        }
    }

}

function message(M)
{
    info = document.getElementById("info");
    info.innerHTML = "";
    info.append(M);
}

function horizontally(coll, cell)
{
    let h = 0;

    let a = Math.max(Math.min(coll-3, max), min);
    let b = Math.max(Math.min(coll+3, max), min);

    for(let i = a; i <= b; i++)
    {
        if(virtualTable[i][cell] == currentPlayer)
            h++;
        else
            h = 0;

        if(h > 3)
            return true;
    }
        
    return false;
}

function vertically(coll, cell)
{
    let v = 0;

    let a = Math.max(Math.min(cell-3, max), min);
    let b = Math.max(Math.min(cell+3, max), min);

    for(let i = 0; i <= 6; i++)
    {
        if(virtualTable[coll][i] == currentPlayer)
            v++;
        else
            v = 0;

        if(v > 3)
            return true;
    }

    return false;
}

function diagonally1(coll, cell)
{
    let d = 0;

    i = coll;
    j = cell;

    while(i > 0 && j > 0)
    {
        i--;
        j--;
    }

    console.log(i + " " + j);

    if(i == 0 && j <= 3 || j == 0 && i <= 3 || j == 0 && i == 0)
    {
        while(i < 7 && j < 7)
        {
            if(virtualTable[i][j] == currentPlayer)
                d++;
            else
                d = 0;

            if(d > 3)
                return true;

            i++;
            j++;
        }
    }
    
    return false;
}

function diagonally2(coll, cell)
{
    let d = 0;

    i = coll;
    j = cell;

    console.log(i + " " + j);

    while(i < 6 && j > 0)
    {
        i++;
        j--;
    }

    if(i == 6 && j <= 3 || j == 0 && i >= 3 || j == 0 && i == 6)
    {
        while(i > -1 && j < 7)
        {
            if(virtualTable[i][j] == currentPlayer)
                d++;
            else
                d = 0;

            if(d > 3)
                return true;

            i--;
            j++;
        }
    }
    
    return false;
}
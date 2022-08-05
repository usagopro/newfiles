//---------------------------------------variables--------------------------------------


var pieces = [];
var board = [];
const rows = 8;
const cols = 8;
const cell =  document.getElementsByClassName('cell');
const newgame = '<button onclick="initialGame()" id="resultBtn">PLAY NEW GAME</button>'


const statusEle = document.getElementById('status');
const result = document.getElementById('result');

var beginning = true;
var allMovableCells = []
var finalMovableCells = []
var allKillableCells = []
var finalKillableCells = []
var currentCell = 0
var currentIndex = 0
var curPlayer = 'white'
var prePlayer = 'black'
var alivePieces = {white:[] , black:[]}
var checkingForCheck = false;
var checkPieces = []
var isinCheck = false
var blockableCells = []
var findingBlocableCells = false
var kingpos = {white:[],black:[]}
var pieceCell;
var kingCell;
var index;
var originalpos = [];
var originalcell;
var duplicatepos = [];
var duplicatecell;
var check= false;
var checkmate = false;
var draw = false;
var ispredictingmoves = false
var originalCheck = false
var notEnoughtforcp = false;
var notEnoughtforpp = false;
var tempRemovingPiece = -1;
var passant = false;
var posiblepassantcell  = -1;
var passantCell = -1;
var passantTime = 0;
var isKingMoved = {
    'white':false,
    'black':false
}
var isRook1Moved = {
    'white':false,
    'black':false
}
var isRook2Moved = {
    'white':false,
    'black':false
}
var castlingallowed = false;
var checkingForCastling = false
var allCastlingCells = []
var last3moves = {
    'white':[],
    'black':[]
}
var whiteColor = 'rgb(255, 211, 161)';
var blackColor = 'rgb(171, 102, 37)';
for (let i = 0; i < rows; i++) {
    board.push([])
    for (let j = 0;j < cols; j++){
        if((i+j) %2 == 0){
            board[i].push(whiteColor) 
        }
        else{
            board[i].push(blackColor) 
        }
    }
}

function changeColor(w,b){
    whiteColor = w
    blackColor = b
    console.log(w , b)
    console.log(whiteColor , blackColor)
    createTable();
    board = []
    for (let i = 0; i < rows; i++) {
        board.push([])
        for (let j = 0;j < cols; j++){
            if((i+j) %2 == 0){
                board[i].push(whiteColor) 
            }
            else{
                board[i].push(blackColor) 
            }
        }
    }
    console.log(board)
    createTable()
}
//----------------------------------chess pieces blueprint-------------------------------------


class chessPiece{
    constructor(name , cell , src , color , type){
        this.name = name;
        this.cell = cell;
        this.src = src;
        this.color = color;
        this.type = type;
    }
}

//-----------------------------creating table


function createTable(){     
    for (let i = 0; i < rows; i++) {
        for (let j = 0;j < cols; j++){
            document.getElementsByClassName('cell')[i*8 + j].style.backgroundColor= board[i][j]
            document.getElementsByClassName('cell')[i*8 + j].style.boxShadow= '';
            document.getElementsByClassName('cell')[i*8 + j].style.border= '2px solid #ff0';
        }
    }
}

//--------------------------------Initial Game  SETUP-------------------------

function initialGame(){    
    statusEle.innerHTML = ''
    for (let i = 0; i < rows*cols; i++) {
        cell[i].innerHTML = ''
    }
    result.innerHTML = ''
    result.style.visibility = 'hidden'

    pieces = [];
    beginning = true;
    allMovableCells = []
    finalMovableCells = []
    allKillableCells = []
    finalKillableCells = []
    currentCell = 0
    currentIndex = 0
    curPlayer = 'white'
    prePlayer = 'black'
    alivePieces = {white:[] , black:[]}
    checkingForCheck = false;
    checkPieces = []
    isinCheck = false
    blockableCells = []
    kingpos = {white:[],black:[]}
    pieceCell;
    kingCell;
    index;
    originalpos = [];
    originalcell;
    duplicatepos = [];
    duplicatecell;
    check= false;
    checkmate = false;
    draw = false;
    ispredictingmoves = false
    originalCheck = false
    notEnoughtforcp = false;
    notEnoughtforpp = false;
    tempRemovingPiece = -1;
    passant = false;
    posiblepassantcell  = -1;
    passantCell = -1;
    passantTime = 0;
    isKingMoved = {
        'white':false,
        'black':false
    }
    isRook1Moved = {
        'white':false,
        'black':false
    }
    isRook2Moved = {
        'white':false,
        'black':false
    }
    castlingallowed = false;
    checkingForCastling = false
    allCastlingCells = []
    last3moves = {
        'white':[],
        'black':[]
    }
      

    createTable();
    
    for (let i = 1; i <= 16 ; i++ ){
        if(i<=8){
            n = 'whitepawn' + i; 
            r = 7;
            c = i;

            pieces.push(new chessPiece(n , [r,c] , 'chess pieces/white pawn.png' , 'white' , 'pawn'));
            
        }
        else if(i>8){
            r =  2;
            c = (i%8);
            if(c == 0){
                c = 8
            }
            n = 'blackpawn' + c; 
            
            pieces.push(new chessPiece(n , [r,c] , 'chess pieces/black pawn.png' , 'black' , 'pawn'));
        }
    }

    pieces.push(new chessPiece('blackking' , [1,5] , 'chess pieces/black king.png' ,'black' , 'king'));

    pieces.push(new chessPiece('blackqueen' , [1,4] , 'chess pieces/black queen.png' , 'black' , 'queen'));

    pieces.push(new chessPiece('blackbishop1' , [1,3] , 'chess pieces/black bishop.png' , 'black' , 'bishop'));

    pieces.push(new chessPiece('blackknight1' , [1,2] , 'chess pieces/black knight.png' , 'black' , 'knight'));

    pieces.push(new chessPiece('blackrook1' , [1,1] , 'chess pieces/black rook.png' , 'black' , 'rook'));

    pieces.push(new chessPiece('blackbishop2' , [1,6] , 'chess pieces/black bishop.png' , 'black' , 'bishop'));

    pieces.push(new chessPiece('blackknight2' , [1,7] , 'chess pieces/black knight.png' , 'black' , 'knight'));

    pieces.push(new chessPiece('blackrook2' , [1,8] , 'chess pieces/black rook.png' , 'black' , 'rook'));


    pieces.push(new chessPiece('whiteking' , [8,5] , 'chess pieces/white king.png' , 'white' , 'king'));

    pieces.push(new chessPiece('whitequeen' , [8,4] , 'chess pieces/white queen.png' , 'white' , 'queen'));

    pieces.push(new chessPiece('whitebishop1' , [8,3] , 'chess pieces/white bishop.png' , 'white' , 'bishop'));

    pieces.push(new chessPiece('whiteknight1' , [8,2] , 'chess pieces/white knight.png' , 'white' , 'knight'));

    pieces.push(new chessPiece('whiterook1' , [8,1] , 'chess pieces/white rook.png' , 'white' , 'rook'));
        
    pieces.push(new chessPiece('whitebishop2' , [8,6] , 'chess pieces/white bishop.png' , 'white' , 'bishop'));

    pieces.push(new chessPiece('whiteknight2' , [8,7] , 'chess pieces/white knight.png' , 'white' , 'knight'));

    pieces.push(new chessPiece('whiterook2' , [8,8] , 'chess pieces/white rook.png' , 'white' , 'rook'));

    for(let i = 0; i < pieces.length ; i++){
        alivePieces[(pieces[i].color)].push(i)
    }

    placeImagesOnBoard()

    kingpos['white'] = [8,5]
    kingpos['black'] = [1,5]
    console.log(pieces)

}

initialGame()


function placeImagesOnBoard(){
    alivePieces['white'].forEach(i => { 
        cell[
            ((pieces[i].cell[0]-1)*8 + pieces[i].cell[1])-1
        ].innerHTML = setPieceImg(pieces[i].src , i)
    }); 
    alivePieces['black'].forEach(i => { 
        cell[
            ((pieces[i].cell[0]-1)*8 + pieces[i].cell[1])-1
        ].innerHTML = setPieceImg(pieces[i].src , i)
    }); 
}

//------------------------setPieceImage function------------------------------

function setPieceImg(src,i){
    return `<img src = "${src}" alt="" id="${i}">`
}

//------------------------MAIN GAME------------------------------------

function play(cellno){
    if(beginning){
        game(cellno)
        beginning = false
    }
    else if(!((isCheck(curPlayer , prePlayer) && checkmate) || (!isCheck(curPlayer , prePlayer) && draw))){
        game(cellno)
    }
}

function game(cellno){
    createTable()
    let clickedCell = document.querySelector(`[cellno="${cellno}"]`)
    if(clickedCell.innerHTML != ''){
        clickedPiece = clickedCell.childNodes[0];
        index = clickedPiece.id ;
        clickedPieceColor = pieces[index].color
        originalpos = pieces[index].cell
        if(clickedPieceColor == curPlayer){
            // console.log('*************************************************************************************')
            currentIndex = index ;

            currentCell = cellno;
            clickedCell.style.border = '2px solid #00f';
            clickedCell.style.boxShadow = 'inset 1px 2px 20px  rgb(154, 18, 192)';

            originalcell = currentCell;

            allMovableCells = []
            finalMovableCells = []
            allKillableCells = []
            finalKillableCells = []
            allCastlingCells = []

            movecheck(index)
            // console.log(allMovableCells)
            // console.log(allKillableCells)
            predictingCellAvail(index , originalcell , originalpos)
            // console.log(finalMovableCells)
            // console.log(finalKillableCells)
            movableCellColor()
            killableCellColor()
            castibleCellColor()
        }
        else if(clickedPieceColor == prePlayer){
            if(finalKillableCells.indexOf(parseInt(cellno)) != -1){
                kill(clickedCell , cellno)
                if(curPlayer == 'white'){
                    curPlayer = 'black'
                    prePlayer = 'white'
                }
                else{
                    curPlayer = 'white'
                    prePlayer = 'black'
                }
                allMovableCells = []
                allKillableCells = []
                finalMovableCells = []
                finalKillableCells = []
                allCastlingCells = []
                if(isCheck(curPlayer , prePlayer)){
                    // console.log('=================================================================================')
                    isCheckmate()
                }
                else{
                    isDraw()
                }
                results()
            }
        }
    }
    else if(clickedCell.innerHTML == ''){
        if(finalKillableCells.indexOf(parseInt(cellno)) != -1){
            kill(clickedCell , cellno)
                if(curPlayer == 'white'){
                    curPlayer = 'black'
                    prePlayer = 'white'
                }
                else{
                    curPlayer = 'white'
                    prePlayer = 'black'
                }
                allMovableCells = []
                allKillableCells = []
                finalMovableCells = []
                finalKillableCells = []
                allCastlingCells = []
                if(isCheck(curPlayer , prePlayer)){
                    // console.log('=================================================================================')
                    isCheckmate()
                }
                else{
                    isDraw()
                }
                results()
            }
        else{
            // console.log(allMovableCells.indexOf(parseInt(cellno)) != -1)
            // console.log(allKillableCells.indexOf(parseInt(cellno)) != -1)
            if(finalMovableCells.indexOf(parseInt(cellno)) != -1){
                // console.log(posiblepassantcell)
                if(posiblepassantcell != -1){
                    if(curPlayer == 'black'){
                        passantCell = parseInt(cellno) - 8;
                    }
                    else{
                        passantCell = parseInt(cellno) + 8
                    }
                }
                // console.log(passantCell)
                move(clickedCell , cellno)
                if(curPlayer == 'white'){
                    curPlayer = 'black'
                    prePlayer = 'white'
                }
                else{
                    curPlayer = 'white'
                    prePlayer = 'black'
                }
                allMovableCells = []
                allKillableCells = []
                finalMovableCells = []
                finalKillableCells = []
                allCastlingCells = []
                if(isCheck(curPlayer , prePlayer)){
                        // console.log('=================================================================================')
                        isCheckmate()
                }
                else{
                    isDraw()
                }
                results()
                posiblepassantcell = -1
            }
            else if(allCastlingCells.indexOf(parseInt(cellno)) != -1){
                // console.log(posiblepassantcell)
                // console.log(passantCell)
                castle(cellno)
                if(curPlayer == 'white'){
                    curPlayer = 'black'
                    prePlayer = 'white'
                }
                else{
                    curPlayer = 'white'
                    prePlayer = 'black'
                }
                allMovableCells = []
                allKillableCells = []
                finalMovableCells = []
                finalKillableCells = []
                allCastlingCells = []
                if(!isCheck(curPlayer , prePlayer)){
                        // console.log('=================================================================================')
                        isDraw()
                }
                results()
                posiblepassantcell = -1
            
            }
        }
    }
}

//----------------------------move function---------------------------

function move(clickedCell , cellno){
    if(pieces[currentIndex].type == 'king'){
        isKingMoved[curPlayer] = true
        // console.log(isKingMoved)
    }
    else if(pieces[currentIndex].type == 'rook'){
        if(pieces[currentIndex].cell[1] == 1){
            isRook1Moved[curPlayer] = true
            // console.log(isRook1Moved)
        }
        else if(pieces[currentIndex].cell[1] == 8){
            isRook2Moved[curPlayer] = true
            // console.log(isRook2Moved)
        }
    }
    clickedCell.innerHTML = document.querySelector(`[cellno="${currentCell}"]`).innerHTML
    document.querySelector(`[cellno="${currentCell}"]`).innerHTML = ''
    x = parseInt(cellno/8)+1;
    y = cellno % 8 + 1;
    // console.log(currentIndex)
    // console.log(x,y)
    pieces[currentIndex].cell[0] = x 
    pieces[currentIndex].cell[1] = y 
    if(pieces[currentIndex].type == 'king'){
        kingpos[curPlayer] = [x,y]
    } 
    // console.log(pieces[currentIndex])
    if(posiblepassantcell == parseInt(cellno)){
        passantTime = 1;
    }
    else{
        passantTime-=1;
    }
    if(isPromotion()){
        console.log("Promoting pawn")
    }
    // console.log(passantTime)
    if(last3moves[curPlayer].length == 6){
        last3moves[curPlayer].splice(0,1);
    }
    last3moves[curPlayer].push([parseInt(currentIndex) , parseInt(cellno)]);
}

//---------------------------------------kill function---------------------------

function kill(clickedCell , cellno){
    if(pieces[currentIndex].type == 'king'){
        isKingMoved[curPlayer] = true
        // console.log(isKingMoved)
    }
    else if(pieces[currentIndex].type == 'rook'){
        if(pieces[currentIndex].cell[1] == 1){
            isRook1Moved[curPlayer] = true
            // console.log(isRook1Moved)
        }
        else if(pieces[currentIndex].cell[1] == 8){
            isRook2Moved[curPlayer] = true
            // console.log(isRook2Moved)
        }
    }
    else if(pieces[index].type == 'rook'){
        if(pieces[index].cell[1] == 1){
            isRook1Moved[prePlayer] = true
        }
        else if(pieces[index].cell[1] == 8){
            isRook2Moved[prePlayer] = true
        }
    }
    if(clickedCell.innerHTML == ''){
        clickedCell.innerHTML = document.querySelector(`[cellno="${currentCell}"]`).innerHTML
        if(curPlayer == 'white'){
            // console.log(document.querySelector(`[cellno="${parseInt(cellno)+8}"]`).childNodes[0].id)
            alivePieces['black'].splice(alivePieces['black'].indexOf(parseInt(document.querySelector(`[cellno="${parseInt(cellno)+8}"]`).childNodes[0].id)) , 1)
            document.querySelector(`[cellno="${parseInt(cellno)+8}"]`).innerHTML = ''
            document.querySelector(`[cellno="${currentCell}"]`).innerHTML = ''
            console.log(alivePieces)
            console.log(pieces)
        }
        else{
            // console.log(document.querySelector(`[cellno="${parseInt(cellno)-8}"]`).childNodes[0].id)
            alivePieces['white'].splice(alivePieces['white'].indexOf(parseInt(document.querySelector(`[cellno="${parseInt(cellno)-8}"]`).childNodes[0].id)) , 1)
            document.querySelector(`[cellno="${parseInt(cellno)-8}"]`).innerHTML = ''
            document.querySelector(`[cellno="${currentCell}"]`).innerHTML = ''
            console.log(alivePieces)
            console.log(pieces)
        }
    }
    else{
        alivePieces[clickedPieceColor].splice(alivePieces[clickedPieceColor].indexOf(parseInt(index)) , 1)
        clickedCell.innerHTML = document.querySelector(`[cellno="${currentCell}"]`).innerHTML
        document.querySelector(`[cellno="${currentCell}"]`).innerHTML = ''
    }
    x = parseInt(cellno/8)+1;
    y = cellno % 8 + 1;
    pieces[currentIndex].cell = [x , y]
    if(pieces[currentIndex].type == 'king'){
        kingpos[curPlayer] = [x , y]
    }
    if(isPromotion()){
        console.log("Promoting pawn")
    }
    passantTime-=1;
    // console.log(passantTime)
    // console.log(pieces)
    if(last3moves.length == 6){
        last3moves.splice(0,1);
    }
    last3moves[curPlayer].push([parseInt(currentIndex) , parseInt(cellno)]);
}

//--------------------------------------------castle-----------------------------------

function castle(cellno){
    if(pieces[currentIndex].type == 'king'){
        isKingMoved[curPlayer] = true
        // console.log(isKingMoved)
    }
    else if(pieces[currentIndex].type == 'rook'){
        if(pieces[currentIndex].cell[1] == 1){
            isRook1Moved[curPlayer] = true
            // console.log(isRook1Moved)
        }
        else if(pieces[currentIndex].cell[1] == 8){
            isRook2Moved[curPlayer] = true
            // console.log(isRook2Moved)
        }
    }
    x = parseInt(cellno/8)+1;
    y = cellno % 8 + 1;
    kc = (kingpos[curPlayer][0] -1) *8 +kingpos[curPlayer][1] -1
    ki = document.querySelector(`[cellno="${kc}"]`).childNodes[0].id
    if(y>5){
        rc = parseInt(cellno) + 1
        ri = document.querySelector(`[cellno="${parseInt(cellno)+1}"]`).childNodes[0].id
        document.querySelector(`[cellno="${cellno}"]`).innerHTML = document.querySelector(`[cellno="${kc}"]`).innerHTML
        document.querySelector(`[cellno="${parseInt(cellno)-1}"]`).innerHTML = document.querySelector(`[cellno="${rc}"]`).innerHTML
        document.querySelector(`[cellno="${kc}"]`).innerHTML = ''
        document.querySelector(`[cellno="${rc}"]`).innerHTML = ''
        pieces[ki].cell = [x , y]
        pieces[ri].cell = [x , y-1]
    }
    else{
        rc = parseInt(cellno) - 2
        ri = document.querySelector(`[cellno="${parseInt(cellno)-2}"]`).childNodes[0].id
        document.querySelector(`[cellno="${cellno}"]`).innerHTML = document.querySelector(`[cellno="${kc}"]`).innerHTML
        document.querySelector(`[cellno="${parseInt(cellno)+1}"]`).innerHTML = document.querySelector(`[cellno="${rc}"]`).innerHTML
        document.querySelector(`[cellno="${kc}"]`).innerHTML = ''
        document.querySelector(`[cellno="${rc}"]`).innerHTML = ''
        pieces[ki].cell = [x , y]
        pieces[ri].cell = [x , y+1]
    }
    kingpos[curPlayer][0] = x
    kingpos[curPlayer][y] = y
    passantTime -= 1
    if(last3moves[curPlayer].length == 6){
        last3moves[curPlayer].splice(0,1);
    }
    last3moves[curPlayer].push([parseInt(ki) , parseInt(cellno)]);
}

//-------------------------movecheck function---------------------------

function movecheck(index){
    if(pieces[index].type == 'pawn'){
        possibleCellsPawn(index)
    }

    else if(pieces[index].type == 'king'){
        possibleCellsking(index)
    }

    else if(pieces[index].type == 'queen'){
        possibleCellsqueen(index)
    }

    else if(pieces[index].type == 'bishop'){
        possibleCellsbishop(index)
    }

    else if(pieces[index].type == 'knight'){
        possibleCellsknight(index)
    }

    else if(pieces[index].type == 'rook'){
        possibleCellsrook(index)
    }
}
//RETURNS A MOVABLE AND KILLABLE CELLS


//=----------------------possibleCells of pawn ----------------------------

function possibleCellsPawn(index){
    if(pieces[index].color == 'white' && (pieces[index].cell[0] - 1) > 0){
        nextcell = ((pieces[index].cell[0] - 1) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
            if(pieces[index].cell[0] == 7 ){
                if(isNextCellEmpty(nextcell - 8)){
                    if(!((pieces[index].cell[1]-1) <= 0)){
                        if(!(isNextCellEmpty(nextcell - 9))){
                            // console.log(pieces[document.querySelector(`[cellno="${nextcell-9}"]`).childNodes[0].id].type,
                            // pieces[document.querySelector(`[cellno="${nextcell-9}"]`).childNodes[0].id].color
                            // )
                            if(pieces[document.querySelector(`[cellno="${nextcell-9}"]`).childNodes[0].id].type == 'pawn' &&
                            pieces[document.querySelector(`[cellno="${nextcell-9}"]`).childNodes[0].id].color == 'black'){
                                passant = true
                            }
                        }
                    }
                    if(!((pieces[index].cell[1]+1) > 8)){
                        if(!(isNextCellEmpty(nextcell - 7))){
                            // console.log(pieces[document.querySelector(`[cellno="${nextcell-7}"]`).childNodes[0].id].type,
                            // pieces[document.querySelector(`[cellno="${nextcell-7}"]`).childNodes[0].id].color
                            // )
                            if(pieces[document.querySelector(`[cellno="${nextcell-7}"]`).childNodes[0].id].type == 'pawn' &&
                            pieces[document.querySelector(`[cellno="${nextcell-7}"]`).childNodes[0].id].color == 'black'){
                                passant = true
                                
                            }
                        }
                    }
                    posibleCell(nextcell - 8)
                    passant = false;
                }
            }
        }
        if(!((pieces[index].cell[1]-1) <= 0)){
            if(!isNextCellEmpty(nextcell-1)){
                if(isKillable(index , nextcell-1)){
                    killableCell(index , nextcell-1)
                }
            }
            else{
                if((passantCell == nextcell-1) &&  (passantTime == 1)){
                    killableCell(index , nextcell-1)
                }
            }
        }
        if(!((pieces[index].cell[1]+1) > 8)){
            if(!isNextCellEmpty(nextcell+1)){
                if(isKillable(index , nextcell+1)){
                    killableCell(index , nextcell+1)
                }
            }
            else{
                if((passantCell == nextcell+1) &&  (passantTime == 1)){
                    killableCell(index , nextcell+1)
                }
            }
        }
    }
    else if(pieces[index].color == 'black' && (pieces[index].cell[0] + 1) < 9){
        nextcell = ((pieces[index].cell[0] + 1) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
            if(pieces[index].cell[0] == 2 ){
                if(isNextCellEmpty(nextcell + 8)){
                    if(!((pieces[index].cell[1]-1) <= 0)){
                        if(!(isNextCellEmpty(nextcell +7))){
                            // console.log(pieces[document.querySelector(`[cellno="${nextcell+7}"]`).childNodes[0].id].type ,
                            // pieces[document.querySelector(`[cellno="${nextcell+7}"]`).childNodes[0].id].color
                            // )
                            if(pieces[document.querySelector(`[cellno="${nextcell+7}"]`).childNodes[0].id].type == 'pawn' &&
                            pieces[document.querySelector(`[cellno="${nextcell+7}"]`).childNodes[0].id].color == 'white'){
                                passant = true
                            }
                        }
                    }
                    if(!((pieces[index].cell[1]+1) > 8)){
                        if(!(isNextCellEmpty(nextcell + 9))){
                            // console.log(pieces[document.querySelector(`[cellno="${nextcell+9}"]`).childNodes[0].id].type ,
                            // pieces[document.querySelector(`[cellno="${nextcell+9}"]`).childNodes[0].id].color 
                            // )
                            if(pieces[document.querySelector(`[cellno="${nextcell+9}"]`).childNodes[0].id].type == 'pawn' &&
                            pieces[document.querySelector(`[cellno="${nextcell+9}"]`).childNodes[0].id].color == 'white'){
                                passant = true
                            }
                        }
                    }
                    posibleCell(nextcell + 8)
                    passant = false;
                }
            }
        }
        if(!((pieces[index].cell[1]-1) <= 0)){
            if(!isNextCellEmpty(nextcell-1)){
                if(isKillable(index , nextcell-1)){
                    killableCell(index , nextcell-1)
                }
            }
            else{
                if((passantCell == nextcell-1) &&  (passantTime == 1)){
                    killableCell(index , nextcell-1)
                }
            }
        }
        if(!((pieces[index].cell[1]+1) > 8)){
            if(!isNextCellEmpty(nextcell+1)){
                if(isKillable(index , nextcell+1)){
                    killableCell(index , nextcell+1)
                }
            }
            else{
                if((passantCell == nextcell+1) &&  (passantTime == 1)){
                    killableCell(index , nextcell+1)
                }
            }
        }
    }
}

//-----------------------possible cells for king-------------------

function possibleCellsking(index){

    if(!checkingForCastling  && !checkingForCheck){
        nextcell = ((pieces[index].cell[0]-1)-1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(!((pieces[index].cell[1]-1)<=0)){
            if(!isKingMoved[curPlayer]){
                if(!isRook1Moved[curPlayer]){
                    // console.log("CHECKING FOR ROOK 1 SIDE")
                    if(isNextCellEmpty(nextcell+7) && isNextCellEmpty(nextcell+6) && isNextCellEmpty(nextcell+5)){
                        castling(nextcell+8 , nextcell+4)
                    }
                }
            }
        }
        nextcell = ((pieces[index].cell[0]-1)-1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(!((pieces[index].cell[1]+1)>8)){
            if(!isKingMoved[curPlayer]){
                if(!isRook2Moved[curPlayer]){
                    // console.log("CHECKING FOR ROOK 2 SIDE")
                    if(isNextCellEmpty(nextcell+9) &&  isNextCellEmpty(nextcell+10)){
                        castling(nextcell+8 , nextcell+11)
                    }
                }
            }
        }
    }
    nextcell = ((pieces[index].cell[0]-1)-1) * 8 + pieces[index].cell[1] + 0 - 1 ;
    if(!((pieces[index].cell[0]-1)<=0)){
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
        }
        if(!((pieces[index].cell[1]-1)<=0)){
            if(isNextCellEmpty(nextcell-1)){
                posibleCell(nextcell-1)
            }
            else if(isKillable(index , nextcell-1)){
                killableCell(index , nextcell-1)
            }
        }
        if(!((pieces[index].cell[1]+1)>8)){
            if(isNextCellEmpty(nextcell+1)){
                posibleCell(nextcell+1)
            }
            else if(isKillable(index , nextcell+1)){
                killableCell(index , nextcell+1)
            }
        }
    }
    if(!((pieces[index].cell[1]-1)<=0)){
        if(isNextCellEmpty(nextcell+7)){
            posibleCell(nextcell+7)
        }
        else if(isKillable(index , nextcell+7)){
            killableCell(index , nextcell+7)
        }
    }
    if(!((pieces[index].cell[1]+1)>8)){
        if(isNextCellEmpty(nextcell+9)){
            posibleCell(nextcell+9)
        }
        else if(isKillable(index , nextcell+9)){
            killableCell(index , nextcell+9)
        }
    }

    if(!((pieces[index].cell[0]+1)>8)){
        nextcell = ((pieces[index].cell[0]+1)-1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
        }
        if(!((pieces[index].cell[1]-1)<=0)){
            if(isNextCellEmpty(nextcell-1)){
                posibleCell(nextcell-1)
            }
            else if(isKillable(index , nextcell-1)){
                killableCell(index , nextcell-1)
            }
        }
        if(!((pieces[index].cell[1]+1)>8)){
            if(isNextCellEmpty(nextcell+1)){
                posibleCell(nextcell+1)
            }
            else if(isKillable(index , nextcell+1)){
                killableCell(index , nextcell+1)
            }
        }
    }
}

//-----------------------possible cells for queen-------------------

function possibleCellsqueen(index){
    i = 1;
    while(pieces[index].cell[0] - i > 0){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] - i > 0 && pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1]  + i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] - i > 0 && pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1]  - i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8 && pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1]  + i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8 && pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1]  - i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] + 0) - 1) * 8 + pieces[index].cell[1]  - i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] + 0) - 1) * 8 + pieces[index].cell[1]  + i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
}

//-----------------------possible cells for rook-------------------

function possibleCellsrook(index){
    i = 1;
    while(pieces[index].cell[0] - i > 0){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1] + 0 - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] + 0) - 1) * 8 + pieces[index].cell[1]  - i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] + 0) - 1) * 8 + pieces[index].cell[1]  + i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
}

//-----------------------possible cells for knight-------------------

function possibleCellsknight(index){
    if(pieces[index].cell[0] - 2 > 0){
        if(pieces[index].cell[1] - 1 > 0){
            nextcell = ((pieces[index].cell[0] - 2) - 1) * 8 + pieces[index].cell[1] - 1 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
        if((pieces[index].cell[1] + 1) <= 8){
            nextcell = ((pieces[index].cell[0] - 2) - 1) * 8 + pieces[index].cell[1] + 1 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
    }
    if(pieces[index].cell[0] + 2 <= 8){
        if(pieces[index].cell[1] - 1 > 0){
            nextcell = ((pieces[index].cell[0] + 2) - 1) * 8 + pieces[index].cell[1] - 1 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
        if(pieces[index].cell[1] + 1 <= 8){
            nextcell = ((pieces[index].cell[0] + 2) - 1) * 8 + pieces[index].cell[1] + 1 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
    }
    if(pieces[index].cell[0] - 1 > 0){
        if(pieces[index].cell[1] - 2 > 0){
            nextcell = ((pieces[index].cell[0] - 1) - 1) * 8 + pieces[index].cell[1] - 2 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
        if(pieces[index].cell[1] + 2 <= 8){
            nextcell = ((pieces[index].cell[0] - 1) - 1) * 8 + pieces[index].cell[1] + 2 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
    }
    if(pieces[index].cell[0] + 1 <= 8){
        if(pieces[index].cell[1] - 2 > 0){
            nextcell = ((pieces[index].cell[0] + 1) - 1) * 8 + pieces[index].cell[1] - 2 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }
        }
        if(pieces[index].cell[1] + 2 <= 8){
            nextcell = ((pieces[index].cell[0] + 1) - 1) * 8 + pieces[index].cell[1] + 2 - 1 ;
            if(isNextCellEmpty(nextcell)){
                posibleCell(nextcell)
            }
            else if(isKillable(index , nextcell)){
                killableCell(index , nextcell)
            }           
        }
    }

}

//-----------------------possible cells for bishop-------------------

function possibleCellsbishop(index){
    i = 1;
    while(pieces[index].cell[0] - i > 0 && pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1]  + i - 1 ; 
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] - i > 0 && pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] - i) - 1) * 8 + pieces[index].cell[1]  - i - 1 ; 
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8 && pieces[index].cell[1] + i <= 8){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1]  + i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
    i = 1;
    while(pieces[index].cell[0] + i <= 8 && pieces[index].cell[1] - i > 0){
        nextcell = ((pieces[index].cell[0] + i) - 1) * 8 + pieces[index].cell[1]  - i - 1 ;
        if(isNextCellEmpty(nextcell)){
            posibleCell(nextcell)
        }
        else if(isKillable(index , nextcell)){
            killableCell(index , nextcell)
            break
        }
        else{
            break
        }
        i++ ;
    }
}

//----------------------------posible & killing funtion--------------------------------

function posibleCell(nc){
    // console.log('checking for check is ' + checkingForCheck)
    if(!checkingForCheck){
        if(passant){
            posiblepassantcell = nc
        }
        allMovableCells.push(nc)
    }
}

function killableCell(index , nc){
    movecell = document.querySelector(`[cellno="${nc}"]`)
    if(checkingForCheck && movecell.innerHTML != ''){
        // console.log(nc)
        // console.log(pieces[parseInt(movecell.childNodes[0].id)])
        // console.log(pieces)
        if(pieces[parseInt(movecell.childNodes[0].id)].type == 'king' && 
        pieces[parseInt(movecell.childNodes[0].id)].color == curPlayer){
            checkPieces.push(index)
        }
    }
    else if(!checkingForCheck){
        allKillableCells.push(nc)
    }
}

//--------------------------------isNextCellEmpty function--------------------------------

function isNextCellEmpty(nextcell){
    if(document.querySelector(`[cellno="${nextcell}`).innerHTML == ''){
        return true;
    }
    else{
        return false;
    }
}

//-----------------------------------isKillable function------------------------------------

function isKillable(index , nextcell){
    if(pieces[index].color != pieces[document.querySelector(`[cellno="${nextcell}"]`).childNodes[0].id].color){
        return true
    }
    else{
        return false
    }
}

//-------------------------------- cell coloring function-------------------------------


function movableCellColor(){
    // console.log(finalKillableCells)
    finalMovableCells.forEach(i => {
        
        movecell = document.querySelector(`[cellno="${i}"]`)
                
        movecell.style.border = '2px solid #00f'
        movecell.style.boxShadow = 'inset 1px 2px 20px  rgb(103, 110, 214)'
    });
}


function killableCellColor(){
    finalKillableCells.forEach(i => {
        movecell = document.querySelector(`[cellno="${i}"]`)
        movecell.style.border = '2px solid #00f'
        movecell.style.boxShadow = 'inset 1px 2px 20px  rgb(193, 24, 24)' 
    });
}

function castibleCellColor(){
    // console.log(allCastlingCells)
    allCastlingCells.forEach(i => {
        movecell = document.querySelector(`[cellno="${i}"]`)
        movecell.style.border = '2px solid #00f'
        movecell.style.boxShadow = 'inset 1px 2px 20px  rgb(39, 148, 6)' 
    });
}

//--------------------------------Checkmate or not function----------------------------

function isCheckmate(){
    checkmate = true;
    for(let i = 0 ; i < alivePieces[curPlayer].length; i++) {

        allMovableCells = []
        finalMovableCells = []
        allKillableCells = []
        finalKillableCells = []
        // console.log(pieces[alivePieces[curPlayer][i]].name)
        movecheck(alivePieces[curPlayer][i])
        // console.log(allMovableCells , allMovableCells)
        pos = pieces[alivePieces[curPlayer][i]].cell
        pc = ((pieces[alivePieces[curPlayer][i]].cell[0] -1)*8) + pieces[alivePieces[curPlayer][i]].cell[1] - 1
        // console.log('================================' + i , pc)
        predictingCellAvail(alivePieces[curPlayer][i] , pc , pos)
        // console.log(finalMovableCells ,  finalKillableCells )
        if(finalMovableCells.length != 0 || finalKillableCells.length != 0){
            checkmate = false
            break;
        }
        allMovableCells = []
        finalMovableCells = []
        allKillableCells = []
        finalKillableCells = []
    }
    allMovableCells = []
    finalMovableCells = []
    allKillableCells = []
    finalKillableCells = []
    if(checkmate){
        console.log('CHECKMATE')
        return true
    }
    else{
        return false
    }

}

//--------------------------------draw or not function----------------------------


function isDraw(){
    draw = false
    if(alivePieces[curPlayer].length>=3 || alivePieces[prePlayer].length>=3){
        notEnoughtforcp = false
        notEnoughtforpp = false
    }
    else if(alivePieces[curPlayer].length == 1 && alivePieces[prePlayer].length == 1){
        notEnoughtforcp = true
        notEnoughtforpp = true
    }
    else{
        if(!notEnoughtforcp){
            if(alivePieces[curPlayer].length == 1){
                notEnoughtforcp = true
            }
            else if(alivePieces[curPlayer].length == 2){
                alivePieces[curPlayer].forEach(i => {
                    if(pieces[parseInt(i)].type == 'bishop' || pieces[parseInt(i)].type == 'knight'){
                        notEnoughtforcp = true
                    }
                });
            }
        }
        if(!notEnoughtforpp){
            if(alivePieces[prePlayer].length == 1){
                notEnoughtforpp = true
            }
            else if(alivePieces[prePlayer].length == 2){
                alivePieces[prePlayer].forEach(i => {
                    if(pieces[pareseInt(i)].type == 'bishop' || pieces[parseInt(i)].type == 'knight'){
                        notEnoughtforpp = true
                    }
                });
            }
        }
    }
    if(notEnoughtforcp && notEnoughtforpp){
        draw = true
    }
    else{
        draw = false
    } 
    console.log(last3moves)
    console.log((last3moves[curPlayer].length) , (last3moves[prePlayer].length))
    if(!draw && (last3moves[curPlayer].length == 6) && (last3moves[prePlayer].length == 6)){
        if((last3moves['black'][0][0] == last3moves['black'][1][0]) && (last3moves['black'][0][0] == last3moves['black'][2][0]) && 
                (last3moves['black'][0][0] == last3moves['black'][3][0]) && (last3moves['black'][0][0] == last3moves['black'][4][0]) && 
                (last3moves['black'][0][0] == last3moves['black'][5][0])){
            if((last3moves['black'][0][1] == last3moves['black'][2][1]) && (last3moves['black'][0][1] == last3moves['black'][4][1]) && 
                (last3moves['black'][1][1] == last3moves['black'][3][1]) && (last3moves['black'][1     ][1] == last3moves['black'][5][1]) ){
                    if((last3moves['white'][0][0] == last3moves['white'][1][0]) && (last3moves['white'][0][0] == last3moves['white'][2][0]) && 
                            (last3moves['white'][0][0] == last3moves['white'][3][0]) && (last3moves['white'][0][0] == last3moves['white'][4][0]) && 
                            (last3moves['white'][0][0] == last3moves['white'][5][0])){
                        if((last3moves['white'][0][1] == last3moves['white'][2][1]) && (last3moves['white'][0][1] == last3moves['white'][4][1]) && 
                            (last3moves['white'][1][1] == last3moves['white'][3][1]) && (last3moves['white'][1][1] == last3moves['white'][5][1]) ){
                                draw = true
                        }
                    }
                    
            }
        }
    }
    if(isCheckmate() || draw){
        draw = true
    }
    if(draw){
        console.log('DRAW')
    }

    return draw
}


//---------------------------------is check function----------------------------


function isCheck(cp , pp){
    checkPieces = []
    checkingForCheck = true;
    // console.log('checking for the check')
    // console.log('allemnemyalivepieces ' +alivePieces[pp])
    // console.log('enemykingpos ' + kingpos[curPlayer])
    for(let i = 0;i < alivePieces[pp].length ; i++){
        if(alivePieces[pp][i] == tempRemovingPiece){
            continue
        }
        // console.log(pieces[alivePieces[pp][i]].name)
        movecheck(alivePieces[pp][i])
    }
    // console.log('checkingpieces '+checkPieces)
    checkingForCheck = false
    
    if(checkPieces.length>0){
        // isinCheck = true;
        // if(!ispredictingmoves){
        //     originalCheck = isinCheck
        // }
        console.log('CHECK')
        
        // findBlockableCells()
        check = true
        return true
    }
    else{
        check = false
        return false
    }
}


//---------------------------------predicting cell availability---------------------------

function predictingCellAvail(ind , c , pos){
    allMovableCells.forEach(i => {
        // console.log('forcell' + i)
        x = parseInt(i/8) + 1
        y = i % 8 + 1
        duplicatepos = [x,y]
        // console.log('duplicatecell' + duplicatepos)
        // console.log( '-----------------------' + c)
        document.querySelector(`[cellno="${i}"]`).innerHTML = document.querySelector(`[cellno="${c}"]`).innerHTML
        document.querySelector(`[cellno="${c}"]`).innerHTML = ''
        pieces[ind].cell = duplicatepos
        if(pieces[ind].type == 'king'){
            kingpos[curPlayer] = duplicatepos
        }
        if(!isCheck(curPlayer , prePlayer)){
            finalMovableCells.push(i)
            // console.log('updating ' + finalMovableCells)
        }
        document.querySelector(`[cellno="${c}"]`).innerHTML = document.querySelector(`[cellno="${i}"]`).innerHTML
        document.querySelector(`[cellno="${i}"]`).innerHTML = ''
        pieces[ind].cell = pos
        if(pieces[ind].type == 'king'){
            kingpos[curPlayer] = pos
        }
    });

    
    allKillableCells.forEach(i => {
        // console.log('forcell '+i)
        x = parseInt(i/8) + 1
        y = i % 8 + 1
        duplicatepos = [x,y]
        // console.log('duplicatecell' + duplicatepos)
        temp = document.querySelector(`[cellno="${i}"]`).innerHTML
        // console.log(i)
        if(document.querySelector(`[cellno="${i}"]`).innerHTML != ''){
            tempRemovingPiece = document.querySelector(`[cellno="${i}"]`).childNodes[0].id
        }
        else{
            if(curPlayer == 'white'){
                tempRemovingPiece = document.querySelector(`[cellno="${i+8}"]`).childNodes[0].id
            }
            else{
                tempRemovingPiece = document.querySelector(`[cellno="${i-8}"]`).childNodes[0].id
            }
        }
        // console.log('tempRemovingPiece' + tempRemovingPiece)
        document.querySelector(`[cellno="${i}"]`).innerHTML = document.querySelector(`[cellno="${c}"]`).innerHTML
        document.querySelector(`[cellno="${c}"]`).innerHTML = ''
        if(clickedPieceColor == 'white'){
            tempcolor = 'black'
        }
        else{
            tempcolor = 'white'
        }
        // alivePieces[tempcolor].splice(alivePieces[tempcolor].indexOf(parseInt(tempRemovingPiece)) , 1)
        // console.log(alivePieces[tempcolor])
        pieces[ind].cell = duplicatepos
        if(pieces[ind].type == 'king'){
            kingpos[curPlayer] = duplicatepos
        }
        if(!isCheck(curPlayer , prePlayer)){
            finalKillableCells.push(i)
            // console.log('updating ' + finalMovableCells)
        }
        document.querySelector(`[cellno="${c}"]`).innerHTML = document.querySelector(`[cellno="${i}"]`).innerHTML
        document.querySelector(`[cellno="${i}"]`).innerHTML = temp
        pieces[ind].cell = pos
        if(pieces[ind].type == 'king'){
            kingpos[curPlayer] = pos
        }
        // alivePieces[tempcolor].push(parseInt(tempRemovingPiece))
        // console.log(alivePieces[tempcolor])
        tempRemovingPiece = -1
    });
}


//------------------------------------SPECIAL MOVES---------------------------------

//----------------------------------Promotion----------------------------------------

function isPromotion(){
    if(pieces[currentIndex].type == 'pawn'){
        if(pieces[currentIndex].color == 'white'){
            if(parseInt(pieces[currentIndex].cell[0]) == 1){
                
            pieces[currentIndex].name = 'whitequeen'
            pieces[currentIndex].type = 'queen'
            pieces[currentIndex].src = 'chess pieces/white queen.png'
            placeImagesOnBoard()
                return true
            }
            else{
                return false
            }
        }
        else if(pieces[currentIndex].color == 'black'){
            if(parseInt(pieces[currentIndex].cell[0]) == 8){
                pieces[currentIndex].name = 'blackqueen'
                pieces[currentIndex].type = 'queen'
                pieces[currentIndex].src = 'chess pieces/black queen.png'
                placeImagesOnBoard()
                return true
            }
            else{
                return false
            }
        }
    }
}

//--------------------------------------castling------------------------------------------

function castling(kc , rc){
    checkingForCastling = true
    if(!checkingForCheck){
        castlingallowed = true;
        tkc = kc
        trc = rc
        if(kc < rc){
            kc = rc
            rc = tkc
        }
        for(let i = 0 ; i < alivePieces[prePlayer].length; i++) {
            allMovableCells = []
            allKillableCells = []
            // console.log(pieces[alivePieces[prePlayer][i]].name)
            movecheck(alivePieces[prePlayer][i])
            // console.log(allMovableCells , allKillableCells)
            for(let j = 0; j < allMovableCells.length; j++){
                if( allMovableCells[j] <= kc && allMovableCells[j] >= rc){
                    castlingallowed = false
                    break;
                }
            }
            for(let j = 0; j < allKillableCells.length; j++){
                if( allKillableCells[j] <= kc && allKillableCells[j] >= rc){
                    castlingallowed = false
                    break;
                }
            }
            
            allMovableCells = []
            allKillableCells = []
            if(!castlingallowed){
                break;
            }
        }
        if(castlingallowed){
            // console.log('CASTLINGALLOWED')
            if(tkc > trc){
                allCastlingCells.push(tkc-2)
            }
            else{
                allCastlingCells.push(tkc+2)
            }
        }
        else{
            // console.log('CASTLING NOT ALLOWED')
        }
    }
    checkingForCastling = false
}

//--------------------------------results------------------------------------------

function results(){
    if(isCheck(curPlayer,prePlayer)){
        statusEle.innerHTML = 'CHECK'
    }
    else{
        statusEle.innerHTML = ''
    }
    if((isCheck(curPlayer , prePlayer) && checkmate)){
        result.innerHTML = prePlayer + '<br>HAD WON THE GAME <br>WOULD YOU LIKE TO PLAY NEW GAME <br>' + newgame
        result.style.visibility = 'visible'
        statusEle.innerHTML = 'CHECKMATE'
    }
    else if((!isCheck(curPlayer , prePlayer) && draw)){
        result.innerHTML = 'THE GAME IS A DRAW <br>WOULD YOU LIKE TO PLAY NEW GAME <br>' + newgame 
        result.style.visibility = 'visible'
        statusEle.innerHTML = 'STALEMATE'
    }
}
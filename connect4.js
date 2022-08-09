/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let temp = [];
   for(let i = 0; i < HEIGHT; i++){      
      for(let j = 0; j< WIDTH; j++){
          temp.push(null);
      }
      board.push(temp)
      temp = []
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
let htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let i = HEIGHT-1; i >=0; i--){
    if(board[i][x] === null){
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let newMove = document.createElement('div')
  let pos = y+"-"+x;
  let targetCell = document.getElementById(pos);
  newMove.classList.add('piece');
  if(currPlayer===1){
    newMove.classList.add('p1')}
  else{
    newMove.classList.add('p2')};
  targetCell.append(newMove);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  full = !board.some(row =>{return row.some(block => {return block === null})})
  if(full){endGame('No Winner!')}
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer===1?currPlayer = 2: currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
  
    let x =  cells.every(
      ([y, x]) =>{
        return y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
      });
    return x;
  }

  // TODO: read and understand this code. Add comments to help you.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];               //check if there is 4 in a row horizontally to the right
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];                //check if there is 4 in a row vertically to the right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];  //check if there is 4 in a row diagonally to the bottom right
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];  //check if there is 4 in a row diagonally to the bottom left
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {        //check to see if any of the combos results in a match
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

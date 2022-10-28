(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  time: "time",
  count: "count",
  grid: "grid",
  pointer: "pointer",
  none: "none",
  block: "block",
  cell: ".cell",
  numberOfRowsString: "numberOfRowsString",
  numberOfColumnsString: "numberOfColumnsString",
  div: "div",
  board: "board",
  cellInitialColor: "cellInitialColor",
  restart: "restart",
  click: "click",
  default: "default",
  remove: "remove",
  add: "add",
  cellAndColor: "cell cellInitialColor",
  inputs: "inputs",
  changeSize: "changeSize",
  changeSizeText: "Change size",
  startGame: "startGame",
  capRestart: "Restart",
};

},{}],2:[function(require,module,exports){
window.changeSize = () => {
  const divInputs = document.getElementById("inputs");
  const divChangeSize = document.getElementById("changeSize");
   const block = "block"
  if (divInputs.style.display === block) {
    divInputs.style.display = "none";
    divChangeSize.innerHTML = "Change size";
  } else {
    divInputs.style.display = block;
  }
};
},{}],3:[function(require,module,exports){
const constants = require("./constants");
const acceptedColor = [
  "yellow",
  "green",
  "blue",
  "orange",
  "black",
  "purple",
  "gray",
  "pink",
];

let colorLength = 0;
const maxTime = 100;
let startTimer;
let timeRemaining;
let time;
let hasGameStarted = false;
let numberOfMoves = 0;

function setTime() {
  timeRemaining = Math.floor(
    (maxTime * 1000 - (new Date().getTime() - startTimer)) / 1000,
  );
  if (timeRemaining <= 0) {
    clearInterval(time);
    modifyEvents(constants.remove);
    document.getElementById(constants.count).innerHTML =
      timeRemaining + ` seconds left!, you lost =) with ${numberOfMoves} move(s)`;
    return;
  }
  document.getElementById(constants.count).innerHTML =
    timeRemaining + ` seconds left! and you did ${numberOfMoves} move(s)`;
}

const displayFinalContent = () => {
  if (hasAllPairs()) {
    const timeDiv = document.getElementById(constants.time);
    timeDiv.style.display = constants.grid;
    timeDiv.innerHTML = `You took ${
      maxTime - timeRemaining
    } second(s) and ${numberOfMoves} moves to complete game`;
    document.getElementById(constants.count).style.display = constants.none;
    document.getElementById(constants.restart).style.display = constants.block;
  }
};

const hasAllPairs = () => {
  const cells = document.querySelectorAll(constants.cell);
  let count = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.length === 3) {
      count++;
    }
  }
  return count === colorLength;
};

const removeElements = (className) => {
  const elements = document.getElementsByClassName(className);
  elements[0].parentNode.removeChild(elements[0]);
};

window.handleOnSubmitInputs = () => {
  const firstInput = parseInt(
    document.getElementById(constants.numberOfRowsString).value,
  );
  const secondInput = parseInt(
    document.getElementById(constants.numberOfColumnsString).value,
  );

  let isPossibleParing = false;

  if (firstInput && secondInput)
    isPossibleParing = checkIfPairingIsPossible(firstInput, secondInput);

  if (isPossibleParing || !(firstInput && secondInput)) {
    removeElements(constants.board);
    stopTime();
    saveClickedCells(-1);
    numberOfMoves = 0;
    start(firstInput, secondInput);
  } else {
    alert(
      `${firstInput} rows and ${secondInput} columns grid cannot be created`,
    );
  }
  const board = document.getElementById(constants.board);
  if (board.style.display === constants.none || !board.style.display) {
    board.style.display = constants.grid;
    document.getElementById("inputs").style.display = constants.none;
    document.getElementById(constants.restart).style.display = constants.none;
  }
  event.preventDefault();
};

const setAllPossibleColors = (averageNumberOfGrid) => {
  const newColors = [];
  let numberOfColors = 0;
  for (let i = 0; i < averageNumberOfGrid; i++) {
    if (acceptedColor[numberOfColors] !== undefined) {
      newColors.push(acceptedColor[numberOfColors]);
      numberOfColors++;
    } else {
      numberOfColors = 0;
    }
  }
  return newColors.concat(newColors);
};

const gridColors = (numberOfRows, numberOfColumns) => {
  const averageNumberOfGrid = (numberOfColumns * numberOfRows) / 2;

  if (!averageNumberOfGrid) return acceptedColor.concat(acceptedColor);

  return setAllPossibleColors(averageNumberOfGrid);
};

class BoardManipulation {
  constructor(numberOfRows, numberOfColumns) {
    this.numberOfColumns = numberOfColumns;
    this.numberOfRows = numberOfRows;
  }
  init() {
    this.setDefaultBoardSize();
    const board = document.createElement(constants.div);
    board.id = constants.board;
    board.classList.add(constants.board);
    board.style.gridTemplateColumns = `repeat(${this.numberOfColumns}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${this.numberOfRows}, 1fr)`;
    return board;
  }
  setDefaultBoardSize() {
    if (!this.numberOfColumns && !this.numberOfRows) {
      this.numberOfColumns = 4;
      this.numberOfRows = 4;
    }
  }
}

const initColorCells = (color, index) => {
  const cell = document.createElement(constants.div);
  cell.classList.add("cell");
  cell.classList.add(constants.cellInitialColor);
  cell.id = color[index];
  cell.addEventListener(constants.click, handleClick);
  return cell;
};

const saveClickedCells = (function () {
  const savedClicked = [];
  return function (event) {
    if (event !== undefined && event !== -1) savedClicked.push(event.target);
    if (event === -1) savedClicked.pop();
    return savedClicked;
  };
})();

function comparePairCells(savedClicked, event) {
  return savedClicked[0].id === event.target.id;
}

function setColor(event) {
  event.target.classList.add(event.target.id);
}

function removeListener(event, savedClicked) {
  if (event !== undefined)
    event.target.removeEventListener(constants.click, handleClick);
  if (savedClicked !== undefined)
    savedClicked[0].removeEventListener(constants.click, handleClick);
}

function addListener(event, savedClicked) {
  if (event !== undefined)
    event.target.addEventListener(constants.click, handleClick);
  savedClicked[0].addEventListener(constants.click, handleClick);
}

function removeCursor(event, savedClicked) {
  if (savedClicked !== undefined)
    savedClicked[0].style.cursor = constants.default;
  if (event !== undefined) event.target.style.cursor = constants.default;
}

function addCursor(event, savedClicked) {
  savedClicked[0].style.cursor = constants.pointer;
  if (event !== undefined) event.target.style.cursor = constants.pointer;
}

function setDefaultColor(event, savedClicked) {
  event.target.classList.add(constants.cellInitialColor);
  savedClicked[0].classList.add(constants.cellInitialColor);
  event.target.classList.remove(event.target.id);
  savedClicked[0].classList.remove(savedClicked[0].id);
}

const modifyEvents = (event) => {
  const cells = document.querySelectorAll(constants.cell);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.value === constants.cellAndColor) {
      if (event === constants.remove) {
        removeCursor(undefined, [cells[i]]);
        removeListener(undefined, [cells[i]]);
      }
      if (event === constants.add) {
        addListener(undefined, [cells[i]]);
        addCursor(undefined, [cells[i]]);
      }
    }
  }
};

const startTime = () => {
  document.getElementById(constants.time).style.display = constants.none;
  document.getElementById(constants.count).style.display = constants.grid;
  startTimer = new Date().getTime();
  time = setInterval(setTime, 100);
};

const stopTime = () => {
  document.getElementById(constants.time).style.display = constants.none;
  document.getElementById(constants.count).style.display = constants.none;
  document.getElementById(constants.count).innerHTML = "";
  clearInterval(time);
  startTimer = "";
  hasGameStarted = false;
};

function handleClick(event) {
  if (!hasGameStarted) {
    startTime();
    hasGameStarted = true;
  }

  const savedClicks = saveClickedCells();
  numberOfMoves++;
  let samePair = false;
  if (savedClicks.length > 0) {
    samePair = comparePairCells(savedClicks, event);
  } else {
    removeListener(event);
    removeCursor(event);
    setColor(event);
    saveClickedCells(event);
    return;
  }

  if (samePair) {
    removeListener(event, savedClicks);
    removeCursor(event, savedClicks);
    setColor(event);
    saveClickedCells(-1);
    displayFinalContent();
  } else {
    setColor(event);
    modifyEvents(constants.remove);
    setTimeout(() => {
      setDefaultColor(event, savedClicks);
      addListener(event, savedClicks);
      addCursor(event, savedClicks);
      saveClickedCells(-1);
      modifyEvents(constants.add);
    }, 500);
  }
}

const checkIfPairingIsPossible = (numberOfRows, numberOfColumns) => {
  if (numberOfColumns <= 0 || numberOfRows <= 0) return;

  if (numberOfColumns * numberOfRows > acceptedColor.length * 2) return;

  return (numberOfColumns * numberOfRows) % 2 === 0;
};

window.start = (numberOfRows = 4, numberOfColumns = 4) => {
  const boardManipulation = new BoardManipulation(
    numberOfRows,
    numberOfColumns,
  );
  const board = boardManipulation.init();

  const multiplyColor = gridColors(numberOfRows, numberOfColumns);

  const color = [...multiplyColor.sort(() => 0.5 - Math.random())];
  colorLength = color.length;

  for (let i = 0; i < colorLength; i++) {
    const cell = initColorCells(color, i);
    board.appendChild(cell);
  }
  document.getElementsByTagName("body")[0].append(board);
};
module.exports = {
  acceptedColor,
  gridColors,
  setAllPossibleColors,
  checkIfPairingIsPossible,
  setDefaultColor,
  addCursor,
  removeCursor,
  removeListener,
  setColor,
  comparePairCells,
  saveClickedCells,
  handleClick,
  initColorCells,
  BoardManipulation,
  handleOnSubmitInputs,
  setTime,
  startTime,
  stopTime,
  displayFinalContent,
  hasAllPairs,
};

},{"./constants":1}]},{},[1,2,3]);

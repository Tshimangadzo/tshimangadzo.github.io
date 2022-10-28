const fs = require("fs");
const jsdom = require("jsdom");
const script = require("../src/script");
const constants = require("../src/constants");

describe("Script module", function () {
  const index = fs.readFileSync("./index.html", "utf8");
  const dom = new jsdom.JSDOM(index);
  beforeEach(function () {
    global.document = dom.window.document;
    global.window = dom.window;
    global.navigator = dom.window.navigator;
  });

  describe("Board manipulation class", function () {
    let board;
    let div;
    beforeEach(function () {
      board = new script.BoardManipulation();
      div = document.createElement(constants.div);
      div.id = "board";
      div.style.gridTemplateColumns = `repeat(${4}, 1fr)`;
      div.style.gridTemplateRows = `repeat(${4}, 1fr)`;
      div.classList.add("board");
    });

    describe("init function", function () {
      it("should create div new element", function () {
        expect(board.init()).toEqual(div);
      });
      it("should add id named board", function () {
        expect(board.init().id).toEqual(div.id);
      });
      it("should add board class", function () {
        expect(board.init().className).toEqual(div.className);
      });
    });
  });

  describe("Cell manipulation class", function () {
    let cell;
    const color = ["red", "blue", "brown"];
    let mockCell;
    beforeEach(function () {
      mockCell = document.createElement(constants.div);
      mockCell.classList.add("cell");
      mockCell.classList.add(constants.cellInitialColor);
      mockCell.id = color[1];
      mockCell.addEventListener(constants.click, script.handleClick);
      cell = script.initColorCells(color, 1);
    });

    describe("init function", function () {
      it("should create div new element", function () {
        expect(cell).toEqual(mockCell);
      });
      it("should add cell, cell initial color,and color class", function () {
        expect(cell.className).toEqual(mockCell.className);
      });
    });
  });
  describe("save clicked cells function", function () {
    let pointerEvent;
    beforeEach(() => {
      pointerEvent = {
        target: "div.cell.cellInitialColor.yellow",
      };
    });

    it("should return empty array when event is equal -1", () => {
      const savedClick = script.saveClickedCells(-1);
      expect(savedClick).toEqual([]);
    });

    it("should return empty array when event is equal undefined", () => {
      const savedClick = script.saveClickedCells();
      expect(savedClick).toEqual([]);
    });

    it("should return array with one event when there is only one event clicked", () => {
      const savedClick = script.saveClickedCells(pointerEvent);
      expect(savedClick).toEqual([pointerEvent.target]);
    });

    it("should return array with two event when there is second event clicked", () => {
      const savedClick = script.saveClickedCells(pointerEvent);
      expect(savedClick).toEqual([pointerEvent.target, pointerEvent.target]);
    });
  });

  describe("compare pair cells ", function () {
    let pointerEvent;
    beforeEach(function () {
      pointerEvent = {
        target: {
          classList: {
            value: constants.cellAndColor,
          },
          id: "blue",
        },
      };
    });

    it("should return false if two event are not equal", function () {
      const savedEvent = [
        {
          classList: {
            value: constants.cellAndColor + " red",
          },
        },
      ];
      const isSame = script.comparePairCells(savedEvent, pointerEvent);
      expect(isSame).toEqual(false);
    });
    it("should return true if two event are equal", function () {
      const savedEvent = [
        {
          classList: {
            value: constants.cellAndColor,
          },
          id: "blue",
        },
      ];
      const isSame = script.comparePairCells(savedEvent, pointerEvent);
      expect(isSame).toEqual(true);
    });
  });

  describe("Set color function", function () {
    let pointerEvent;
    beforeEach(function () {
      pointerEvent = {
        target: {
          classList: {
            0: "cell",
            1: constants.cellInitialColor,
            remove: () => {},
            add: () => {},
          },
          style: {
            backGroundColor: "red",
          },
          id: "blue",
        },
      };
    });

    it("should change background of event", function () {
      script.setColor(pointerEvent);
      expect(pointerEvent.target.style.backgroundColor).toBe(
        pointerEvent.target.classList[2],
      );
    });
  });

  describe("remove cursor function", () => {
    let pointerEvent, savedEvent;
    beforeEach(function () {
      pointerEvent = {
        target: {
          style: {
            cursor: constants.pointer,
          },
        },
      };

      savedEvent = [
        {
          style: {
            cursor: constants.pointer,
          },
        },
      ];
    });

    it("should set second clicked event style to default", () => {
      script.removeCursor(pointerEvent);
      expect(pointerEvent.target.style.cursor).toEqual(constants.default);
    });

    it("should set first clicked event to default", () => {
      script.removeCursor(pointerEvent, savedEvent);
      expect(savedEvent[0].style.cursor).toEqual(constants.default);
    });
  });

  describe("add cursor function", () => {
    let pointerEvent, savedEvent;
    beforeEach(function () {
      pointerEvent = {
        target: {
          style: {
            cursor: constants.default,
          },
        },
      };

      savedEvent = [
        {
          style: {
            cursor: constants.default,
          },
        },
      ];
    });

    it("should set first and second clicked event to pointer", () => {
      script.addCursor(pointerEvent, savedEvent);
      expect(savedEvent[0].style.cursor).toEqual(constants.pointer);
      expect(pointerEvent.target.style.cursor).toEqual(constants.pointer);
    });
  });

  describe("set default color function", () => {
    let pointerEvent, savedEvent;
    beforeEach(function () {
      pointerEvent = {
        target: {
          style: {
            backgroundColor: "someColor1",
          },
          classList: {
            add: () => {},
            remove: () => {},
          },
        },
      };

      savedEvent = [
        {
          style: {
            backgroundColor: "someColor2",
          },
          classList: {
            add: () => {},
            remove: () => {},
          },
        },
      ];
    });

    it("should set first and second clicked event background to default color brown", () => {
      script.setDefaultColor(pointerEvent, savedEvent);
      expect(savedEvent[0].style.backgroundColor).toEqual("someColor2");
      expect(pointerEvent.target.style.backgroundColor).toEqual("someColor1");
    });
  });

  describe("Check if pairing is possible function", () => {
    it("Should return true when summation numbers of rows and columns is odd", () => {
      expect(script.checkIfPairingIsPossible(2, 3)).toEqual(true);
    });
    it("Should return false when summation numbers of rows and columns is even", () => {
      expect(script.checkIfPairingIsPossible(3, 3)).toEqual(false);
    });
  });

  describe("set all possible colors function", () => {
    it("Should return the combination of average number times two", () => {
      expect(script.setAllPossibleColors(2).length).toEqual(4);
    });

    it("Should return the first colors from accepted color array depending on size", () => {
      const colors = [
        script.acceptedColor[0],
        script.acceptedColor[1],
        script.acceptedColor[0],
        script.acceptedColor[1],
      ];
      expect(script.setAllPossibleColors(2)).toEqual(colors);
    });
  });

  describe("Grid colors function", () => {
    it("Should returned 16 colors by default if number of columns and rows are not defined", () => {
      expect(script.gridColors().length).toEqual(16);
    });
  });

  describe("Set time function", () => {
    beforeAll(() => {
      this.element = document.getElementById(constants.count);
      script.startTime();
      script.setTime();
    });

    it("Should start to display time", () => {
      expect(this.element.innerHTML).not.toEqual("");
      expect(this.element.style.display).toEqual("grid");
    });

    it("Should includes number of moves",()=>{
      expect(this.element.innerHTML).toContain('seconds left! and you did')
    })

    it("Should stop displaying time", () => {
      script.stopTime();
      expect(this.element.innerHTML).toEqual("");
      expect(this.element.style.display).toEqual("none");
    });
  });

  describe("Display final content", () => {
    beforeAll(() => {
      this.time = document.getElementById(constants.time);
      spyOn(script,'hasAllPairs').and.returnValue(true)
    });

    it("Should includes moves when game is done", () => {
      script.displayFinalContent()
      expect(this.time.innerHTML).not.toEqual("");
      expect(this.time.style.display).toEqual("grid");
      expect(this.time.innerHTML).toContain(' moves to complete game')
    });
  });

});

const semitone = require("../src/semitone");
const fs = require("fs");
const domSupport = require("../src/domSupport");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const constants = require("../src/constants");

const dom = new JSDOM(fs.readFileSync("./index.html", "utf-8"));
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

const streakContent = () =>
  dom.window.document.querySelector("#streak").textContent;
const resultsContent = () =>
  dom.window.document.querySelector(".results").textContent;

describe("Display notes function", () => {
  beforeEach(() => {
    spyOn(semitone, "JamBuddy").and.returnValue({ selectNotes: () => {} });
    const jamBuddy = new semitone.JamBuddy();
    spyOn(jamBuddy, "selectNotes").and.returnValue(["A", "C"]);
    domSupport.displayNotes();
  });

  it("should set notes to index.html", () => {
    expect(resultsContent()).toEqual(
      "Write number of notes between note A and C",
    );
  });

  it("Should set streak to the previous streak", () => {
    expect(streakContent()).toEqual(constants.streak + ` : ` + 0);
    domSupport.streakManipulation(constants.state.add);
    expect(streakContent()).toEqual(constants.streak + ` : ` + 1);
    domSupport.displayNotes();
    expect(streakContent()).toEqual(constants.streak + ` : ` + 1);
    domSupport.streakManipulation(constants.state.remove);
    expect(streakContent()).toEqual(constants.streak + ` : ` + 0);
    domSupport.displayNotes();
    expect(streakContent()).toEqual(constants.streak + ` : ` + 0);
  });
});

describe("submit inputs function", () => {
  let jamBuddy;
  beforeEach(() => {
    spyOn(semitone, "JamBuddy").and.returnValue({
      selectNotes: () => {},
      checkAnswer: () => {},
      calculateSemiTones: () => {},
    });
    jamBuddy = new semitone.JamBuddy();
    spyOn(jamBuddy, "selectNotes").and.returnValue(["A", "B"]);
    jamBuddy.selectNotes();
    domSupport.displayNotes();
  });
  it("should set You got it right .Well Done! when answer is right", () => {
    spyOn(jamBuddy, "checkAnswer").and.returnValue(true);
    domSupport.submitInputs();
    expect(dom.window.document.querySelector("#output").textContent).toEqual(
      "You got it right .Well Done!",
    );
  });
  it("should set Wrong answer! Try again when answer is wrong", () => {
    spyOn(jamBuddy, "checkAnswer").and.returnValue(false);
    domSupport.submitInputs();
    expect(dom.window.document.querySelector("#output").textContent).toEqual(
      "Wrong answer! Try again",
    );
  });
});

describe("Streak manipulation", () => {
  it("Should increment streak when called with parameter add", () => {
    domSupport.streakManipulation(constants.state.add);
    expect(streakContent()).toEqual(constants.streak + ` : ` + 1);
    domSupport.streakManipulation(constants.state.add);
    expect(streakContent()).toEqual(constants.streak + ` : ` + 2);
  });

  it("Should set streak to zero when called with parameter remove", () => {
    domSupport.streakManipulation(constants.state.remove);
    expect(streakContent()).toEqual(constants.streak + ` : ` + 0);
  });
});

describe("Reveal notes function", () => {
  beforeEach(() => {
    spyOn(semitone, "JamBuddy").and.returnValue({
      selectNotes: () => {},
      calculateSemiTones: () => {},
    });
    jamBuddy = new semitone.JamBuddy();
    spyOn(jamBuddy, "selectNotes").and.returnValue(["A", "B"]);
    jamBuddy.selectNotes();
    domSupport.displayNotes();
  });
  it("Should set the correct results", () => {
    spyOn(jamBuddy, "calculateSemiTones");
    domSupport.revealNotes();
    expect(resultsContent()).toEqual(
      constants.outputMessage(jamBuddy.calculateSemiTones(), constants.reveal),
    );
  });
});
const semitone = require("../src/semitone");

describe("Select notes function", () => {
  let jamBuddy;
  beforeEach(() => {
    jamBuddy = new semitone.JamBuddy();
  });
  it("Should select two notes", () => {
    expect(jamBuddy.selectNotes().length).toEqual(2);
  });
});

describe("Check answer function", () => {
  let jamBuddy;
  beforeEach(() => {
    jamBuddy = new semitone.JamBuddy();
  });

  it("should call calculate semi tones function", () => {
    spyOn(jamBuddy, "calculateSemiTones");
    jamBuddy.selectNotes();
    jamBuddy.checkAnswer();
    expect(jamBuddy.calculateSemiTones).toHaveBeenCalled();
  });

  it("should return true when calculated semitones is equal to number of semitones passed", () => {
    spyOn(jamBuddy, "calculateSemiTones").and.returnValue(3);
    jamBuddy.selectNotes();
    expect(jamBuddy.checkAnswer(3)).toEqual(true);
  });

  it("should return false when calculated semitones is not equal to number of semitones passed", () => {
    spyOn(jamBuddy, "calculateSemiTones").and.returnValue(3);
    jamBuddy.selectNotes();
    expect(jamBuddy.checkAnswer(1)).toEqual(false);
  });

  it("should throw new Error when no notes selected", () => {
    expect(() => jamBuddy.checkAnswer(6)).toThrowError(
      "No tones were selected",
    );
  });

  it("should calculate flat and normal tones", () => {
    jamBuddy.firstSelectedTone = "Bb";
    jamBuddy.secondSelectedTone = "F";
    expect(jamBuddy.calculateSemiTones()).toEqual(7);
    expect(jamBuddy.checkAnswer(7)).toEqual(true);
  });

  it("should calculate the sharp and flat tones", () => {
    jamBuddy.firstSelectedTone = "A#";
    jamBuddy.secondSelectedTone = "Db";
    expect(jamBuddy.calculateSemiTones()).toEqual(3);
    expect(jamBuddy.checkAnswer(3)).toEqual(true);
  });

  it("should calculate the sharp and normal tones", () => {
    jamBuddy.firstSelectedTone = "A#";
    jamBuddy.secondSelectedTone = "D";
    expect(jamBuddy.calculateSemiTones()).toEqual(4);
    expect(jamBuddy.checkAnswer(4)).toEqual(true);
  });
  it("should calculate tones that have same index", () => {
    jamBuddy.firstSelectedTone = "Eb";
    jamBuddy.secondSelectedTone = "D#";
    expect(jamBuddy.calculateSemiTones()).toEqual(0);
    expect(jamBuddy.checkAnswer(0)).toEqual(true);
  });
});

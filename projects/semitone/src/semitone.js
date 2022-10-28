const { tonesList } = require("./tonesList");

class JamBuddy {
  firstSelectedTone = undefined;
  secondSelectedTone = undefined;

  randomNumber(listOfTones) {
    return Math.floor(Math.random() * listOfTones.length);
  }

  indexOfNotes = (tone) => {
    for (let i = 0; i < tonesList.length; i++) {
      if (tonesList[i].includes(tone)) {
        return i;
      }
    }
  };

  calculateSemiTones = () => {
    let indexOfFirstSelectedNote = tonesList.indexOf(this.firstSelectedTone);
    let indexOfSecondSelectedNote = tonesList.indexOf(this.secondSelectedTone);

    if (indexOfFirstSelectedNote === -1)
      indexOfFirstSelectedNote = this.indexOfNotes(this.firstSelectedTone);

    if (indexOfSecondSelectedNote === -1)
      indexOfSecondSelectedNote = this.indexOfNotes(this.secondSelectedTone);

    return indexOfFirstSelectedNote > indexOfSecondSelectedNote
      ? tonesList.length - indexOfFirstSelectedNote + indexOfSecondSelectedNote
      : indexOfSecondSelectedNote - indexOfFirstSelectedNote;
  };

  selectNotes = () => {
    this.firstSelectedTone = tonesList[this.randomNumber(tonesList)];
    this.secondSelectedTone = tonesList[this.randomNumber(tonesList)];
    while (this.firstSelectedTone === this.secondSelectedTone)
      this.secondSelectedTone = tonesList[this.randomNumber(tonesList)];

    if (typeof this.firstSelectedTone !== "string")
      this.firstSelectedTone =
        this.firstSelectedTone[this.randomNumber(this.firstSelectedTone)];

    if (typeof this.secondSelectedTone !== "string")
      this.secondSelectedTone =
        this.secondSelectedTone[this.randomNumber(this.secondSelectedTone)];

    return [this.firstSelectedTone, this.secondSelectedTone];
  };

  checkAnswer = (numberOfSemiTones) => {
    if (!this.firstSelectedTone || !this.secondSelectedTone)
      throw new Error("No tones were selected");
    return this.calculateSemiTones() === parseInt(numberOfSemiTones);
  };
}

module.exports = { JamBuddy };

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  inputs: "inputs",
  answer: "answer",
  answerBtn: "answerBtn",
  outputs: "outputs",
  results: "results",
  block: "block",
  rightAnswer: "You got it right .Well Done!",
  wrongAnswer: "Wrong answer! Try again",
  output: "output",
  reveal: "reveal",
  outputMessage: (answer, identifier = undefined) => {
    if (identifier === "reveal") return `The correct answer is ${answer}`;
    return `Write number of notes between note ${answer[0]} and ${answer[1]}`;
  },
  revealNotes: "notes",
  id: "explanation",
  div: "div",
  flex: "flex",
  none: "none",
  colors: { red: "red", green: "green", blue: "blue" },
  streak: "Streak",
  state: { add: "add", remove: "remove" },
};

},{}],2:[function(require,module,exports){
const semitone = require("./semitone");
const constants = require("./constants");
const {tonesList} = require('./tonesList') 

let jamBuddy,
  selectedNotes,
  reveal,
  outputs,
  answer,
  inputs,
  results,
  streak = 0,
  streakDiv,
  answerBtn;

window.displayNotes = () => {
  jamBuddy = new semitone.JamBuddy();
  selectedNotes = jamBuddy.selectNotes();

  results = document.getElementById(constants.results);
  results.innerHTML = constants.outputMessage(selectedNotes);

  inputs = document.getElementById(constants.inputs);
  inputs.style.display = constants.block;

  answer = document.getElementById(constants.answer);
  answer.disabled = false;

  answerBtn = document.getElementById(constants.answerBtn);
  answerBtn.disabled = false;
  outputs = document.getElementById(constants.outputs);
  outputs.style.display = constants.none;

  document.getElementById(constants.answer).value = "";
  reveal = document.getElementById(constants.revealNotes);
  reveal.innerHTML = "";

  streakDiv = document.getElementById(constants.streak.toLowerCase());
  streakManipulation();
};

const addChildren = () => {
  for (let i = 0; i < tonesList.length; i++) {
    const child = document.createElement(constants.div);
    child.id = constants.id;
    child.innerHTML = tonesList[i];
    if (
      tonesList[i].includes(selectedNotes[0]) ||
      tonesList[i].includes(selectedNotes[1])
    )
      child.style.backgroundColor = constants.colors.blue;
    reveal.appendChild(child);
  }
};

window.revealNotes = () => {
  reveal.innerHTML = "";
  reveal.style.display = constants.flex;
  inputs.style.display = constants.none;
  results.innerHTML = constants.outputMessage(
    jamBuddy.calculateSemiTones(),
    constants.reveal,
  );
  addChildren();
};

const streakManipulation = (state) => {
  streak =
    state === constants.state.add
      ? (streak += 1)
      : state === constants.state.remove
      ? 0
      : streak;
  streakDiv.innerHTML = constants.streak + ` : ` + streak;
};

window.submitInputs = () => {
  outputs.style.display = constants.block;
  const output = document.getElementById(constants.output);

  if (!jamBuddy.checkAnswer(answer.value)) {
    output.innerHTML = constants.wrongAnswer;
    output.style.color = constants.colors.red;
    streakManipulation(constants.state.remove);
    return;
  }
  revealNotes();
  streakManipulation(constants.state.add);
  output.innerHTML = constants.rightAnswer;
  output.style.color = constants.colors.green;
  answer.disabled = true;
  answerBtn.disabled = true;
};

module.exports = {
  displayNotes,
  submitInputs,
  revealNotes,
  streakManipulation,
  addChildren
};

},{"./constants":1,"./semitone":3,"./tonesList":4}],3:[function(require,module,exports){
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

},{"./tonesList":4}],4:[function(require,module,exports){
module.exports = {
  tonesList: [
    "A",
    ["A#", "Bb"],
    "B",
    "C",
    ["C#", "Db"],
    "D",
    ["D#", "Eb"],
    "E",
    "F",
    ["F#", "Gb"],
    "G",
    ["G#", "Ab"],
  ],
};

},{}]},{},[1,4,3,2]);

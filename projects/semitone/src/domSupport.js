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

const displayNotes = () => {
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

const revealNotes = () => {
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

const submitInputs = () => {
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

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

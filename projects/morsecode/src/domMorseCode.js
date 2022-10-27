const constants = require("./constants");
const morseCodes = require("./morseCode");

window.isLetter = () => {
  const inputText = document.getElementById("input_text");
  return inputText.placeholder === constants.letterToMorseCode;
};

window.isMorseCode = () => {
  const inputText = document.getElementById("input_text");
  return inputText.placeholder === constants.morseToLetters;
};

window.setPlaceHolder = () => {
  const inputText = document.getElementById("input_text");
  if (isLetter()) {
    inputText.placeholder = constants.morseToLetters;
    convertInput();
    return;
  }
  inputText.placeholder = constants.letterToMorseCode;
  convertInput();
};

window.setValue = (result) => {
  document.getElementById(constants.output).innerHTML = result.textOutput;
  const colors = {
    color: constants.green,
    backgroundColor: constants.orange,
  };
  if (
    result.textOutput === constants.fillInput ||
    result.textOutput === "" ||
    result.existError
  ) {
    colors.color = constants.red;
    colors.backgroundColor = constants.orange;
  }
  document.getElementById(constants.output).style.color = colors.color;
  document.getElementById(constants.outputs).style.backgroundColor =
    colors.backgroundColor;
};

window.convertInput = () => {
  const inputText = document.getElementById("input_text");
  const result = {
    textOutput: constants.fillInput,
    existError: false,
  };
  try {
    if (isLetter()) {
      result.textOutput = morseCodes.lettersToMorseCode(`${inputText.value}`);
    }
    if (isMorseCode()) {
      result.textOutput = morseCodes.morseCodeToLetters(`${inputText.value}`);
    }
  } catch (error) {
    result.textOutput = error;
    result.existError = true;
  }
  setValue(result);
};

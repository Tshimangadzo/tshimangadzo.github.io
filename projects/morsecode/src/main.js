(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  Error: "........",
  "&": ".-...",
  "'": ".----.",
  "@": ".--.-.",
  ")": "-.--.-",
  "(": "-.--.",
  ":": "---...",
  ",": "--..--",
  "=": "-...-",
  "!": "-.-.--",
  ".": ".-.-.-",
  "-": "-....-",
  "*": "-..-",
  "+": ".-.-.",
  '"': ".-..-.",
  "?": "..--..",
  "/": "-..-.",
  "%": "------..-.-----",
};

},{}],2:[function(require,module,exports){
module.exports = {
  letterToMorseCode: "Letters to morse code",
  morseToLetters: "Morse code to letters",
  output: "output",
  fillInput: "Please fill out the input(s)",
  red: "red",
  green: "green",
  outputs: "outputs",
  orange: "orange",
  black: "black",
  selectTranslation: "Select translation",
};

},{}],3:[function(require,module,exports){
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

},{"./constants":2,"./morseCode":4}],4:[function(require,module,exports){
const morseCodes = require("./codes")

const isValidLetters = (letters) => {
  const validate = { isValid: true, errCharacter: "" };
  const copyMorseCodes = { ...morseCodes };
  letters.split(" ").forEach((element) => {
    for (let i = 0; i < element.length; i++) {
      if (!copyMorseCodes[element[i].toLowerCase()]) {
        validate.isValid = false;
        validate.errCharacter += element[i] + " ";
        break;
      }
    }
  });
  validate.errCharacter = validate.errCharacter.trim();
  return validate;
};

const isValidMorseCode = (morseCode) => {
  const validate = { isValid: true, errCharacter: "" };
  if (morseCode !== undefined && morseCode.length > 0)
    morseCode.match(/[^./-]/g).forEach((element) => {
      if (element !== " ") {
        validate.isValid = false;
        validate.errCharacter += element + " ";
      }
    });
  validate.errCharacter = validate.errCharacter.trim();
  return validate;
};

const isSameNumberOfCharacter = (input, output) => {
  const letterInput = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") letterInput.push(input[i]);
  }
  const letterOutput = output.split(" ");
  for (let i = 0; i < letterOutput.length; i++) {
    if (letterOutput[i] === "/") {
      letterOutput.splice(i, 1);
      i--;
    }
  }
  const sameNumberOfCharacter = letterInput.length === letterOutput.length;
  console.assert(
    sameNumberOfCharacter,
    (errMessage = "Number of character are not equal"),
  );

  return sameNumberOfCharacter;
};

const isRightNumberOfSpaces = (input, output) => {
  const spacesMap = {
    letter: 0,
    morse: 0,
  };

  for (let i = 0; i < input.length; i++) {
    if (input[i] === " ") {
      spacesMap["letter"]++;
    }
  }
  for (let i = 0; i < output.length; i++) {
    if (output[i] === "/") {
      spacesMap["morse"]++;
    }
  }
  const rightNumberOfSpaces = spacesMap["letter"] === spacesMap["morse"];
  console.assert(
    rightNumberOfSpaces
    ,
    (errMessage = "Number of spaces are not equal"),
  );
  return rightNumberOfSpaces;
};

const lettersToMorseCode = (letters) => {
  const validateLetters = isValidLetters(letters);
  const copyMorseCodes = { ...morseCodes };
  if (!validateLetters.isValid) {
    throw `Letters contains '${validateLetters.errCharacter}' character(s).`;
  }

  let storeMorseCode = "";
  for (let index = 0; index < letters.length; index++) {
    if (letters[index] !== " ") {
      storeMorseCode += copyMorseCodes[letters[index].toLowerCase()];
      if (index < letters.length - 1) storeMorseCode += " ";
    } else {
      storeMorseCode += "/ ";
    }
  }
  const sameNumberOfCharacter = isSameNumberOfCharacter(letters, storeMorseCode);
  const rightNumberOfSpaces = isRightNumberOfSpaces(letters, storeMorseCode);

  return !sameNumberOfCharacter || !rightNumberOfSpaces ? "" : storeMorseCode;
};

const morseCodeToLetters = (morseCode) => {
  const validateMorseCode = isValidMorseCode(morseCode);
  const copyMorseCodes = { ...morseCodes };
  if (!validateMorseCode.isValid) {
    throw `Morse code contains '${validateMorseCode.errCharacter}' character(s).`;
  }
  let storeLetters = "";
  const storeMorseCode = morseCode.split(" ");
  for (let i = 0; i < storeMorseCode.length; i++) {
    for (let morse in copyMorseCodes) {
      if (storeMorseCode[i] === copyMorseCodes[morse]) storeLetters += morse;
    }
    if (storeMorseCode[i] === "/") storeLetters += " ";
  }

  const sameNumberOfCharacter = isSameNumberOfCharacter(storeLetters, morseCode);
  const rightNumberOfSpaces = isRightNumberOfSpaces(storeLetters, morseCode);
  return !sameNumberOfCharacter || !rightNumberOfSpaces ? "" : storeLetters;
};

module.exports = {
  lettersToMorseCode,
  morseCodeToLetters,
  isValidLetters,
  isSameNumberOfCharacter,
  isRightNumberOfSpaces,
  isValidMorseCode,
};

},{"./codes":1}]},{},[1,2,3,4]);

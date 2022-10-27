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

const changeSize = () => {
  const divInputs = document.getElementById("inputs");
  const divChangeSize = document.getElementById("changeSize");
   const block = "block"
  if (divInputs.style.display === block) {
    divInputs.style.display = "none";
    divChangeSize.innerHTML = "Change size";
  } else {
    divInputs.style.display = block;
  }
};
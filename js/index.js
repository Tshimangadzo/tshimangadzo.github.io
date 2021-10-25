
const getListFromIcon = () => {
  let topNav = document.getElementById("header");
  let list = document.getElementById("otherContent");
  if (list.className == "otherContent") {
    list.className += "Resposive";
    topNav.className += "Responsive";
  } else {
    list.className = "otherContent";
    topNav.className = "header";
  }
};

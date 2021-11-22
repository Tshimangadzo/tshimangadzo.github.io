

const showData = (tabClicked) => {
  const myTabs = [
    {
      tabName: "skills",
      isClicked: false,
    },
    {
      tabName: "contact",
      isClicked: false,
    },
    {
      tabName: "about",
      isClicked: false,
    },
    {
      tabName: "projects",
      isClicked: false,
    },
  ];

  let isTabClicked = myTabs.map((x) => {
    if (x.tabName === tabClicked) x.isClicked = true;
    return x;
  });

 isTabClicked.forEach(tab =>{
  if (tab.isClicked) {
    document.getElementById(tab.tabName).style.display = "grid";
  } else {
    document.getElementById(tab.tabName).style.display = "none";
  }
 })

};

const getListFromIcon = () => {
  const topNav = document.getElementById("header");
  const list = document.getElementById("otherContent");

  if (list.className == "otherContent") {
    list.className += "Resposive";
    topNav.className += "Responsive";
  } else {
    list.className = "otherContent";
    topNav.className = "header";
  }
  console.log("I am in")
};

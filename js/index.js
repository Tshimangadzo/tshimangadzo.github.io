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

  const isTabClicked = myTabs.map((x) => {
    if (x.tabName === tabClicked) x.isClicked = true;
    return x;
  });

  isTabClicked.forEach((tab) => {
    if (tab.isClicked) {
      document.getElementById(tab.tabName).style.display = "grid";
      document.getElementById(tab.tabName + "Tab").style.backgroundColor =
        "#D3D3D3";
    } else {
      document.getElementById(tab.tabName).style.display = "none";
      document.getElementById(tab.tabName + "Tab").style.backgroundColor =
        "gray";
    }
  });
};

const getListFromIcon = () => {
  const topNav = document.getElementById("header");
  const list = document.getElementById("otherContent");
  const content = document.getElementById("content");
  const displayIcon = document.getElementById("icon");
  const cancelIcon = document.getElementById("cancelIcon");

  if (list.className === "otherContent") {
    list.className += "Responsive";
    topNav.className += "Responsive";
    content.className = "responsiveContent" + " " + content.className;
    displayIcon.style.display = "None";
    cancelIcon.style.display = "grid";
  } else {
    list.className = "otherContent";
    topNav.className = "header";
    content.className = "content";
    displayIcon.style.display = "grid";
    cancelIcon.style.display = "None";
  }
};

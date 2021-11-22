const showData = (tabClicked) => {
  let myTabs = [
    {
      tabName: "contactMe",
      isClicked: false,
    },
    {
      tabName: "aboutMe",
      isClicked: false,
    },
  ];
  let m = myTabs.map((x) => {
    if (x.tabName === tabClicked) x.isClicked = true;
    return x;
  });

  return m;
};

console.log(showData("aboutMe"));

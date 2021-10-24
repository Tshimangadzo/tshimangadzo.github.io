
const getContactMe =() => {
    let contactMe = document.getElementById("contactMe")
    if(contactMe.style.display === "none"){
        document.getElementById("aboutMe").style.display = "none";
        document.getElementById("contactMe").style.display = "grid";
    }
}

const getAboutMe = () =>{
    let aboutMe = document.getElementById("aboutMe")
    if(aboutMe.style.display === "none"){
        document.getElementById("aboutMe").style.display = "grid";
        document.getElementById("contactMe").style.display = "none";
    }
}
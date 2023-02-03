const mySidenavStyle = document.getElementById("mySidenav").style;
const closeBtnStyle = document.getElementById("closeBtn").style;
const openBtnStyle = document.getElementById("openBtn").style;

function openNav() {
    openBtnStyle.opacity = "0";
    closeBtnStyle.fontSize = "36px";
    mySidenavStyle.width = "250px";
    mySidenavStyle.boxShadow = "8px 8px var(--black)";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    openBtnStyle.opacity = "1";
    closeBtnStyle.fontSize = "0";
    mySidenavStyle.width = "0";
    mySidenavStyle.boxShadow = "none";
    document.getElementById("main").style.marginLeft = "50px";
}
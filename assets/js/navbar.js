$(function () {
    let homePath = window.location.pathname.includes("home");
    if(homePath) {
        $("#home-page").addClass("active");
        $("#solutions-page").removeClass("active");
    } else {
        $("#home-page").removeClass("active");
        $("#solutions-page").addClass("active");
    }
});
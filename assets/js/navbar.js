$(function () {
    let homePath = window.location.pathname.includes("home");
    let solutionsPath = window.location.pathname.includes("solutions");

    if(solutionsPath) {
        $("#home-page").removeClass("active");
        $("#solutions-page").addClass("active");
    }

    if(homePath) {
        $("#home-page").addClass("active");
        $("#solutions-page").removeClass("active");
    }
});
$(function () {
    $("#headerContent").load(`/${dir_url}views/header.html`);
    $("#navContent").load(`/${dir_url}views/nav.html`);
    $("#bodyContent").load(`/${dir_url}views/solutions.html`, addBodyContent);
    $("#footerContent").load(`/${dir_url}views/footer.html`);
    $("#copyrightContent").load(`/${dir_url}views/copyright.html`);
});

function addBodyContent() {
    let queryParams = Object.fromEntries(new URLSearchParams(location.search));
    if(queryParams && Object.keys(queryParams).length === 0) {
        $("#solutions-question-index-home").replaceWith(`
            <div style="min-height: calc(100vh - 200px);font-size: 20px;display: flex;justify-content: center;align-items: center;">
                Nothing Found!
            </div>
        `)
        return;
    }
    let filteredCategory = config.data.category.filter((value) => {
        return value.id.toLowerCase() === queryParams.article.toLowerCase()
    })
    let filteredArticle = filteredCategory[0].sub_category.filter((value) => {
        return value.id.toLowerCase() === queryParams.faqlist.toLowerCase()
    })
    let filterQuestion = filteredArticle[0].articles.filter((value) => {
        return value.id.toLowerCase() === queryParams.question.toLowerCase()
    })
    $("#solution-question-date-detail").text(filterQuestion[0].date);
    $("#question-main-container")
    .append(
        `
        <div class="breadcrumb">
            <a href="/home.html"> Solution home </a>
            <a href="categories.html?article=${queryParams.article}">${filteredCategory[0].main_title}</a>
            <a href="faqlist.html?article=${queryParams.article}&faqlist=${queryParams.faqlist}">${filteredArticle[0].title}</a>
        </div>
        `
    );
    
    $("#question-main-container")
    .append(
        `
        <h2 class="heading">
            ${filterQuestion[0].question}
            <a class="solution-print--icon print--remove" title="Print this Article" arial-role="link" arial-label="Print this Article" onclick="window.print()">
                <span class="icon-print"><i class="fas fa-print"></i></span>
                <span class="text-print">Print</span>
            </a>
        </h2>
        `
    );
    $("#solution-article-answer").before(filterQuestion[0].article);
}
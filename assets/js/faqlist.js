$(function () {
    $("#headerContent").load(`/${dir_url}views/header.html`);
    $("#navContent").load(`/${dir_url}views/nav.html`);
    $("#bodyContent").load(`/${dir_url}views/faqlist.html`, addFaqList);
    $("#footerContent").load(`/${dir_url}views/footer.html`);
    $("#copyrightContent").load(`/${dir_url}views/copyright.html`);
});

function addFaqList() {
    let queryParams = Object.fromEntries(new URLSearchParams(location.search));
    if(queryParams && Object.keys(queryParams).length === 0) {
        $("#solutions-index-home").replaceWith(`
            <div style="min-height: calc(100vh - 200px);font-size: 20px;display: flex;justify-content: center;align-items: center;">
                Nothing Found!
            </div>
        `)
        return;
    }
    let filteredFaq = config.data.category.filter((value) => {
        return value.id.toLowerCase() === queryParams.article.toLowerCase()
    })
    let filteredCategory = filteredFaq[0].sub_category.filter((value) => {
        return value.id.toLowerCase() === queryParams.faqlist.toLowerCase()
    })
    $('#faq__heading').text(filteredFaq[0].main_title);

    $("#faqlist-breadcrumbs")
    .append(
        `
        <div class="breadcrumb__links">
            <a href="/home.html"> Solution home </a>
            <a href="categories.html?article=${queryParams.article}">Pembayaran</a>
        </div>
        `
    );
    
    filteredCategory[0].articles.map((article) => {
        $("#faq__list")
        .append(
            `
                <div class="faq__row faq__list__row">
                    <i class="icon-article-table-row"></i>
                    <div class="ellipsis faq__title">
                        <a class="c-link" href="solutions.html?article=${filteredFaq[0].id}&faqlist=${filteredCategory[0].id}&question=${article.id}">${article.question}</a>
                    </div>
                    <div class="faq__description">${article.question}</div>
                    <div class="faq__date">${article.date}</div>
                </div>
            `
        );
    })
}
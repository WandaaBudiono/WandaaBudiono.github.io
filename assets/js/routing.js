function loadPage(page) {
    if (isAdmin) window.location.href = '/index-admin.html'
    $("main.page").fadeOut(200, function () {
        $("main.page").load(`Views/Public/${page}.html`, function (response, status) {

            if (status === "error") {
                window.location.href = "/404.html?redirect=" + page;
            }
            $("main.page").fadeIn(200);
        });
    });
    $('main.page').css('opacity', '')
    setActiveNav(page);
    $("scrip").load(`Templates/scrip.html`);
}

$("navbar").load(`Templates/navbar.html`, function () {
    $(document).on("click", ".nav-link", function (e) {
        e.preventDefault();
        let page = $(this).data("page");

        history.pushState({ page: page }, "", `/${page}`.replace('index', ''));
        loadPage(page);
    });
});
$("modals").load(`Templates/modal.html`);

function setActiveNav(page) {
    $(".nav-link").removeClass("active");
    $(`.nav-link[data-page="${page}"]`).addClass("active");
}

window.onpopstate = function (event) {
    if (event.state) {
        loadPage(event.state.page);
    }
};

let initialPage = window.location.pathname.replace("/", "") || "index";
loadPage(initialPage);
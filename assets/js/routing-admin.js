function loadPage(page) {
    if (!isAdmin) window.location.replace('/index.html')
    $("#isian").fadeOut(200, function () {
        $("#isian").load(`Views/Admin/${page}.html`, function (response, status) {
            if (status === "error") {
                $("#isian").load(`Views/Admin/404.html`);
            }
            $("#isian").fadeIn(200);
            $("#navbar").load(`/Templates/navbar-admin.html`);
            $("scrip").load(`/Templates/scrip-admin.html`, () => {
                if (page === 'index') {
                    $('.chart-area').each(function () {
                        $().initChart(db.charts[this.id]);
                    })
                }
            });
        });
    });
    history.pushState({ page: page }, "", `/${page}`.replace('index', ''));
    setActiveNav(page);
}

$("#sidebar").load(`/Templates/sidebar-admin.html`);
$("modals").load(`/Templates/modal-admin.html`);

function setActiveNav(page) {
    $(".nav-link").removeClass("active");
    $(`.nav-link[data-page="${page}"]`).addClass("active");
}

$(document).on("click", ".side", function (e) {
    e.preventDefault();
    let page = $(this).data("page");

    history.pushState({ page: page }, "", `/${page}`.replace('index', ''));
    loadPage(page);
});

window.onpopstate = function (event) {
    if (event.state) {
        loadPage(event.state.page);
    }
};

let initialPage = window.location.pathname.replace("/", "").split('-')[0] || "index";

loadPage(initialPage);
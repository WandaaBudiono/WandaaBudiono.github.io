function loadPage(page) {
    if (!isAdmin) window.location.replace('/index.html')
    $("#isian").fadeOut(200, function () {
        $("#isian").load(`Views/Admin/${page}.html`, function (response, status) {
            if (status === "error") {
                $("#isian").load(`Views/Admin/404.html`);
            }
            $("#isian").fadeIn(200);
        });
    });
    history.pushState({ page: page }, "", `/${page}`.replace('index', ''));
    $("scrip").load(`/Templates/scrip-admin.html`);
    setActiveNav(page);
}

$("#navbar").load(`/Templates/navbar-admin.html`);
$("#sidebar").load(`/Templates/sidebar-admin.html`);
$("modals").load(`/Templates/modal-admin.html`);

// window.addEventListener("DOMContentLoaded", () => {
//     const navEntries = performance.getEntriesByType("navigation");
//     if (navEntries.length > 0) {
//         const navType = navEntries[0].type;

//         if (navType === "reload" || navType === "navigate") {
//             directAccess();
//         }
//     }
// });

// function directAccess() {
//     let initialPage = window.location.pathname.replace("/", "").split('-')[0] || "index";
//     loadPage(initialPage);
// }


function setActiveNav(page) {
    $(".nav-link").removeClass("active");
    $(`.nav-link[data-page="${page}"]`).addClass("active");
}

$(document).on("click", ".nav-link", function (e) {
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
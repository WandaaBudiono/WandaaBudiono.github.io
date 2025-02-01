$(document).ready(function () {
    $("navbar").load("Templates/navbar.html");
    $("modals").load("Templates/modal.html");
    $("scrip").load("Templates/scrip.html");

    function loadPage(page) {
        $("main.page").fadeOut(200, function () {
            $("main.page").load(`Views/Public/${page}.html`, function (response, status) {
                if (status === "error") {
                    $("main.page").html("<h2>404 - Page Not Found</h2>");
                }
                $("main.page").fadeIn(200);
            });
        });
        setActiveNav(page);
    }

    function setActiveNav(page) {
        $(".nav-link").removeClass("active");
        $(`.nav-link[data-page="${page}"]`).addClass("active");
    }

    // 🔥 Gunakan event delegation karena navbar dimuat setelah halaman
    $(document).on("click", ".nav-link", function (e) {
        e.preventDefault();
        let page = $(this).data("page");

        history.pushState({ page: page }, "", `/${page}`);
        loadPage(page);
    });

    window.onpopstate = function (event) {
        if (event.state) {
            loadPage(event.state.page);
        }
    };

    let initialPage = window.location.pathname.replace("/", "") || "index";
    loadPage(initialPage);
});
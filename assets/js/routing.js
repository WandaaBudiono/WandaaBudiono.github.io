function loadPage(page) {
    if (isAdmin) window.location.href = '/index-admin.html'
    $("main.page").fadeOut(200, function () {
        $("main.page").load(`Views/Public/${page}.html`, function (response, status) {

            if (status === "error") {
                page === undefined || page === 'undefined' ? page = 'index' : undefined
                window.location.href = "/404.html?redirect=" + page;
            }
            $("main.page").fadeIn(200);
        });
    });
    setActiveNav(page);
    $("scrip").load(`Templates/scrip.html`, (response, status) => {
        // loadProduct()
    });
}

$("navbar").load(`Templates/navbar.html`, function () {
    if (session.user()) {
        $('#auth-buttons').html(`
            <li class="nav-item"><a class="nav-link">Hello, ${user.getName()}</a></li>
            <li><button class="btn btn-primary" id="logout" type="button" style="margin-left: 6px;">Logout</button></li>`)
    } else {
        $('#auth-buttons').html(`
            <button class="btn btn-primary" id="login-btn" type="button" style="margin-left: 6px;" data-bs-target="#signin" data-bs-toggle="modal">Log-in</button>
            <button class="btn btn-primary" id="register-btn" type="button" style="margin-right: 6px;" data-bs-target="#signup" data-bs-toggle="modal">Register</button>`)
    }
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
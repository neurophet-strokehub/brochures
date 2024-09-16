// scripts.js

$(document).ready(function () {
    // Handle click event for flipbook
    $(".thumb").on("click", function () {
        var pdfUrl = $(this).data("pdf-url");
        var category = $(this).data("category");

        // Google Analytics event tracking for thumbnail clicks
        gtag('event', 'thumbnail_click', {
            'event_category': 'Thumbnail Click',
            'event_label': pdfUrl,
            'value': 1
        });

        if ($.fn.flipBook) {
            $(this).flipBook({
                pdfUrl: pdfUrl,
                btnColor: "#e74c3c",
                sideBtnRadius: 50,
                sideBtnSize: 50,
                sideBtnBackground: "rgba(0,0,0,.8)",
                sideBtnColor: "#e74c3c",
                lightBox: true,
                viewMode: "3d",
                layout: 3,
                btnSound: {
                    vAlign: "top",
                    hAlign: "left",
                },
                btnAutoplay: {
                    vAlign: "top",
                    hAlign: "left",
                },
                currentPage: {
                    vAlign: "bottom",
                    hAlign: "left",
                },
            });
        } else {
            console.error("flipBook plugin is not loaded.");
        }
    });

    // Filter buttons logic
    function setActiveFilter(filterValue) {
        $(".filter-btn").each(function () {
            $(this).toggleClass("active", $(this).data("filter") === filterValue)
                .toggleClass("btn-secondary", $(this).data("filter") !== filterValue);
        });
        $(".thumb").each(function () {
            $(this).toggle(filterValue === "all" || $(this).data("category") === filterValue);
        });
    }

    $(".filter-btn").on("click", function () {
        var filterValue = $(this).data("filter");
        setActiveFilter(filterValue);

        // Google Analytics event tracking for filter button clicks
        gtag('event', 'filter_button_click', {
            'event_category': 'Button Click',
            'event_label': filterValue,
            'value': 1
        });
    });

    setActiveFilter("all");

    // Adjust body height based on viewport size
    function adjustBodyHeight() {
        var navbarHeight = $(".navbar").outerHeight();
        var footerHeight = $(".footer").outerHeight();
        var viewportHeight = $(window).height();
        var contentHeight = viewportHeight - navbarHeight - footerHeight;
        $(".content").css("min-height", contentHeight + "px");
    }
    adjustBodyHeight();
    $(window).resize(adjustBodyHeight);

    // Typing animation handling
    function restartTypingAnimation() {
        var container = document.querySelector('.navbar-headerfix');
        if (container) {
            container.style.animation = 'none';
            container.offsetHeight; // trigger reflow
            container.style.animation = 'typing 4s steps(40, end) 1s normal both, blink-caret 0.75s step-end infinite';
        }
    }

    // Restart animation every 10 seconds
    restartTypingAnimation();
    setInterval(restartTypingAnimation, 10000);
});

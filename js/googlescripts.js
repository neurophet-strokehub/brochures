// scripts.js

$(document).ready(function () {
    // Handle click event for flipbook
    $(".thumb").on("click", function () {
        var pdfUrl = $(this).data("pdf-url");
        var category = $(this).data("category");
        
        // Google Analytics event tracking
        gtag('event', 'thumb_click', {
            'event_category': category,
            'event_label': pdfUrl
        });
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

        // Track filter button click event
        gtag('event', 'filter_click', {
            'event_category': 'Filter',
            'event_label': filterValue
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

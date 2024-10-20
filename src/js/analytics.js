$(document).ready(function () {
    var $thumbs = $(".thumb");
    var startTime = Date.now();

    // Handle filter button click
    $(".filter-btn").on("click", function () {
        var filterValue = $(this).data("filter");
        setActiveFilter(filterValue);

        // Google Analytics 이벤트 추적
        gtag('event', 'filter_button_click', {
            'event_category': 'Filter',
            'event_label': filterValue
        });
    });

    // Handle click event for thumbnails
    $thumbs.on("click", function () {
        var pdfUrl = $(this).data("pdf-url");

        // Open the PDF in a modal
        $("#pdfFrame").attr("src", pdfUrl);
        $("#pdfModal").show();

        // Google Analytics 이벤트 추적
        gtag('event', 'pdf_open', {
            'event_category': 'PDF',
            'event_label': pdfUrl
        });
    });

    // Modal close function
    function closeModal(label) {
        $("#pdfModal").hide();
        $("#pdfFrame").attr("src", ""); // Clear the PDF source

        // Google Analytics 이벤트 추적
        gtag('event', 'modal_close', {
            'event_category': 'Modal',
            'event_label': label
        });
    }

    // Close modal on close button click
    $(".close").on("click", function () {
        closeModal('Closed PDF Modal');
    });

    // Close modal when clicking outside of it
    $(window).on("click", function (event) {
        if (event.target.id === "pdfModal") {
            closeModal('Closed PDF Modal (Outside Click)');
        }
    });

    // Close modal with ESC key
    $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal('Closed PDF Modal (ESC Key)');
        }
    });

    // Track time spent on the page
    $(window).on("beforeunload", function() {
        var timeSpent = Math.floor((Date.now() - startTime) / 1000); // seconds

        // Send time spent to Google Analytics
        gtag('event', 'time_spent', {
            'event_category': 'brochure',
            'event_label': window.location.pathname,
            'value': timeSpent
        });
    });
});

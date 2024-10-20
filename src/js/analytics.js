$(document).ready(function () {
    var $thumbs = $(".thumb");
    var startTime = Date.now();

    // Handle click event for thumbnails
    $thumbs.on("click", function () {
        var pdfUrl = $(this).data("pdf-url");

        // Send event to Google Analytics
        gtag('event', 'click', {
            'event_category': 'brochure',
            'event_label': pdfUrl,
            'value': 1
        });

        // Open the PDF in a new tab
        window.open(pdfUrl, '_blank');
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

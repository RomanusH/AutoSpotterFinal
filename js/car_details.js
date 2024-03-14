$(document).ready(function () {
    // Function to extract query parameters from the URL
    function getQueryParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Extracting make, model, and year from URL parameters
    var make = getQueryParam('make');
    var model = getQueryParam('model');
    var year = getQueryParam('year');

    // Check if all parameters are present
    if (make && model && year) {
        // AJAX request to fetch car details
        $.getJSON('../php/fetch_details.php?make=' + make + '&model=' + model + '&year=' + year, function (data) {
            var carDataDiv = $('#carData').empty(); // Reference to the div where details will be displayed

            if (data && data.length > 0) {
                var carData = data[0];
                for (var key in carData) {
                    if (carData.hasOwnProperty(key)) {
                        var detail = $('<p>').html('<span class="detail-key">' + key + ':</span> ' + carData[key]);
                        carDataDiv.append(detail);
                    }
                }
            } else {
                carDataDiv.append('<p>No details found for this car.</p>');
            }
        }).fail(function () {
            console.error("Error fetching car details.");
            $('#carData').append('<p>Error loading details.</p>');
        });
    } else {
        console.error("Make, model, or year parameter is missing in the URL.");
        $('#carData').append('<p>Car details cannot be loaded. Missing parameters.</p>');
    }
});
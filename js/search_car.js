// Function to fetch data from PHP and populate 'make' dropdown
function getMakes() {
    $.getJSON('../php/fetch_make.php', function (data) {
        var options = '<option value="" disabled selected>Select Make</option>';
        for (var i = 0; i < data.length; i++) {
            options += '<option value="' + data[i].make + '">' + data[i].make + '</option>';
        }
        $('#make').html(options);
    });
}

// Function to fetch data from PHP and populate 'model' dropdown
function getModels() {
    var make = $('#make').val();
    if (make) {
        $.getJSON('../php/fetch_model.php?make=' + make, function (data) {
            var options = '<option value="" disabled selected>Select Model</option>';
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].model + '">' + data[i].model + '</option>';
            }
            $('#model').html(options).prop('disabled', false);
            $('#year').html('<option value="" disabled selected>Select Year</option>').prop('disabled', true);
        });
    } else {
        $('#model, #year').html('<option value="" disabled selected>Select Model</option>').prop('disabled', true);
    }
}

// Function to fetch data from PHP and populate 'year' dropdown
function getYears() {
    var model = $('#model').val();
    if (model) {
        $.getJSON('../php/fetch_year.php?model=' + model, function (data) {
            var options = '<option value="" disabled selected>Select Year</option>';
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].year + '">' + data[i].year + '</option>';
            }
            $('#year').html(options).prop('disabled', false);
        });
    } else {
        $('#year').html('<option value="" disabled selected>Select Year</option>').prop('disabled', true);
    }
}

// Enable the search button if all criteria are selected
function enableSearchButton() {
    var make = $('#make').val();
    var model = $('#model').val();
    var year = $('#year').val();

    if (make && model && year) {
        $('#showButton').prop('disabled', false);
    } else {
        $('#showButton').prop('disabled', true);
    }
}

// Redirect to the details page with selected car parameters
function showCar() {
    var make = $('#make').val();
    var model = $('#model').val();
    var year = $('#year').val();

    window.location.href = './car_details.html?make=' + make + '&model=' + model + '&year=' + year;
}

// New functions for fetching and populating additional fields
function fetchDataForSelect(selectId, endpoint) {
    $.getJSON(endpoint, function (data) {
        var options = `<option value="" disabled selected>Select</option>`;
        $.each(data, function (i, item) {
            options += `<option value="${item}">${item}</option>`;
        });
        $(`#${selectId}`).html(options);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("AJAX call failed: " + textStatus + ", " + errorThrown);
    });
}

function getBodyTypes() {
    fetchDataForSelect('body_type', '../php/search.php?type=body_type');
}

function getEngineSizes() {
    fetchDataForSelect('engine_size', '../php/search.php?type=engine_size');
}

function getFuelTypes() {
    fetchDataForSelect('fuel_type', '../php/search.php?type=fuel_type');
}

function getTransmissions() {
    fetchDataForSelect('transmission', '../php/search.php?type=transmission');
}

function getFuelEfficiencies() {
    fetchDataForSelect('fuel_efficiency', '../php/search.php?type=fuel_efficiency');
}

// Function to fetch and display all cars
function showAllCars() {
    $.getJSON('../php/search.php', { search: true }, function (cars) {
        var html = '';
        $.each(cars, function (i, car) {
            html += `<a href="./car_details.html?make=${encodeURIComponent(car.make)}&model=${encodeURIComponent(car.model)}&year=${encodeURIComponent(car.year)}" target="_blank" class="car-card">
                        <img src="../assets/img/car_not_found.png" alt="">
                        <div>
                            <h3>${car.make} ${car.model} ${car.year}</h3>
                            <p>${car.body_type}, ${car.engine_size}, ${car.fuel_type}</p>
                        </div>
                    </a>`;
        });
        $('#results').html(html);
    });
}

// Function to reset filters
function resetFilters() {
    $('select').val('').trigger('change'); // Reset all select elements
    showAllCars(); // Fetch and show all cars again
}


// Function to perform advanced car search
function searchCars() {
    var searchData = {
        search: true,
        body_type: $('#body_type').val(),
        engine_size: $('#engine_size').val(),
        fuel_type: $('#fuel_type').val(),
        transmission: $('#transmission').val(),
        fuel_efficiency: $('#fuel_efficiency').val()
    };

    $.getJSON('../php/search.php', searchData, function (cars) {
        var html = '';
        $.each(cars, function (i, car) {
            html += `<a href="./car_details.html?make=${encodeURIComponent(car.make)}&model=${encodeURIComponent(car.model)}&year=${encodeURIComponent(car.year)}" target="_blank" class="car-card">
                        <img src="../assets/img/car_not_found.png" alt="">
                        <div>
                            <h3>${car.make} ${car.model} ${car.year}</h3>
                            <p>${car.body_type}, ${car.engine_size}, ${car.fuel_type}</p>
                        </div>
                    </a>`;
        });
        $('#results').html(html);
    });
}

// Document ready function
$(document).ready(function () {
    getMakes();
    getBodyTypes();
    getEngineSizes();
    getFuelTypes();
    getTransmissions();
    getFuelEfficiencies();

    $('#advancedSearchButton').click(searchCars); // Bind the advanced search function
    $('#resetFiltersButton').click(resetFilters); // Bind the reset filters function

    showAllCars(); // Show all cars by default when the page loads

    $('#searchInput').on('input', function () {
        var query = $(this).val();

        $.getJSON('../php/search.php', { query: query }, function (data) {
            var suggestionsHtml = '';
            $.each(data, function (i, suggestion) {
                suggestionsHtml += `<div onclick="redirectToDetails('${suggestion}')">${suggestion}</div>`;
            });
            $('#suggestions').html(suggestionsHtml);
        });
    });
});

function redirectToDetails(suggestion) {
    // Split the suggestion string into parts
    var details = suggestion.split(' - ');

    // Extract make and model from the first part
    var makeAndModel = details[0].split(' ');
    var make = makeAndModel[0];
    var model = makeAndModel.slice(1).join(' '); // In case the model name contains spaces

    // Extract year from the second part
    var year = details[1];

    // Redirect to the car details page
    window.location.href = `./car_details.html?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`;
}

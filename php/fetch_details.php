<?php
include './db_connect.php';

$make = isset($_GET['make']) ? $_GET['make'] : '';
$model = isset($_GET['model']) ? $_GET['model'] : '';
$year = isset($_GET['year']) ? $_GET['year'] : '';

$query = "SELECT * FROM cars WHERE make = '" . $conn->real_escape_string($make) . "' AND model = '" . $conn->real_escape_string($model) . "' AND year = '" . $conn->real_escape_string($year) . "'";
$result = $conn->query($query);

$details = [];
while ($row = $result->fetch_assoc()) {
    $filteredDetails = [
        'make' => $row['make'],
        'model' => $row['model'],
        'year' => $row['year'],
        'body_type' => $row['body_type'],
        'engine_size' => $row['engine_size'],
        'fuel_type' => $row['fuel_type'],
        'transmission' => $row['transmission'],
        'fuel_efficiency' => $row['fuel_efficiency']
    ];
    $details[] = $filteredDetails;
}

header('Content-Type: application/json');
echo json_encode($details);

$conn->close();

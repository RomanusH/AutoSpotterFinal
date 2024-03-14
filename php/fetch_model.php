<?php
include './db_connect.php';

$make = isset($_GET['make']) ? $_GET['make'] : '';

$query = "SELECT DISTINCT model FROM cars WHERE make = '".$conn->real_escape_string($make)."' ORDER BY model ASC";
$result = $conn->query($query);

$models = [];
while ($row = $result->fetch_assoc()) {
    $models[] = $row;
}

header('Content-Type: application/json');
echo json_encode($models);

$conn->close();

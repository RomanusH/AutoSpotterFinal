<?php
include './db_connect.php';

$model = isset($_GET['model']) ? $_GET['model'] : '';

$query = "SELECT DISTINCT year FROM cars WHERE model = '".$conn->real_escape_string($model)."' ORDER BY year DESC";
$result = $conn->query($query);

$years = [];
while ($row = $result->fetch_assoc()) {
    $years[] = $row;
}

header('Content-Type: application/json');
echo json_encode($years);

$conn->close();
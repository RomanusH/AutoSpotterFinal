<?php
include './db_connect.php';

$query = "SELECT DISTINCT make FROM cars ORDER BY make ASC";
$result = $conn->query($query);

$makes = [];
while ($row = $result->fetch_assoc()) {
    $makes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($makes);

$conn->close();

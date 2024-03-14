<?php
include './db_connect.php'; // Include your DB connection script

function getUniqueValues($conn, $column)
{
    $sql = "SELECT DISTINCT $column FROM cars ORDER BY $column";
    $result = $conn->query($sql);
    $values = [];
    while ($row = $result->fetch_assoc()) {
        $values[] = $row[$column];
    }
    return $values;
}

// Fetching unique values for select options
if (isset($_GET['type'])) {
    $type = $_GET['type'];
    switch ($type) {
        case 'body_type':
        case 'engine_size':
        case 'fuel_type':
        case 'transmission':
        case 'fuel_efficiency':
            $values = getUniqueValues($conn, $type);
            echo json_encode($values);
            break;
    }
}

// Advanced car search functionality
if (isset($_GET['search'])) {
    $whereClauses = [];
    $params = ['body_type', 'engine_size', 'fuel_type', 'transmission', 'fuel_efficiency'];

    foreach ($params as $param) {
        if (isset($_GET[$param]) && !empty($_GET[$param])) {
            $whereClauses[] = "$param = '" . $conn->real_escape_string($_GET[$param]) . "'";
        }
    }

    $query = "SELECT * FROM cars";
    if (count($whereClauses) > 0) {
        $query .= " WHERE " . implode(' AND ', $whereClauses);
    }

    $result = $conn->query($query);
    $cars = [];
    while ($row = $result->fetch_assoc()) {
        $cars[] = $row;
    }

    echo json_encode($cars);
}

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    // Adjust the query to include other fields if necessary
    $sql = "SELECT DISTINCT make, model, year, engine_size FROM cars 
            WHERE make LIKE '%" . $conn->real_escape_string($query) . "%' 
               OR model LIKE '%" . $conn->real_escape_string($query) . "%' 
               OR year LIKE '%" . $conn->real_escape_string($query) . "%' 
               OR engine_size LIKE '%" . $conn->real_escape_string($query) . "%' 
            LIMIT 10";
    $result = $conn->query($sql);

    $suggestions = [];
    while ($row = $result->fetch_assoc()) {
        $suggestionString = $row['make'] . ' ' . $row['model'] . ' - ' . $row['year'] . ' - ' . $row['engine_size'];
        $suggestions[] = $suggestionString;
    }

    echo json_encode($suggestions);
}

$conn->close();

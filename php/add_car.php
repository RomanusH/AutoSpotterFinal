<?php

session_start();

require_once './db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the values from the form
    $make = $_POST['make'];
    $model = $_POST['model'];
    $year = $_POST['year'];

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO cars (make, model, year) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $make, $model, $year);

    // Execute the statement and check if it was successful
    if ($stmt->execute()) {
        header("Location: ../html/input.html?status=success");
    } else {
        header("Location: ../html/input.html?status=error");
    }
    
    // Close statement and connection
    $stmt->close();
    $conn->close();
}

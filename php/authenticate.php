<?php
include './db_connect.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Debugging: Check if the fetched password hash looks correct
        error_log("Fetched Hash: " . $row['password']);


        if ($password === $row['password']) {
            $response['success'] = true;
            $response['message'] = "Login successful.";
        } else {
            $response['message'] = "Invalid password.";
        }
    } else {
        $response['message'] = "No user found with the username $username.";
    }

    $stmt->close();
    $conn->close();
} else {
    $response['message'] = "Invalid request method.";
}

header('Content-Type: application/json');
echo json_encode($response);

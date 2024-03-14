<?php
$servername = "localhost";
$username = "root"; // default XAMPP username
$password = "23082005"; // default XAMPP password
$dbname = "auto_spotter"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
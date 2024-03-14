<?php
// generate_clicktrails.php

$pages = ['/index.html', '/about.html', '/contact.html'];
$host = 'localhost'; // Your website's host name or IP address

foreach ($pages as $page) {
    file_get_contents("http://$host/auto_spotter/html$page");
    // Sleep between requests to simulate a real user
    sleep(1);
}

echo "Generated clicktrails for pages: " . implode(', ', $pages) . "\n";

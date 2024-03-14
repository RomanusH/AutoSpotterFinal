<?php
// statistics_data.php

include './parse_access_log.php';  // Assuming this script outputs $access_stats
include './parse_error_log.php';   // Assuming this script outputs $error_stats

header('Content-Type: application/json');

$access_stats_output = [];
foreach ($access_stats as $path => $info) {
    $access_stats_output[] = [
        'page' => $path,
        'total' => $info['total'],
        'ips' => $info['ips']
    ];
}

// Prepare error data for output
$error_stats_output = [];
foreach ($error_stats as $error) {
    $error_stats_output[] = [
        'datetime' => $error['datetime'],
        'ip' => $error['ip'],
        'errorMessage' => $error['errorMessage']
    ];
}

echo json_encode([
    'accessStats' => $access_stats_output,
    'errorStats' => $error_stats_output
]);

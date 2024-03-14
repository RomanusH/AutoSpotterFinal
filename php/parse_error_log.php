<?php
// parse_error_log.php

$error_log_path = 'C:/xampp/apache/logs/error.log';
$error_log_lines = file($error_log_path);

$error_stats = [];

foreach ($error_log_lines as $line) {
    preg_match('/\[(.*?)\].*\[client (\S+)\] (.*)/', $line, $matches);
    if ($matches) {
        $datetime = $matches[1];
        $ip = $matches[2];
        $errorMessage = $matches[3];

        // Record the error
        $error_stats[] = [
            'datetime' => $datetime,
            'ip' => $ip,
            'errorMessage' => $errorMessage
        ];
    }
}

// You can now output $error_stats or process it further

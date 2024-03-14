<?php
// parse_access_log.php

$access_log_path = 'C:/xampp/apache/logs/access.log';
$access_log_lines = file($access_log_path);

$access_stats = [];

foreach ($access_log_lines as $line) {
    preg_match('/^(\S+) \S+ \S+ \[(.*?)\] "(\S+) (.*?) (\S+)" (\d+) (\d+) ".*?" "(.*?)"/', $line, $matches);
    if ($matches) {
        $ip = $matches[1];
        $datetime = $matches[2];
        $method = $matches[3];
        $url = $matches[4];
        $protocol = $matches[5];
        $status = $matches[6];
        $bytes = $matches[7];
        $userAgent = $matches[8];

        // Extract the page name
        $path = parse_url($url, PHP_URL_PATH);

        // Record the access
        if (!isset($access_stats[$path])) {
            $access_stats[$path] = ['total' => 0, 'ips' => []];
        }
        $access_stats[$path]['total']++;
        if (!in_array($ip, $access_stats[$path]['ips'])) {
            $access_stats[$path]['ips'][] = $ip;
        }
    }
}

// You can now output $access_stats or process it further

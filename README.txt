# Website Log Analysis

## Overview
This project is designed to analyze web server logs to determine the frequency of page accesses and monitor for errors. It uses PHP for parsing Apache log files and JavaScript with Chart.js to visualize the data.

## Prerequisites
- XAMPP or similar server stack with PHP and Apache installed.
- Access to Apache log files.

## Dependencies
- [Chart.js](https://www.chartjs.org/) for rendering the charts on the web page.

## Configuration
Before running the scripts, you need to configure the log file paths in the PHP scripts to point to your local Apache log files.

In `parse_access_log.php` and `parse_error_log.php`, set the `$log_path` variable:

```php
$access_log_path = '/path/to/apache/access.log'; // Change to the path of your Apache access log
$error_log_path = '/path/to/apache/error.log'; // Change to the path of your Apache error log

## IMPORTANT
You have to access /auto_spotter/html/statistics.html manually to see the charts.

Assignment 9:
We have search in our website ("Search Car") part. So the search gives suggestion when you are typing.
The way we did can be a bit different from what you want.
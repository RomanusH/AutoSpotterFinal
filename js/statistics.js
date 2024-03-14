// statistics_charts.js

fetch('../php/display_statistics.php')
    .then(response => response.json())
    .then(data => {
        const accessStats = data.accessStats;
        const errorStats = data.errorStats;

        const accessChartContext = document.getElementById('accessChart').getContext('2d');
        const accessChart = new Chart(accessChartContext, {
            type: 'bar',
            data: {
                labels: accessStats.map(stat => stat.page),
                datasets: [{
                    label: '# of Accesses',
                    data: accessStats.map(stat => stat.total),
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                tooltips: {
                    callbacks: {
                        afterLabel: function (tooltipItem, data) {
                            const ipList = accessStats[tooltipItem.index].ips;
                            return ipList ? `IPs: ${ipList}` : '';
                        }
                    }
                }
            }
        });

        const errorChartContext = document.getElementById('errorChart').getContext('2d');
        const errorChart = new Chart(errorChartContext, {
            type: 'bar',
            data: {
                labels: errorStats.map(stat => stat.datetime),
                datasets: [{
                    label: '# of Errors',
                    data: errorStats.map(() => 1), // Simply mark the occurrence of an error
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    });

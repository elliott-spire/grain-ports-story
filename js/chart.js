// https://www.chartjs.org/docs/latest/charts/line.html
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
                label: 'New Orleans',
                fill: false,
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            },
            {
                label: 'Houston',
                fill: false,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            },
            {
                label: 'Baltimore',
                fill: false,
                backgroundColor: window.chartColors.yellow,
                borderColor: window.chartColors.yellow,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            },
            {
                label: 'Norfolk',
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            },
            {
                label: 'Seattle',
                fill: false,
                backgroundColor: window.chartColors.orange,
                borderColor: window.chartColors.orange,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            },
            {
                label: 'Portland',
                fill: false,
                backgroundColor: window.chartColors.purple,
                borderColor: window.chartColors.purple,
                pointRadius: 4,
                pointHoverRadius: 5,
                data: []
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Average Regional Precipitation (mm)',
            // fontColor: '#FFF',
            fontSize: 16
        }
    }
};

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

window.addEventListener('load', function() {

    var keys = Object.keys(AVERAGES);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = AVERAGES[key];
        config.data.labels.push(key);
        config.data.datasets[0].data.push( round(Number(data['New Orleans'] )));
        config.data.datasets[1].data.push( round(Number(data['Houston']     )));
        config.data.datasets[2].data.push( round(Number(data['Baltimore']   )));
        config.data.datasets[3].data.push( round(Number(data['Norfolk']     )));
        config.data.datasets[4].data.push( round(Number(data['Seattle']     )));
        config.data.datasets[5].data.push( round(Number(data['Portland']    )));
    }

    var ctx = document.getElementById('canvas').getContext('2d');
    window.LineChart = new Chart(ctx, config);
});

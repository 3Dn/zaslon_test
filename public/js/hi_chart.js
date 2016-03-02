/**
 * Created by adm_korolev on 16.02.2016.
 */
$(function () {
    //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {
    socket.on('kgph', function(d){
        console.log(d);
        $('#test_div').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Данные за день. График Кг/ч'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Килограммы'
                }
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [
                {
                    type: 'area',
                    name: '3.5 Кг/ч',
                    data: d.scale_1
                },
                {
                    type: 'area',
                    name: '2.4 Кг/ч',
                    data: d.scale_2
                }
            ]
        });
    });
});
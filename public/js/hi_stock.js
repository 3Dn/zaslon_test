/**
 * Created by adm_korolev on 02.03.2016.
 */
$(function () {
    //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        socket.on('all_history', function(d){
            console.log("HI: " + d);
        // Create the chart
        $('#hi_stock').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : 'AAPL Stock Price'
            },

            series : [{
                name : 'AAPL Stock Price',
                data : d.all_history,
                type : 'areaspline',
                threshold : null,
                tooltip : {
                    valueDecimals : 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
            }]
        });
    });
});

/**
 * Created by adm_korolev on 02.03.2016.
 */



$(function () {
    //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        socket.on('all_history', function(d){
            console.log(d);
        // Create the chart
        $('#hi_stock').highcharts('StockChart', {
            legend: {
                enabled: true
            },
            title : {
                text : 'Данные по дням'
            },
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }],
            rangeSelector: {
                //allButtonsEnabled: true,
                selected: 0

            },

            series : [{
                name : '3.5',
                data : d.all_history_1,
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
            },
                {
                name : '2.5 ',
                data : d.all_history_2,
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
        }, function(chart){
            setTimeout(function () {
                $('input.highcharts-range-selector', $(chart.container).parent()).datepicker();
            }, 0);
        });
    });

    $.datepicker.setDefaults({
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: "dd-mm-yy",
        maxDate: new Date(),
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        onSelect: function () {
            this.onchange();
            this.onblur();
        }
    });

});

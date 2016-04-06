/**
 * Created by Kriv on 13.11.2015.
 */
function today(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'-'+mm+'-'+yyyy;
    return today;
}

function lastWeek(){
    var myDate = new Date();
    var lastWeek = new Date(myDate.getTime() - (60*60*24*7*1000));

    var dd = lastWeek.getDate();
    var mm = lastWeek.getMonth()+1; //January is 0!
    var yyyy = lastWeek.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    lastWeek = dd+'-'+mm+'-'+yyyy;
    return lastWeek;
}


$(document).ready(function(){

    /*$(".draggable").draggable({
        contaiment: 'parent',
        cursor: 'move',
        snap: '#workspace_1'
    });*/




    $("input[type='button'], button").button().tooltip();
    $("#show_templates").tooltip();

    $(".cmn-toggle").on("click", function(){ //включаем-выключаем лампочки
        var state = $(this).prop("checked"),
            wrapper = $(this).parents(".box-inner-switches").first();
        if(state){
            wrapper.find(".led_light").addClass("led_on");
        }else {
            wrapper.find(".led_light").removeClass("led_on")
        }
    });

    $(".u_button").on("click", function(){
       var ws = $(this).attr("ws");
        if(ws == '1'){
            $(".main_area").hide();
            $("#workspace_1").show();

        }else if(ws == '2'){
            $(".main_area").hide();
            $("#workspace_2").show();
            //init('myChart');
            socket.emit("sensors");
            console.log("EMIT SENSORS");

            /*$("#from").val(lastWeek());
            $("#to").val(today());*/


        }else if(ws == '4'){
            $(".main_area").hide();
            $("#workspace_4").show();
        }else if(ws == '5') {
            $(".main_area").hide();
            $("#workspace_5").show();

            /*
            socket.on("sensor_chunk", function(data){
                console.log(JSON.parse(data));
                var sensor = JSON.parse(data);
                var sebsor_tab =    '<div class="sensor_tab">'+
                                       '<div class="s_tab_name">DHT22 (192.168.1.156)</div>'+
                                        'Температура: <span class="sensor_t"><b>'+sensor.t+'&deg;C</b></span><br/>'+
                                        'Влажность: <span class="sensor_h"><b>'+sensor.h+'%</b></span><br/>'+
                                    '</div><div class="sensor_tab"></div><div class="sensor_tab"></div>';
                $("#sensors").empty().html(sebsor_tab);
            });*/

        }else if(ws == '6'){
            $(".main_area").hide();
            $("#workspace_6").show();
            socket.emit('daily_logs');
        }else if(ws == '7'){
            $(".main_area").hide();
            $("#workspace_7").show();
        }
    });
    
    $("#modal_chart").dialog({
        modal:true,
        autoOpen:false,
        width:800,
        height:750,
        show: {
            effect: "fold",
            duration: 200
        },
        buttons: [
            {
                text:"Сохранить",
                click:function() {
                    $("#modal_chart").dialog("close");
                }
            },
            {
                text:"Отмена",
                click:function(){
                    $("#modal_chart").dialog("close");
                }

            }
        ]
    });

    $(".line_settings").on("click", function(){
        socket.emit("sensors");

        var title = $(this).parents(".line_wrapper").attr("id");

        $("#modal_chart").dialog("option", "title", title).dialog("open");
        if(title == 'line_scales') {
            $("#modal_canvas").show();
        }else{
            $("#modal_canvas").hide();
        }


    });
    socket.on('all_history', function(d){
        console.log(d);
        // Create the chart

        $('#modal_canvas').highcharts('StockChart', {
            legend: {
                enabled: true
            },
            title : {
                text : 'Весы 3.5'
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
            }]
        }, function(chart){
            setTimeout(function () {
                $('input.highcharts-range-selector', $(chart.container).parent()).datepicker();
            }, 0);
        });
    });


    $( "#from" ).datepicker({
        //defaultDate: "+1w",
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
        //onClose: function( selectedDate ) {
        //    $( "#to" ).datepicker( "option", "minDate", selectedDate );
        //}
    });

    $( "#to" ).datepicker({
        //defaultDate: "+1w",
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
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        //onClose: function( selectedDate ) {
        //    $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        //}
    });

/*
    $("#refresh_chart").on("click", function(){
        var from = $("#from").val(),
            to = $("#to").val();
        from = from.split("-")[2]+"-"+from.split("-")[1]+"-"+from.split("-")[0];
        to = to.split("-")[2]+"-"+to.split("-")[1]+"-"+to.split("-")[0];
        var obj = {};
        obj.from = from;
        obj.to = to;
        console.log(obj);
        socket.emit("chart_refresh", obj);

        //from = Date.parse(from);
        //to = Date.parse(to);
        //
        //var date = from;
        //while(date <= to){
        //    console.log(new Date(date));
        //    date = date + (60*60*24*1000); //добавляем сутки в милисекундах;
        //}
    });
*/

    $("#new_template_dialog").find("input").inputmask({ "mask": "9", "repeat": 5 });
    

    $("#new_template").on("click",  function(){
        var fields =  $("#new_template_dialog").find("input").val('');
        $("#new_template_dialog").dialog("open");
    });



    $("#new_template_dialog").dialog({
        title: "Редактор шаблонов",
        modal:true,
        autoOpen:false,
        show: {
            effect: "fold",
            duration: 200
        },
        buttons: [
            {
                text:"Сохранить",
                click:function() {

                    var name = $("#template_name").val(),
                        nor_1 = $("#nor_1_low").val() + "_" + $("#nor_1_up").val(),
                        nor_2 = $("#nor_2_low").val() + "_" + $("#nor_2_up").val(),
                        nor_3 = $("#nor_3_low").val() + "_" + $("#nor_3_up").val(),
                        blansh = $("#blansh_low").val() + "_" + $("#blansh_up").val(),
                        knives = $("#knives_low").val() + "_" + $("#knives_up").val(),
                        vibro = $("#vibro_low").val() + "_" + $("#vibro_up").val();

                    var template = nor_1+"&&"+nor_2+"&&"+nor_3+"&&"+blansh+"&&"+knives+"&&"+vibro;
                    var obj = {name:name, template:template, action:"save_new"};
                    socket.emit("save_new_template", obj);
                    $("#new_template_dialog").dialog("close");
                }
            },
            {
                text:"Отмена",
                click:function(){
                    $("#new_template_dialog").dialog("close");
                }

            }
        ]
    });

    $("#set_templates").on("click",  function(){
        var curr = $("#template_list").val();
        socket.emit("set_template", curr);
    });


});


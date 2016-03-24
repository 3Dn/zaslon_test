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




});


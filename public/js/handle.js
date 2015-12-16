/**
 * Created by Kriv on 13.11.2015.
 */



$(document).ready(function(){

    /*$(".draggable").draggable({
        contaiment: 'parent',
        cursor: 'move',
        snap: '#workspace_1'
    });*/




    $(".u_button").button().tooltip();

    $(".cmn-toggle").on("click", function(){ //включаем-выключаем лампочки
        var state = $(this).prop("checked"),
            wrapper = $(this).parents(".box-inner-switches").first();
        if(state){
            wrapper.find(".led_light").addClass("led_on");
        }else {
            wrapper.find(".led_light").removeClass("led_on")
        }
    });
    var client = new Websocket('ws://localhost:9999');
    $(".u_button").on("click", function(){
       var ws = $(this).attr("ws");
        if(ws == '1'){
            $("#workspace_1").show();
            $("#workspace_2, #workspace_3, #workspace_4, #workspace_5").hide();
        }else if(ws == '2'){
            $("#workspace_2").show();
            init('myChart');
            $("#workspace_1, #workspace_3, #workspace_4, #workspace_5").hide();
        }else if(ws == '3'){
            $("#workspace_3").show();
            var canvas = document.getElementById('cam_can').getContext('2D');
            //var client = new Websocket('ws://81.211.117.195:9999');
            var player = new jsmpeg(client, {
                canvas: canvas // Canvas should be a canvas DOM element
            });
            $("#workspace_1, #workspace_2, #workspace_4, #workspace_5").hide();
        }else if(ws == '4'){
            $("#workspace_4").show();
            $("#workspace_1, #workspace_2, #workspace_3, #workspace_5").hide();
        }else if(ws == '5') {
            $("#workspace_5").show();
            socket.emit("sensors");
            console.log("EMIT SENSORS");

            socket.on("sensor_chunk", function(data){
                console.log(JSON.parse(data));
                var sensor = JSON.parse(data);
                var sebsor_tab =    '<div class="sensor_tab">'+
                                       '<div class="s_tab_name">DHT22 (192.168.1.156)</div>'+
                                        'Температура: <span class="sensor_t"><b>'+sensor.t+'&deg;C</b></span><br/>'+
                                        'Влажность: <span class="sensor_h"><b>'+sensor.h+'%</b></span><br/>'+
                                    '</div><div class="sensor_tab"></div><div class="sensor_tab"></div>'
                $("#sensors").empty().html(sebsor_tab);
            });
            $("#workspace_1, #workspace_2, #workspace_3, #workspace_4").hide();

        }
    });




});


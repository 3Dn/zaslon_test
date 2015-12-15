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
                alert("AAAAAAA");
            });
            $("#workspace_1, #workspace_2, #workspace_3, #workspace_4").hide();

        }
    });




});


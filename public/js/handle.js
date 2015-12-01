/**
 * Created by Kriv on 13.11.2015.
 */

function init() {
    var ctx = $("#myChart").get(0).getContext("2d");


    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    }
    var myNewChart = new Chart(ctx).Line(data);
}

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
            $("#workspace_2, #workspace_3, #workspace_4").hide();
        }else if(ws == '2'){
            $("#workspace_2").show();
            init();
            $("#workspace_1, #workspace_3, #workspace_4").hide();
        }else if(ws == '3'){
            $("#workspace_3").show();
            $("#workspace_1, #workspace_2, #workspace_4").hide();
        }else if(ws == '4'){
            $("#workspace_4").show();
            $("#workspace_1, #workspace_2, #workspace_3").hide();
        }
    });




});


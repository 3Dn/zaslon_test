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
            $("#workspace_2, #workspace_3, #workspace_4").hide();
        }else if(ws == '2'){
            $("#workspace_2").show();
            $("#workspace_1, #workspace_3, #workspace_4").hide();
        }else if(ws == '3'){
            $("#workspace_3").show();
            $("#workspace_1, #workspace_2, #workspace_4").hide();
        }else if(ws == '4'){
            $("#workspace_4").show();
            $("#workspace_1, #workspace_2, #workspace_3").hide();
        }
    });


    var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx).Line(chartData);
    //new Chart(ctx);
    var myNewChart = new Chart(ctx);




});


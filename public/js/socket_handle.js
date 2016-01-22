/**
 * Created by Kriv on 16.11.2015.
 */

var socket = io.connect();
var dates = [];
var states = [];
var test_lables = [];

//
//$(document).ready(function(){
//    $("#logs").jScrollPane();
//});




socket.on('send', function (data) {
    console.log(data);
    if(data) {
        try {
            //console.log(data);
            //var pos = data.lastIndexOf(']}'),
            //    j = data.substring(0, pos+2);
            //var info = {};
            //info = JSON.parse(data);
            console.log(data);
            var open_close = ['закрыта', 'открыта'];
            $.each(data.t, function (key, value) {
                console.log("t = " + value);


                $("#logs").append("<p>"+data.date+" Заслонка " + open_close[+value] + "</p>");
                //$("#logs").jScrollPane();

            });
            $.each(data.d, function (key, value) {
                if (value == '1') {
                    $("#cmn-toggle-" + key).prop("checked", true);
                    $("#cmn-toggle-" + key).parents(".box-inner-block").find('.led_light').addClass('led_on');
                }
            });
        } catch (err) {
            console.log(data);
            console.log(err.name + ":" + err.message + "\n" + err.stack);
        }
    }
});

function arr_clean() {
    dates.length = 0;
    states.length = 0;
    test_lables.length = 0;
}




/*
function init() {

    //socket.emit("getCharts");
    //var ret_mass = new Object();
    //ret_mass.dates = [];
    //ret_mass.states = [];

    /!*socket.on("chart_data", function(data){
        //console.log("socket_handle.js -> ok!\nData: " + data);
        data.forEach(function(value, key, data){


            states.push(value.pin_state);
            ret_mass.states.push(value.pin_state);

            var d = new Date(value.my_date*1000);
            var hours = d.getHours();
            var minutes = "0" + d.getMinutes();
            var seconds = "0" + d.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            dates.push(formattedTime);
            ret_mass.dates.push(formattedTime);

        });
        return ret_mass;
        arr_clean();
    });*!/

    //console.log("socket_handle.js -> dates: \n" + dates + "\n");
    //console.log("socket_handle.js -> states: \n" + states + "\n");
    //console.log("socket_handle.js -> test_lables: \n" + test_lables + "\n");
    //console.log("socket_handle.js -> \n ret_mass.states: " + ret_mass.states + "\n" + "ret_mass.dates: " + ret_mass.dates + "\n");

    /!*var lineChartData = {
        labels : dates,
        datasets : [
            {
                label: "test",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                //data : [1,0,1,0,1,0,1,0,1,0]
                data : states
            }
        ]
    };*!/

    var lineChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            }
        ]
    };



    var ctx = document.getElementById("myChart").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        bezierCurve : false,
        animation: false
    });

    socket.on('pushdata', function (data, myLine) {
        console.log("Got new data: "+data);
        //updateChart(myLine, data);
        myLine.datasets[0].data.shift();
        myLine.datasets[0].data.push(data);
        myLine.update();
    });

    //arr_clean();
}




//
//function  updateChart(obj, new_data){
//    obj.datasets[0].data.shift();
//    obj.datasets[0].data.push(new_data);
//    obj.update();
//}
*/

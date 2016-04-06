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
            var time = (new Date).toLocaleTimeString();
            console.log("socket SEND: "+data);
            var open_close = ['закрыта', 'открыта'];
            $.each(data.d, function (key, value) {
                console.log("d = " + value);
                //$("#logs").append("<p>"+data.date+": Заслонка " + open_close[+value] + "</p>");
                //$("#logs").jScrollPane();

            });
            console.log("data.d: "+data.d);
            if(data.d[3] == '1'){
                $("#scale_25_led").addClass("led_on");
                //socket.emit('sys', {'event': 'scale_open', 'name': "scale_1", 'time': time});
                $("#logs").append("<p>"+time+": Заслонка весов 1 открыта.</p>");
            }
            if(data.d[3] == '0'){
                $("#scale_25_led").removeClass("led_on");
                //socket.emit('sys', {'event': 'scale_close', 'name': "scale_1", 'time': time});
                $("#logs").append("<p>"+time+": Заслонка весов 1 закрыта.</p>");
            }
            if(data.d[4] == '1'){
                $("#scale_35_led").addClass("led_on");
                //socket.emit('sys', {'event': 'scale_open', 'name': "scale_2", 'time': time});
                $("#logs").append("<p>"+time+": Заслонка весов 2 открыта.</p>");
            }
            if(data.d[4] == '0'){
                $("#scale_35_led").removeClass("led_on");
                //socket.emit('sys', {'event': 'scale_close', 'name': "scale_2", 'time': time});
                $("#logs").append("<p>"+time+": Заслонка весов 2 закрыта.</p>");
            }

            //$.each(data.d, function (key, value) {
            //    if (value == '1') {
            //        $("#cmn-toggle-" + key).prop("checked", true);
            //        $("#cmn-toggle-" + key).parents(".box-inner-block").find('.led_light').addClass('led_on');
            //    }
            //});

        } catch (err) {
            console.log(data);
            console.log(err.name + ":" + err.message + "\n" + err.stack);
        }
    }
});


socket.on("daily_scale", function(data){
    console.log(data);
});

socket.on("chart_refresh_data", function(data){
   console.log(data);
    scale_chart('myChart', data);

});
$(document).ready(function(){
    socket.emit("get_template_list");
});


socket.on("load_template_list", function(data){
    console.log(JSON.parse(data));
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

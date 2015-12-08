/**
 * Created by Kriv on 16.11.2015.
 */
var socket = io.connect();
//
//$(document).ready(function(){
//    $("#logs").jScrollPane();
//});

socket.on('send', function (data) {
    console.log(data);
    //socket.emit('recive', { hello: 'world' });
    if(data) {
        try {
            //console.log(data);
            //var pos = data.lastIndexOf(']}'),
            //    j = data.substring(0, pos+2);
            //var info = {};
            //info = JSON.parse(data);
            console.log(data);
            $.each(data.t, function (key, value) {
                console.log("t = " + value);

                $("#logs").append("<p> t = " + value + "</p>");
                //$("#logs").jScrollPane();

            });
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

function init() {

    socket.emit("getCharts");
    var ctx = $("#myChart").get(0).getContext("2d");

    var dates = new Array();
    var states = new Array();

    socket.on("chart_data", function(data){
        //console.log("socket_handle.js -> ok!\nData: " + data);
        //data = JSON.parse(data);
        console.log(data.length);
        $.each(data, function(key, value){
            //var t = value.date.split(/[- :]/);
            //var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
            //var d = new Date(value.my_date);
            //dates.push(d);
            states.push(value.pin_state);
            var unix_timestamp = 1370001284000;

            var d = new Date(value.my_date*1000);
            var hours = d.getHours();
            var minutes = "0" + d.getMinutes();
            var seconds = "0" + d.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            dates.push(formattedTime);

            //alert(formattedTime)
        });



        console.log("socket_handle.js -> dates: \n" + dates + "\n");
        console.log("socket_handle.js -> states: \n" + states + "\n");
    });
    var chart_data = {
        labels: dates,
        datasets: [
            {
                label: "Pin states",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [states]
            }
        ]
    };


    console.log("AAAAAAAAAAAA!!!!!!!!!!!");
    console.log(chart_data);
    var myNewChart = new Chart(ctx).Line(chart_data, {animation: false});
}





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

    var dates = new Array();
    var states = new Array();
    var test_lables = new Array();

    socket.emit("getCharts");
    //var ctx = $("#myChart").get(0).getContext("2d");

    socket.on("chart_data", function(data){
        //console.log("socket_handle.js -> ok!\nData: " + data);
        data.forEach(function(value, key, data){

            //var t = value.date.split(/[- :]/);
            //var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
            //var d = new Date(value.my_date);
            //dates.push(d);
            test_lables.push("Jan");
            test_lables.push("Feb");
            test_lables.push("Mar");

            states.push(parseInt(value.pin_state));

            var d = new Date(value.my_date*1000);
            var hours = d.getHours();
            var minutes = "0" + d.getMinutes();
            var seconds = "0" + d.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            dates.push(formattedTime);

        });

        console.log("socket_handle.js -> dates: \n" + dates + "\n");
        console.log("socket_handle.js -> states: \n" + states + "\n");
        //console.log("typeof(states): " + typeof(states));
    });

    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = {
        //labels : ["January","February","March","April","May","June","July"],
        labels : dates,
        datasets :
            {
                label: "My Second dataset",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
    };

        var ctx = document.getElementById("myChart").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
           // responsive: true
        });


/*    var myNewChart = new Chart(ctx).Line(chart_data,
        {
            animation: false,
            bezierCurve: false
        });*/

/*    dates = null;
    states = null;
    test_lables = null;*/

}





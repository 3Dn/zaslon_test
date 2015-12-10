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

function arr_clean() {
    dates.length = 0;
    states.length = 0;
    test_lables.length = 0;
}

/*

function init() {

    socket.emit("getCharts");
    var ret_mass = new Object();
    ret_mass.dates = [];
    ret_mass.states = [];

    socket.on("chart_data", function(data){
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
    });

    console.log("socket_handle.js -> dates: \n" + dates + "\n");
    console.log("socket_handle.js -> states: \n" + states + "\n");
    console.log("socket_handle.js -> test_lables: \n" + test_lables + "\n");
    console.log("socket_handle.js -> \n ret_mass.states: " + ret_mass.states + "\n" + "ret_mass.dates: " + ret_mass.dates + "\n");

    var lineChartData = {
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
    };

        var ctx = document.getElementById("myChart").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            bezierCurve : false,
            animation: false
        });

    arr_clean();
}
*/
$(document).ready(function(){
    function MainViewModel(data) {
        var self = this;

        self.lineChartData = ko.observable({
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
        });

        socket.on('pushdata', function (data) {
            self.lineChartData().datasets[0].data.shift();
            self.lineChartData().datasets[0].data.push(data);

            self.initLine();
        });

        self.initLine = function() {
            var options = {
                animation : false,
                scaleOverride : true,
                scaleSteps : 10,//Number - The number of steps in a hard coded scale
                scaleStepWidth : 10,//Number - The value jump in the hard coded scale
                scaleStartValue : 10//Number - The scale starting value
            };

            var ctx = $("#myChart").get(0).getContext("2d");
            var myLine = new Chart(ctx).Line( vm.lineChartData(), options );
        }

    }
    var vm = new MainViewModel();
    ko.applyBindings(vm);
    vm.initLine();
});





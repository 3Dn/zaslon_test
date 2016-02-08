/**
 * Created by user on 13.12.2015.
 */
var socket = io.connect();

var myLine;


function scale_chart(myCanvas, data){
    var labels = [],
        points = {
            scale_1:[],
            scale_2:[]
        };
    $.each(data.scale_1, function(){
        labels.push(this.date);
        points.scale_1.push(this.count);
    });
    $.each(data.scale_2, function(){
        points.scale_2.push(this.count);
    });
    console.log(labels);
    console.log(points);

    var lineChartData = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: points.scale_1
            }
        ]
    };

    var ctx = document.getElementById(myCanvas).getContext("2d");
    myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true,
        bezierCurve : false,
        animation: false
    });
}


function init(myCanvas) {
    console.log(myCanvas);
    var lineChartData = {
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
                data: [1,0,1,0,1,0,1]
            }
        ]
    };

    var ctx = document.getElementById(myCanvas).getContext("2d");
    myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true,
        bezierCurve : false,
        animation: false
    });
}


socket.on('pushdata', function(data){
    console.log("my: " + data);
    myLine.removeData();
    myLine.addData([data], data);
});
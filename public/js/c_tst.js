/**
 * Created by user on 13.12.2015.
 */
var socket = io.connect();

socket.on('pushdata', function(data){
    console.log("my: " + data);
    myLine.removeData();
    myLine.addData(data, data);
});

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
    window.myLine = new Chart(ctx).Line(lineChartData, {
        //responsive: false
    });
}
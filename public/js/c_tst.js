/**
 * Created by user on 13.12.2015.
 */
var socket = io.connect();

var myLine;


function scale_chart(myCanvas, data){
    console.log(data);
    var labels = [],
        points = {
            scale_1:[],
            scale_2:[]
        };

    //var from = $("#from").val(),
    //    to = $("#to").val();
    //
    //from = from.split("-")[2]+"-"+from.split("-")[1]+"-"+from.split("-")[0];
    //to = to.split("-")[2]+"-"+to.split("-")[1]+"-"+to.split("-")[0];
    //from = Date.parse(from);
    //to = Date.parse(to);
    //
    //var date = from;
    //var i = 0;
    //
    //var date_arr = [];
    //
    //while(date <= to){
    //    //console.log(new Date(date));
    //    var  d =  new Date(date);
    //
    //    var day = d.getDate(),
    //        month = d.getMonth()+1,
    //        year = d.getFullYear();
    //
    //    date_arr.push(day+"-"+month+"-"+year);
    //    date = date + (60*60*24*1000); //добавляем сутки в милисекундах;
    //}
    //
    //console.log(date_arr);

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
                label: "Scale_1",
                labelColor : "rgba(51,51,255,1)",
                labelAlign: 'center',
                fillColor: "rgba(51,51,255,0.2)",
                strokeColor: "rgba(51,51,255,1)",
                pointColor: "rgba(51,51,255,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(51,51,255,1)",
                data: points.scale_1
            },
            {
                label: "Scale_2",
                labelColor : "rgba(255,0,0,1)",
                labelAlign: 'center',
                fillColor: "rgba(255,0,0,0.2)",
                strokeColor: "rgba(255,0,0,1)",
                pointColor: "rgba(255,0,0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,0,0,1)",
                data: points.scale_2
            },
        ]
    };

    var ctx = document.getElementById(myCanvas).getContext("2d");
    myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true,
        bezierCurve : false,
        animation: false
    });
}


//function init(myCanvas) {
//    console.log(myCanvas);
//    var lineChartData = {
//        labels: ["January", "February", "March", "April", "May", "June", "July"],
//        datasets: [
//            {
//                label: "My First dataset",
//                fillColor: "rgba(220,220,220,0.2)",
//                strokeColor: "rgba(220,220,220,1)",
//                pointColor: "rgba(220,220,220,1)",
//                pointStrokeColor: "#fff",
//                pointHighlightFill: "#fff",
//                pointHighlightStroke: "rgba(220,220,220,1)",
//                data: [1,0,1,0,1,0,1]
//            }
//        ]
//    };
//
//    var ctx = document.getElementById(myCanvas).getContext("2d");
//    myLine = new Chart(ctx).Line(lineChartData, {
//        responsive: true,
//        bezierCurve : false,
//        animation: false
//    });
//}


socket.on('pushdata', function(data){
    console.log("my: " + data);
    myLine.removeData();
    myLine.addData([data], data);
});
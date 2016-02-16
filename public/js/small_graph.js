/**
 * Created by adm_korolev on 16.02.2016.
 */
var lchart = {};
var scale_25_timeline = new TimeSeries();
var scale_35_timeline = new TimeSeries();
var scale_25_lchart = new SmoothieChart();
var scale_35_lchart = new SmoothieChart();

socket.on('scale_lchart', function(data){
    lchart.scale_1 = data.scale_1_hour;
    lchart.scale_2 = data.scale_2_hour;
    scale_25_timeline.append(new Date().getTime(), lchart.scale_1);
    scale_35_timeline.append(new Date().getTime(), lchart.scale_2);
});

/*setInterval(function() {
    console.log("lchart: " + lchart.scale_1);
}, 1000);*/

scale_25_lchart.addTimeSeries(scale_25_timeline);
scale_35_lchart.addTimeSeries(scale_35_timeline);

scale_25_lchart.streamTo(document.getElementById("scale_25_canvas"), 1000);
scale_35_lchart.streamTo(document.getElementById("scale_35_canvas"), 1000);
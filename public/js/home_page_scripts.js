socket.on('scale_log_home_page', function(data){
    document.querySelector('#scale_1_kgh').innerHTML = "Кг/ч: " + data.scale_1_hour;
    document.querySelector('#scale_1_kgd').innerHTML = "Кг/д: " + data.scale_1_day;
    document.querySelector('#scale_2_kgh').innerHTML = "Кг/ч: " + data.scale_2_hour;
    document.querySelector('#scale_2_kgd').innerHTML = "Кг/д: " + data.scale_2_day;
    //console.log("scale_log_home_page: " + data.scale_1_day);
});

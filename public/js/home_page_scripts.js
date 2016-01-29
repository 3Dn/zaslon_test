socket.on('scale_1_log_hour', function(data){
    document.querySelector('#sacle_1_kgh').innerHTML = 'Кг/ч: '.data;
    console.log("Data: " + data);
});

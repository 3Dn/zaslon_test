/**
 * Created by Kriv on 16.11.2015.
 */
var socket = io.connect();


socket.on('send', function (data) {
    //console.log(data);
    //socket.emit('recive', { hello: 'world' });
    var len = data.length,
        j =data.substring(0, (len-5));
    var info = {};
    info = JSON.parse(j);
    console.log(info);
    $.each(info.d, function(key, value){
       if(value == '1'){
           $("#cmn-toggle-"+key).prop("checked", true);
       }
    });

});

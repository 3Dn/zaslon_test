/**
 * Created by Kriv on 16.11.2015.
 */
var socket = io.connect();


socket.on('send', function (data) {
    //console.log(data);
    //socket.emit('recive', { hello: 'world' });
    try{
        //console.log(data);
        //var pos = data.lastIndexOf(']}'),
        //    j = data.substring(0, pos+2);
        var info = {};
        info = JSON.parse(data);
        console.clear();
        console.log(info);
        $.each(info.t, function(key, value){
            console.log("t = "+ value);

            $("#logs").append("<p> t = "+ value + "</p>");

        });
        $.each(info.d, function(key, value){
            if(value == '1'){
                $("#cmn-toggle-"+key).prop("checked", true);
                $("#cmn-toggle-"+key).parents(".box-inner-block").find('.led_light').addClass('led_on');
            }
        });
    }catch(err){}

});

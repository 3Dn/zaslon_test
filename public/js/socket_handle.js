/**
 * Created by Kriv on 16.11.2015.
 */
var socket = io.connect();

socket.on('news', function (data) {
    console.log(data);
//        $("#workspace_1").append("<br/> а сервака у нас вот чо приходит: " +data.hello);
    socket.emit('my other event', { my: 'data' });
});

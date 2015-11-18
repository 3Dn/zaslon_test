/**
 * Created by Kriv on 16.11.2015.
 */
var socket = io.connect();


socket.on('send', function (data) {
    console.log(data);
    socket.emit('recive', { hello: 'world' });
});

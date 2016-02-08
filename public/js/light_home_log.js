/**
 * Created by 3Dn on 07.02.2016.
 */

//window.onload = function () {
    socket.on('sys_to_ligth_home_log_users_count', function(msg){
        document.querySelector('#users_count_inner_text').innerHTML = "Connected users: " + msg.users_count;
    });
    socket.emit('ready', {'data': '1'});
    socket.on('r', function(msg){
        console.log(msg.reconnect);
    });
//};
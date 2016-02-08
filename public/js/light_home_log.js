/**
 * Created by 3Dn on 07.02.2016.
 */
window.onload = function () {
    socket.on('sys_to_ligth_home_log_users_count', function(msg){
        document.querySelector('#users_count').innerHTML = '<p id="user_count">Connected users: ' + msg.users_count + '</p>';
    });
    //socket.on()
};
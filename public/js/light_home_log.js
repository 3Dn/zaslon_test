/**
 * Created by 3Dn on 07.02.2016.
 */
window.onload = function () {
    socket.on('sys_to_ligth_home_log', function(msg){
        document.querySelector('#users_count').innerHTML += "Connected users: " + msg.users_count;
    })
}
/**
 * Created by 3Dn on 07.02.2016.
 */
window.onload = function () {
    socket.on('new_user', function(msg){
        document.querySelector('#users_count').innerHTML = "Connected users: " + msg.users_count;
    })
}
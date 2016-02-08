/**
 * Created by 3Dn on 07.02.2016.
 */

    socket.on('sys_to_ligth_home_log_users_count', function(data){
        document.querySelector('#users_count_inner_text').innerHTML = "Connected users: " + data.users_count;
    });
    socket.on('sys_to_ligth_home_log_last_logs', function(data){

        document.querySelector('#last_logs_inner_text').innerHTML += data.text;
    });
    socket.emit('ready', {'data': '1'});
    socket.on('r', function(msg){
        console.log(msg.reconnect);
        msg.last_news.forEach(function(item){
            document.querySelector('#last_logs_inner_text').innerHTML += item.message +'<br>';
        });
        console.log(msg.last_news[0]);
        console.log(msg.last_news.length);
    });

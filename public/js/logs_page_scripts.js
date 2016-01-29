strings = {
    'connected': '[sys][time]%time%[/time]: Вы успешно соединились к сервером как [user]%name%[/user].[/sys]',
    'userJoined': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] вошел.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] отключился.[/sys]',
    'scale_open': '[sys][time]%time%[/time]: Заслонка весов [user]%name%[/user] открыта.[/sys]',
    'scale_close': '[sys][time]%time%[/time]: Заслонка весов [user]%name%[/user] закрыта.[/sys]'
};
window.onload = function() {
    //socket.on('connect', function () {
        socket.on('sys_to_web', function (msg) {
            // Добавляем в лог сообщение, заменив время, имя и текст на полученные
            document.querySelector('#logs').innerHTML += strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
            // Прокручиваем лог в конец
            //document.querySelector('#logs').scrollTop = document.querySelector('#log').scrollHeight;
        });
        socket.on('scale_log', function(data){
            data.forEach(function(item, i, data){
                var open_close = ['закрыта', 'открыта'];
                var ltzDate = new Date(item.date.toLocaleString());
                document.querySelector('#logs').innerHTML += ltzDate + " -> Контроллер: " + item.name + ". Заслонка #1: " + open_close[item.state_1] + ". Залонка #2: " + open_close[item.state_2] + '.<br>';
            });
            //console.log(data);
        });
    //});
};
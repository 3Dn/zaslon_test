var db  = require('./db_engine');
var local_logs_conn = db.connection();

exports.log_write = function(system, message, level, zaslon_id) {
    if (level == ''){
        level = 0;
    }
    if (zaslon_id == ''){
        zaslon_id = 0;
    }
    local_logs_conn.query('INSERT INTO sys_log(zaslon_id, sys_name, level, message) values("' + zaslon_id + '","' + system + '","' + level + '","' + message + '")');
};

exports.log_read = function(system, limit) {
    var ret_arr = [];
    var sql = '';
    if((system == '') && (limit == '')) {
        sql = 'SELECT * from sys_log';
    } else if ((system != '') && (limit == '')) {
        sql = 'SELECT * from sys_log WHERE sys_name="' + system + '"';
    } else if ((system == '') && (limit != '')) {
        sql = 'SELECT * from sys_log order by id DESC limit ' + limit;
    } else if ((system != '') && (limit != '')) {
        sql = 'SELECT * from sys_log WHERE sys_name="' + system + '" order by id DESC limit ' + limit;
    }

    local_logs_conn.query(sql, function(err ,rows, fields){
       rows.forEach(function(item){
           var obj ={};
           obj.date = item.date;
           obj.sys_name = item.sys_name;
           obj.level = item.level;
           obj.message = item.message;
           ret_arr.push(obj);
       })
    });

    return ret_arr;

/*
    if (system == ''){
        local_logs_conn.query('SELECT * from sys_log');
    } else {
        local_logs_conn.query('SELECT * from sys_log WHERE sys_name="' + system + '"');
    }

    if(limit == '') {
        sql = 'SELECT * from sys_log';
    } else {
        sql = 'SELECT * from sys_log LIMIT ' + limit;
    }*/
};

module.exports.logs = "logs";


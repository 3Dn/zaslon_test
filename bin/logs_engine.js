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

exports.log_read = function(system) {
    if (system == ''){
        local_logs_conn.query('SELECT * from sys_log');
    } else {
        local_logs_conn.query('SELECT * from sys_log WHERE sys_name="' + system + '"');
    }
};

module.exports.logs = "logs";


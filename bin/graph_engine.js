/**
 * Created by adm_korolev on 16.02.2016.
 */
var db  = require('./db_engine');
var dateFormat  = require('dateformat');
var local_conn = db.connection();

function killogram_per_hour(db, callback) {
    var ret_arr = [];
    var t_arr = [];
    var sql = 'SELECT state, date from ' + db + ' WHERE state=0 and date >= DATE_SUB(NOW(), INTERVAL 3 DAY)';
    local_conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        rows.forEach(function (item) {
            t_arr.push(item.date);
        });

        for(var i = 0; i < t_arr.length; i=i+2 ){
            var t_obj = {};
            var arr = [];
            t_obj.date = Date.UTC(dateFormat(t_arr[i], "yyyy"), dateFormat(t_arr[i], "m"), dateFormat(t_arr[i], "dd"), dateFormat(t_arr[i], "HH"), dateFormat(t_arr[i], "MM"), dateFormat(t_arr[i], "ss"));
            var delta = (t_arr[i+1]-t_arr[i])/1000;
            var per_seconds = (20 / delta)*3600;
            t_obj.state = per_seconds - (per_seconds%1); // (20 / dt) * 3600 <- (== 60*60) in hour
            if (t_obj.state < 4000){
                arr = [t_obj.date, t_obj.state];
                ret_arr.push(arr);
            }
        }
        callback(ret_arr);
    });
}

function all_history(db, callback) {
    var arr = [];
    var sql = 'select date, count(*) as count from ' + db + ' where state="1" GROUP BY date(DATE)';
    local_conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        rows.forEach(function (item, i, rows) {
            var t_obj_date = Date.UTC(dateFormat(item.date, "yyyy"), dateFormat(item.date, "m"), dateFormat(item.date, "dd"));
            arr.push(t_obj_date, item.count);
        });
        callback(arr);
    });
}


module.exports.killogram_per_hour = killogram_per_hour;
module.exports.all_history = all_history;
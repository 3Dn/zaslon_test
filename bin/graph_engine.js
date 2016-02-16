/**
 * Created by adm_korolev on 16.02.2016.
 */
var db  = require('./db_engine');
var local_logs_conn = db.connection();

exports.kgph = function(base){
    var t_arr = [];
    var ret_arr = [];
    var sql = 'SELECT date from ' + base + '  WHERE state=0 and DATE_SUB(NOW(), INTERVAL 1 DAY)';
    local_logs_conn.query(sql, function(err, rows, fields){
        rows.forEach(function(item){
            var obj = {};
            obj.date = item.date;
            t_arr.push(obj.date);
        });
    });
    for(var i = 0; i < t_arr.length; i=i+2 ){
        var t_obj = {};
        t_obj.date = t_arr[i];
        t_obj.state = t_arr[i]-t_arr[i+1];
        ret_arr.push(t_obj);
    }
    console.log(ret_arr);
    return ret_arr;
};

module.exports.graph_engine = "graph_engine";
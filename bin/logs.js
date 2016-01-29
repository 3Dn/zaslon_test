#!/usr/bin/env node
/**
 * Created by Kriv on 26.11.2015.
 */
var i2c = require('i2c');
var db  = require('./db_engine');
var local_conn = db.connection();
var address = 0x04;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var ret_obj = '';
var ret_daily_arr = [];
var obj = '';
var current_state='';
var state_1 = '', state_2 = '';
var scale_1_log_hour_count,
    scale_2_log_hour_count,
    scale_1_log_day_count0,
    scale_2_log_day_count;
var tmp_buff='';

db.sys_log_query("0", "sys", "0", "System start at: " + Date().toLocaleString());

var wire_loop = setInterval(function(){
    wire.read(32, function(err, res){
        var buff_bytes = new Buffer(res);
        tmp_buff = buff_bytes.toString('utf8');
        var pos = tmp_buff.indexOf(']}');
        obj = tmp_buff.substring(0, pos+2);
    });

    try {
        obj = JSON.parse(obj);
        if ((state_1 != obj.d[3]) || (state_2 != obj.d[4])) { //current_state != obj
            //console.log("curr: " + current_state);
            current_state = obj;
            state_1 = obj.d[3];
            state_2 = obj.d[4];
            //console.log("new_curr: " + current_state);
            //db.query('INSERT INTO io_log (pin_mode, pin_io, pin_state) VALUES("1","0","' + current_state + '")');
            local_conn.query('INSERT INTO scale_log(zaslon_id, state_1, state_2) values("1", "'+state_1+'", "'+state_2+'")');
            obj.date = Date().toLocaleString();
            ret_obj = obj;
        }
    }
    catch (err) {
        console.log("Error parsing obj! obj is: " + obj);
        //console.log(err.name + ":" + err.message + "\n" + err.stack);
    }
},4000);

var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
    this.getLogs = function(){
        return ret_obj;
    };

    this.dailyLogs = function(){
        var arr = [];
        var sql = "SELECT sc.state_1, sc.state_2, zn.name, sc.date FROM scale_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)";
        local_conn.query(sql, function(err, rows, fields){
            for(var i in rows){
                var obj = {};
                obj.state_1 = rows[i].state_1;
                obj.state_2 = rows[i].state_2;
                obj.name = rows[i].name;
                obj.date = rows[i].date;
                arr.push(obj);
            }
            //console.log("ARRRRRR: ", arr);
            ret_daily_arr = arr;
        });
        return ret_daily_arr;
    };

    this.scale_1_log_hour = function(){
        var ret_count = 0;
        var sql = "SELECT sc.state_1, zn.name, sc.date FROM scale_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 HOUR)";
        local_conn.query(sql, function(err ,rows, fields){
            if(!err){
                rows.forEach(function(item, i, rows){
                    if(0 < item.scale_1 < 2){
                        ret_count += 40;
                    }
                });
                scale_1_log_hour_count = ret_count;
            }
        });
        return scale_1_log_hour_count;
    };

    if(singleton.caller != singleton.getInstance){
        throw new Error("This object cannot be instanciated");
    }
};

singleton.instance = null;

/**
 * Singleton getInstance definition
 * @return logs class
 */
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();


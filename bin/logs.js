#!/usr/bin/env node
/**
 * Created by Kriv on 26.11.2015.
 */
var i2c = require('i2c');
var db  = require('./db_engine');
var logs = require('./logs_engine');
var us = require('underscore');
var local_conn = db.connection();
var address = 0x04;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var ret_obj = '';
var ret_daily_arr = [];
var obj = '';
var current_state='';
var crc_count = 0;
var state_1 = '',
    state_2 = '',
    old_state_1 = '',
    old_state_2 = '';
var arr_1=[], arr_2=[], date_arr=[];
var ret_chart_data = {};
var scale_1_log_hour_count = 0,
    scale_2_log_hour_count = 0,
    scale_1_log_day_count = 0,
    scale_2_log_day_count = 0;
var tmp_buff='';

//db.sys_log_query("0", "sys", "0", "System start at: " + Date().toLocaleString());
logs.log_write("sys", "System start at: " + Date().toLocaleString());

var fullDay = function(day){
    var fullDay = day+"";
    if(fullDay.length == 1){
        return "0"+fullDay;
    }
    return fullDay;
};

var fullMonth = function(month){
    var fullMonth = month+1+"";
    if(fullMonth.length == 1){
        return "0"+fullMonth;
    }
    return fullMonth;
};

var wire_loop = setInterval(function(){
    wire.read(32, function(err, res){
        var buff_bytes = new Buffer(res);
        tmp_buff = buff_bytes.toString('utf8');
        var pos = tmp_buff.indexOf(']}');
        obj = tmp_buff.substring(0, pos+2);
    });

    try {
        crc_count = 0;
        obj = JSON.parse(obj);
        //console.log(obj.d.length);
        for (var i = 0; i < (obj.d.length - 1); i++){
            crc_count += obj.d[i];
        }
        if (obj.d[obj.d.length-1] == crc_count) {
            state_1 = obj.d[3];
            state_2 = obj.d[4];
            if(old_state_1 != state_1){
                old_state_1 = state_1;
                //console.log("new_curr: " + current_state);
                //db.query('INSERT INTO io_log (pin_mode, pin_io, pin_state) VALUES("1","0","' + current_state + '")');
                //local_conn.query('INSERT INTO scale_log(zaslon_id, state_1, state_2) values("1", "' + state_1 + '", "' + state_2 + '")');
                local_conn.query('INSERT INTO scale1_log(zaslon_id, state) values("1", "' + state_1 + '")');
                obj.date = Date().toLocaleString();
                ret_obj = obj;
            }
            if(old_state_2 != state_2){
                old_state_2 = state_2;
                local_conn.query('INSERT INTO scale2_log(zaslon_id, state) values("1", "' + state_2 + '")');
                obj.date = Date().toLocaleString();
                ret_obj = obj;
            }
       } else console.log("logs.js -> wire_loop -> error CRC! CRC is: " + crc_count + "\nCRC check sum is: " + obj.d[obj.d.length-1]);
    }
    catch (err) {
        console.log("Error parsing obj! obj is: " + obj);
        //console.log(err.name + ":" + err.message + "\n" + err.stack);
    }
},1500);

var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
    this.getLogs = function(){
        return ret_obj;
    };

    this.dailyLogs = function(){
        var arr = [];
        var sql = "SELECT sc.state_1, sc.state_2, zn.name, sc.date FROM scale_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(NOW(), INTERVAL 1 DAY)";
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
        var sql = "SELECT sc.state, zn.name, sc.date FROM scale1_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)";
        local_conn.query(sql, function(err ,rows, fields){
            if(!err){
                rows.forEach(function(item, i, rows){
                    if(item.state == 1){
                        ret_count += 20;
                    }
                });
                scale_1_log_hour_count = ret_count*12;
            }
        });
        return scale_1_log_hour_count;
    };

    this.scale_2_log_hour = function(){
        var ret_count = 0;
        var sql = "SELECT sc.state, zn.name, sc.date FROM scale2_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)";
        local_conn.query(sql, function(err ,rows, fields){
            if(!err){
                rows.forEach(function(item, i, rows){
                    if(item.state == 1){
                        ret_count += 20;
                    }
                });
                scale_2_log_hour_count = ret_count*12;
            }
        });
        return scale_2_log_hour_count;
    };

    this.scale_1_log_day = function(){
        var ret_count = 0;
        var sql = "SELECT sc.state, zn.name, sc.date FROM scale1_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(NOW(), INTERVAL 1 DAY)";
        local_conn.query(sql, function(err ,rows, fields){
            if(!err){
                rows.forEach(function(item, i, rows){
                    if(item.state == 1){
                        ret_count += 20;
                    }
                });
                scale_1_log_day_count = ret_count;
            }
        });
        return scale_1_log_day_count;
    };

    this.scale_2_log_day = function(){
        var ret_count = 0;
        var sql = "SELECT sc.state, zn.name, sc.date FROM scale2_log AS sc LEFT JOIN zaslon_names AS zn ON sc.zaslon_id = zn.id WHERE sc.date >= DATE_SUB(NOW(), INTERVAL 1 DAY)";
        local_conn.query(sql, function(err ,rows, fields){
            if(!err){
                rows.forEach(function(item, i, rows){
                    if(item.state == 1){
                        ret_count += 20;
                    }
                });
                scale_2_log_day_count = ret_count;
            }
        });
        return scale_2_log_day_count;
    };

    this.chart_log = function(from, to){ //дерагем данные для графика по дням

        //ret_chart_data = {};
        //arr_1.length = 0;
        //arr_2.length = 0;

        //
        //var from = $("#from").val(),
        //    to = $("#to").val();
        //
        //from = from.split("-")[2]+"-"+from.split("-")[1]+"-"+from.split("-")[0];
        //to = to.split("-")[2]+"-"+to.split("-")[1]+"-"+to.split("-")[0];
        from = Date.parse(from);
        to = Date.parse(to);

        var date = from;
        //var date_arr = [];

        while(date <= to){
            //console.log(new Date(date));
            var  d =  new Date(date);

            var day = fullDay(d.getDate()),
                month = fullMonth(d.getMonth()),
                year = d.getFullYear();

            date_arr.push(year+"-"+month+"-"+day);
            date = date + (60*60*24*1000); //добавляем сутки в милисекундах;
        }

        console.log(date_arr);

        date_arr.forEach(function(currDate){
            console.log(currDate);
            //var sql_1 = "select count(*) as count from scale1_log where date between '"+currDate+" 00:00:00' and '"+currDate+" 23:59:59' and state='1'";
            var sql_1 = "select CONCAT_WS('-',EXTRACT(DAY from date),EXTRACT(MONTH from date), EXTRACT(YEAR from date))as date, count(*) as count"+
                        " from scale1_log where date between '"+currDate+" 00:00:00' and '"+currDate+" 23:59:59' and state='1' GROUP BY date(DATE) ORDER BY date(DATE)";
            local_conn.query(sql_1, function(err, rows, fields){
                if(!err){
                    var obj = {};
                    obj.date = currDate.split("-")[2]+"-"+currDate.split("-")[1]+"-"+currDate.split("-")[0];
                    obj.count = 0;
                    if(rows.length){
                        rows.forEach(function(item, i, rows){
                            obj.count = item.count*20;
                        });
                    }
                    arr_1.push(obj);
                }else{
                    console.log(err);
                }
            });

            //var sql_2 = "select count(*) as count from scale2_log where date between '"+currDate+" 00:00:00' and '"+currDate+" 23:59:59' and state='1'";
            var sql_2 = "select CONCAT_WS('-',EXTRACT(DAY from date),EXTRACT(MONTH from date), EXTRACT(YEAR from date))as date, count(*) as count"+
                " from scale2_log where date between '"+currDate+" 00:00:00' and '"+currDate+" 23:59:59' and state='1' GROUP BY date(DATE) ORDER BY date(DATE)";
            local_conn.query(sql_2, function(err, rows, fields){
                if(!err){
                    var obj = {};
                    obj.date = currDate.split("-")[2]+"-"+currDate.split("-")[1]+"-"+currDate.split("-")[0];
                    obj.count = 0;
                    if(rows.length){
                        rows.forEach(function(item, i, rows){
                            obj.count = item.count*20;
                        });
                    }
                    arr_2.push(obj);
                }else{
                    console.log(err);
                }
            });
        });

        arr_1 = us.map(us.groupBy(arr_1,function(doc){
            return doc.date;
        }),function(grouped){
            return grouped[0];
        });

        arr_2 = us.map(us.groupBy(arr_2,function(doc){
            return doc.date;
        }),function(grouped){
            return grouped[0];
        });

        ret_chart_data.scale_1 = arr_1;
        ret_chart_data.scale_2 = arr_2;

        console.log("+++++++++++++++++++++++");
        console.log(ret_chart_data);
        console.log("+++++++++++++++++++++++");

        return ret_chart_data;



        //var sql_1 = "select CONCAT_WS('-',EXTRACT(DAY from date),EXTRACT(MONTH from date), EXTRACT(YEAR from date))as date, count(*) as count"+
        //    " from scale1_log where date between '"+from+" 00:00:00' and '"+to+" 23:59:59' and state='1' GROUP BY date(DATE)";
        //var sql_2 = "select CONCAT_WS('-',EXTRACT(DAY from date),EXTRACT(MONTH from date), EXTRACT(YEAR from date))as date, count(*) as count"+
        //    " from scale2_log where date between '"+from+" 00:00:00' and '"+to+" 23:59:59' and state='1' GROUP BY date(DATE)";
        //local_conn.query(sql_1, function(err, rows, fields){
        //    if(!err){
        //        rows.forEach(function(item, i, rows){
        //            var obj = {};
        //            obj.date = item.date;
        //            obj.count = item.count*20;
        //            arr_1.push(obj);
        //            console.log(obj);
        //        });
        //    }else{
        //        console.log(err);
        //    }
        //});
        //local_conn.query(sql_2, function(err, rows, fields){
        //    if(!err){
        //        rows.forEach(function(item, i, rows){
        //            var obj = {};
        //            obj.date = item.date;
        //            obj.count = item.count*20;
        //            arr_2.push(obj);
        //            console.log(obj);
        //        });
        //    }else{
        //        console.log(err);
        //    }
        //});





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


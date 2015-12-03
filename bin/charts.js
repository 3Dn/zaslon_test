#!/usr/bin/env node
/**
 * Created by Kriv on 01.12.2015.
 */

var db  = require('./db_engine');
var local_conn = db.connection();

/*
var db_data = db.query("SELECT * FROM io_log LIMIT 10");
console.log("db_chart_data: "+db_data);*/


/*local_conn.query("SELECT * FROM io_log LIMIT 10", function(err, rows, fields){
    if (!err)
        console.log("DB ret: ", rows);
    else
        console.log("DB ret error!");
});*/

var chart_obj;

var chart_loop = setInterval(function(){
    chart_obj = local_conn.query("SELECT id, date, pin_state FROM io_log ORDER BY id DESC LIMIT 10", function(err, rows, fields) {
        if (!err){
            console.log("DB ret: ", rows);
            return rows;
        }else {
            console.log("DB ret error!");
        }
    });
},10000);


var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
    this.getCharts = function(){
        return JSON.parse(chart_obj);
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
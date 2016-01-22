#!/usr/bin/env node
/**
 * Created by Kriv on 26.11.2015.
 */
var i2c = require('i2c');
var db  = require('./db_engine');
var address = 0x04;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var ret_obj = '';
var obj = '';
var current_state='';
var tmp_buff='';

db.sys_log_query("0", "sys", "0", "System start at: " + Date().toLocaleString());

var wire_loop = setInterval(function(){
    wire.read(32, function(err, res){
        var buff_bytes = new Buffer(res);
        tmp_buff = buff_bytes.toString('utf8');
        var pos = tmp_buff.lastIndexOf(']}');
        obj = tmp_buff.substring(0, pos+2);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(obj);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    });
    try {
        obj = JSON.parse(obj);
        if (current_state != obj.t[0]) {
            console.log("curr: " + current_state);
            current_state = obj.t[0];
            console.log("new_curr: " + current_state);
            //db.query('INSERT INTO io_log (pin_mode, pin_io, pin_state) VALUES("1","0","' + current_state + '")');
            db.query('INSERT INTO scale_log(zaslon_id, state) values("1", "'+current_state+'")');
            ret_obj = obj;
        }
    }
    catch (err) {
        console.log("obj: " + obj);
        //console.log(err.name + ":" + err.message + "\n" + err.stack);
    }
},4000);

var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
    this.getLogs = function(){
        return ret_obj;
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


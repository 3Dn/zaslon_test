#!/usr/bin/env node
/**
 * Created by Kriv on 26.11.2015.
 */
var i2c = require('i2c');
var address = 0x04;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var ret_obj = '';
var obj = '';

var wire_loop = setInterval(function(){
    var current_state='';
    var tmp_buff='';

    wire.read(32, function(err, res){
        var buff_bytes = new Buffer(res);
        tmp_buff = buff_bytes.toString('utf8');
        var pos = tmp_buff.lastIndexOf(']}');
        obj = tmp_buff.substring(0, pos+2);
    });
    try {
        obj = JSON.parse(obj);
        if (current_state != obj.t[0]) {
            console.log("curr: " + current_state);
            current_state = obj.t[0];
            console.log("new_curr: " + current_state);
            return ret_obj;
        }
    }
    catch (err) {
        console.log("obj: " + obj);
        //console.log(err.name + ":" + err.message + "\n" + err.stack);
    }
},5000);

var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
/*    var current_state='';
    var tmp_buff='';
    var obj;*/

    this.getLogs = function(){
 /*       wire.read(32, function(err, res){
            var buff_bytes = new Buffer(res);
            tmp_buff = buff_bytes.toString('utf8');
            var pos = tmp_buff.lastIndexOf(']}');
            obj = tmp_buff.substring(0, pos+2);
        });
            try {
                obj = JSON.parse(obj);
                if (current_state != obj.t[0]) {
                    console.log("curr: " + current_state);
                    current_state = obj.t[0];
                    console.log("new_curr: " + current_state);
                    return obj;
                }
            }
            catch (err) {
                console.log("obj: " + obj);
                //console.log(err.name + ":" + err.message + "\n" + err.stack);
            }*/
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


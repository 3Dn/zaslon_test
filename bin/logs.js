#!/usr/bin/env node
/**
 * Created by Kriv on 26.11.2015.
 */
var i2c = require('i2c');
var address = 0x04;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var logs = function logs(){
    //defining a var instead of this (works for variable & function) will create a private definition

    this.current_state='';
    this.tmp_buff='';
    this.getLogs = function(){
        wire.read(32, function(err, res){
            var buff_bytes = new Buffer(res);
            this.tmp_buff = buff_bytes.toString('utf8');
            var pos = this.tmp_buff.lastIndexOf(']}');
            var obj = this.tmp_buff.substring(0, pos+2);

            try {
                obj = JSON.parse(obj);
                console.log(obj);
                if (this.current_state != obj.t[0]) {
                    console.log("curr: "+this.current_state);
                    this.current_state = obj.t[0];
                    socket.broadcast.emit('send', obj);
                    console.log("new_curr: "+this.current_state);
                }
            }
            catch (err){
                console.log("obj: "+obj);
                console.log(err.name + ":" + err.message + "\n" + err.stack);
            }
        });
    };


    if(logs.caller != logs.getInstance){
        throw new Error("This object cannot be instanciated");
    }
};

logs.instance = null;

/**
 * Singleton getInstance definition
 * @return logs class
 */
logs.getInstance = function(){
    if(this.instance === null){
        this.instance = new logs();
    }
    return this.instance;
}

module.exports.logs = logs.getInstance();


#!/usr/bin/env node
/**
 * Created by adm_korolev on 27.11.2015.
 */
var mysql       = require('mysql');
var connection  = mysql.createConnection({
    host        :   '192.168.1.28',
    user        :   'zaslon',
    password    :   'zaslonPa$$',
    database    :   'zaslon',
    port        :   '3306'
});



var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
/*    this.connect = function(){
        if (connection_state == 0) {
            connection.connect(function (err) {
                console.log("Database info: " + err);
                connection_state = 1;
            });
        }
    };*/
    this.query = function(text) {
        var query = connection.query(text, function(err, rows, fields){
            if (err) console.log("DB query error: " + err);
            return rows[0];
        });

    };
    this.sys_log_query = function(zaslon_id, sys_name, level, message) {
        //if (!zaslon_id) zaslon_id = "0";
        //if (!sys_name) sys_name = "system";
        var query = connection.query('INSERT INTO sys_log (zaslon_id, sys_name, level, message) VALUES("' + zaslon_id +'","' + sys_name + '","' + level + '","' + message + '")');
    };

    if(singleton.caller != singleton.getInstance){
        throw new Error("DB cannot be instanciated");
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
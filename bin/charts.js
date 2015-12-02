#!/usr/bin/env node
/**
 * Created by Kriv on 01.12.2015.
 */

var db  = require('./db_engine');

var db_data = db.query("SELECT * FROM io_log LIMIT 10");
console.log("db_chart_data: "+db_data);

db.connection.query("SELECT * FROM io_log LIMIT 10", function(err,rows,fields){
    if (!err)
        console.log("db.connection.query ret: " + rows);
    else
        console.log("db.connection.query ERROR!");
});

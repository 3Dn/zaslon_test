#!/usr/bin/env node
/**
 * Created by Kriv on 01.12.2015.
 */

var db  = require('./db_engine');

db.connect();
var db_data = db.query("SELECT * FROM io_log LIMIT 10");
console.log(db_data);

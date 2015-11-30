/**
 * Created by adm_korolev on 27.11.2015.
 */

var mysql       = require('mysql'),
    connection  = mysql.createConnection({
        host        :   '192.168.1.22',
        user        :   'admin_zaslon',
        password    :   'zaslon_Pa$$',
        database    :   'admin_zaslon',
        port        :   3306
    });

var singleton = function singleton(){
    //defining a var instead of this (works for variable & function) will create a private definition
    this.connect = function(){
        connection.connect(function(err) {
            console.log("Database info: " + err);
        });
    };
    this.query = function(text) {
        var query = connection.query('');
    }

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
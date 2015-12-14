/**
 * Created by user on 14.12.2015.
 */

function get_req(){
    request("http://192.168.1.156/gpio/0", function(err, res, body){
        if (err) {console.log(err);}
        else {
            console.log(res);
            console.log(body);
        }
    });
}
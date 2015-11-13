/**
 * Created by Kriv on 13.11.2015.
 */
$(document).ready(function(){

    $(".cmn-toggle").on("click", function(){
        var state = $(this).prop("checked"),
            wrapper = $(this).parents(".box-inner-switches").first();
        console.log("state: "+state);
        if(state){
            wrapper.find(".led").addClass("led_on");
        }else {
            wrapper.find(".led").removeClass("led_on")
        }
    });

});


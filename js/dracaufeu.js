/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&id="+id, function(res){
            console.log(res);
            for(i = 0; i < res.length; i++){
                baseElemenent(res[i].id, res[i].imageUri, res[i].nom,  res[i].description, lp);
            }
        });
    };


    lp =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lp&id="+id, function(res){
            for(i = 0; i < res.length; i++){
                baseElemenent(res[i].id, res[i].imageUri, res[i].nom,  res[i].description, "ac");
            }
        });
    };



    $.getJSON("index.php?a=lt", function(res){
        for(i = 0; i < res.length; i++){
            baseElemenent(res[i].id, res[i].imageUri, res[i].nom,  res[i].description, lr);
        }
    });


    baseElemenent =  function(id, img, nom, description, action){
        description = typeof description !== 'undefined' ? description : "";
        var message = $('<div class="element" data-id="'+id+'"><img src="'+img+'" /><span>'+description+nom+'</span></div>');
        $("section").append(message);
        message.click(action);
    };

});
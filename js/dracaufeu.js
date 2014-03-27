/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&id="+id, function(res){
            $('section').html("");
            for(i = 0; i < res.length; i++){
                var message = $('<div id="element"><span><img src="datas/images/france.png" alt="logo" /><p></p></span></div>');
                $("section").append(message);
                message.click(lr);
            }
        });
    };


    lp =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lp&id="+id, function(res){
            $('section').html("");
            for(i = 0; i < res.length; i++){
                baseElemenent(res[i].id, res[i].imageUri, res[i].nom,  res[i].description, "ac");
            }
        });
    };



    $.getJSON("index.php?a=lt", function(res){
        for(i = 0; i < res.length; i++){
            var message = $('<section data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><span><img src="'+res[i].imageUri+'" alt="logo" /><p>'+res[i].nom+'</p></span></div>');
            $("#contenu").append(message);
            message.click(lr);
        }
    });


    baseElemenent =  function(id, img, nom, description, action){
        description = typeof description !== 'undefined' ? description : "";
        var message = $('<div class="element" data-id="'+id+'"><img src="'+img+'" /><span>'+description+nom+'</span></div>');
        $("section").append(message);
        message.click(action);
    };



    //HEADER

    //quand on click sur le bouton afficher:
    $("#logo").on('click',function(){
        $( "#afficher" ).toggle(function() {
            //soit on fait apparaitre les onglets du menu:
            $("li.menu").slideDown();
            $("body").animate({
                paddingTop: "14em",
            }, 200 );
        }, function() {
            //soit on les masque:
            $("li.menu").slideUp();
            $("body").animate({
                paddingTop: "6em",
            }, 300 );
        });
    })

    //quand on click sur le bouton panier:
    $(".afficher_panier").on('click',function(){
        //on fait apparaitre le panier:
        $("#panier").css("display", "block");
        //on fait apparaitre le fond gris:
        $("#filter").css("display", "block");
    })

    //quand on click sur la croix du panier:
    $("#fermer").on('click',function(){
        //on fait apparaitre le panier:
        $("#panier").css("display", "none");
        //on fait apparaitre le fond gris:
        $("#filter").css("display", "none");
    })

    //quand on click sur le bouton form:
    $(".afficher_form").on('click',function(){
        //on fait apparaitre le panier:
        $("#form").css("display", "block");
        //on fait apparaitre le fond gris:
        $("#filter").css("display", "block");
    })

    //quand on click sur la croix du panier:
    $("#fermer-form").on('click',function(){
        //on fait apparaitre le panier:
        $("#form").css("display", "none");
        //on fait apparaitre le fond gris:
        $("#filter").css("display", "none");
    })

});
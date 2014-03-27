/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&id="+id, function(res){
            $('#contenu').html("");
            for(i = 0; i < res.length; i++){
                console.log(res[i]);
                var message = $('<section class="resto" data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><div class="resto"><p>'+res[i].nom+'</p><a href="#"> Voir la carte</a></div></section>');
                $("#contenu").append(message);
                message.click(lp);
            }
        });
    };


    lp =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lp&id="+id, function(res){
            $('#contenu').html('<div id="resto-list"><img class="visuResto" src="datas/images/" alt="Resto">');
            for(i = 0; i < res.length; i++){
                console.log(res[i]);
                var message = $('<section class="plats"><p> Nom </p><p> Prix</p><input name="number" type="number" value="0" min="0" max="100" step="1"></section>');
                $("#contenu").append(message);
                message.click(lp);
            }
        });
    };



    $.getJSON("index.php?a=lt", function(res){
        for(i = 0; i < res.length; i++){
            console.log(res[i]);
            var message = $('<section data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><span><img src="'+res[i].imageUri+'" alt="logo" /><p>'+res[i].nom+'</p></span></div>');
            $("#contenu").append(message);
            message.click(lr);
        }
    });


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
/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    //Contenu

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&idt="+id, function(res){
            $('#contenu').html("");
            for(i = 0; i < res.length; i++){
                console.log(res[i]);
                var message = $('<section class="resto" data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><div class="resto"><p>'+res[i].nom+'</p><a href="#"> Voir la carte</a></div></section>');
                $("#contenu").append(message);
                message.click(lp(res[i]));
            }
        });
    };


    lp =  function(data){
        //Callback pour passage de paramètre (afin d'alleger le serveur)
        return function(){
            var id = $(this).data('id');
            $.getJSON("index.php?a=lp&idr="+id, function(res){
                $('#contenu').html('<div id="resto-list"><img class="visuResto" src="'+data.imageUri+'" alt="Resto"></div>');
                for(i = 0; i < res.length; i++){
                    console.log(res[i]);
                    var message = $('<section class="plats"><p> Nom : '+res[i].nom+'</p><p> Prix '+res[i].prix+'</p></section>');
                    var bouton = $('<button data-id="'+res[i].id+'">Ajouter au panier</button>');
                    message.append(bouton);
                    $("#contenu").append(message);
                    bouton.on('click', ac);
                }
            });
        };
    };

    ac = function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=ac&id="+id, function(res){
            $('#contenu').html('<div id="resto-list"><img class="visuResto" src="'+data.imageUri+'" alt="Resto">');
            console.log(res[i]);
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

    //--------------------
    //----- Panier -------
    //--------------------





    //Menu du haut
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
                paddingTop: "6em"
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
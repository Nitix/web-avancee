/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    //Contenu

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&idt="+id, function(res){
            console.log(res);
            $('#contenu').html("");
            for(i = 0; i < res.length; i++){
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
                    /*var message = $('<section class="plats"><p>'+res[i].nom+'</p><p>'+res[i].prix+'</p></section>');*/
                    var message = $('<section class="plats"> <table> <tr> <th>Nom</th> <th>Prix</th> <th>Validation</th> </tr> <tr> <td>'+res[i].nom+'</td> <td>'+res[i].nom+'</td>');
                    /*var bouton = $('<button data-id="'+res[i].id+'">Ajouter au panier</button>');*/
                    var bouton = $('<td>Envoyer</td>');
                    message.append(bouton);
                    message.append(" </tr></table> </section>")
                    $("#contenu").append(message);
                    bouton.on('click', ac);
                }
            });
        };
    };

    ac = function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=ac&id="+id, function(res){
            //$('#contenu').html('<div id="resto-list"><img class="visuResto" src="'+res.imageUri+'" alt="Resto">');
        });
    };

    $.getJSON("index.php?a=lt", function(res){
        for(i = 0; i < res.length; i++){
            var message = $('<section data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><span><img src="'+res[i].imageUri+'" alt="logo" /><p>'+res[i].nom+'</p></span></div>');
            $("#contenu").append(message);
            message.click(lr);
        }
    });

    //--------------------
    //----- Panier -------
    //--------------------
    var panier = (function(){
        var total = 0,
            nbitems = 0,
            json = '';
        function transformJSON(data){
            $("#panier-contenu").html("<tr><th>Nom</th><th>Prix unitaire</th><th>Quantité</th><th>Total</th></tr>");
             for(var ligne in data.items){
                 console.log(data.items[ligne]);
                $("#panier-contenu").append('<tr><td>'+data.items[ligne].nom+'</td><td>'+data.items[ligne].pu+'</td><td>'+data.items[ligne].qte+'</td><td>'+data.items[ligne].total_item+'</td></tr>');
            }
            $("#panier-contenu").append('<tr class="maxwidth"></tr><tr><td></td><td>Total :</td><td>'+nbitems+'</td><td>'+total+'</td></tr>');
        };
        return {
            show : function(){
                $.getJSON("index.php?a=ag", function(res){
                    transformJSON(res);
                    $("#panier").css("display", "block");
                    $("#filter").css("display", "block");
                });
            }
        }
    })();

    //Menu du haut
    //HEADER

    //quand on click sur le bouton afficher:
    $("#logo").on('click',function(){
        $( "#afficher" ).toggle(function() {
            //soit on fait apparaitre les onglets du menu:
            $("li.menu").slideDown();
            $("body").animate({
                paddingTop: "14em"
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
    $(".afficher_panier").on('click', function(){
        panier.show();
    });

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
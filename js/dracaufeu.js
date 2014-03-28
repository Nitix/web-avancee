/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    //Contenu

    lr =  function(){
        var id = $(this).data('id');
        $.getJSON("index.php?a=lr&idt="+id, function(res){
            afficheResto(res);
        });
    };

    $('.linkResto').on('click', function(){
        $.getJSON("index.php?a=ltr", function(res){
            afficheResto(res);
        });
    });

    afficheResto = function(res){
        $('#contenu').html("");
        for(i = 0; i < res.length; i++){
            var message = $('<section class="resto" data-id="'+res[i].id+'"><img src="'+res[i].imageUri+'" alt="logo"><div class="resto"><p>'+res[i].nom+'</p><a href="#"> Voir la carte</a></div></section>');
            $("#contenu").append(message);
            message.click(lp(res[i]));
        }
    };

    lp =  function(data){
        //Callback pour passage de paramètre (afin d'alleger le serveur)
        return function(){
            var id = $(this).data('id');
            $.getJSON("index.php?a=lp&idr="+id, function(res){
                $('#contenu').html('<div id="resto-list"><img class="visuResto" src="'+data.imageUri+'" alt="Resto"></div>');
                affichePlats(res);
            });
        };
    };


    $('.linkPlats').on('click', function(){
        $.getJSON("index.php?a=ltp", function(res){
            $('#contenu').html('');
            affichePlats(res);
        });
    });


    affichePlats = function(res){
        var section = $('<section class="plats">');
        var table = $(" <table>");

        $('#contenu').append(section);
        section.append(table);
        table.html('<tr> <th>Nom</th> <th>Prix</th> <th>Validation</th> </tr> ');
        for(i = 0; i < res.length; i++){

            var message = $(' <tr><td>'+res[i].nom+'</td> <td>'+res[i].prix+' €</td></tr>');
            var bouton = $('<td class="pointer">Ajouter</td>');
            var id = res[i].id;
            message.append(bouton);
            table.append(message);
            bouton.on('click', function(){
                panier.ajout(id);
            });
        }
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
                $("#panier-contenu").append('<tr><td>'+data.items[ligne].nom+'</td><td>'+data.items[ligne].pu+' €</td><td>'+data.items[ligne].qte+'</td><td>'+data.items[ligne].total_item+' €</td></tr>');
            }
            $("#panier-contenu").append('<tr class="maxwidth"></tr><tr><td></td><td>Total :</td><td>'+nbitems+'</td><td>'+total+' €</td></tr>');
        };
        return {
            show : function(){
                $.getJSON("index.php?a=ag", function(res){
                    transformJSON(res);
                    $("#panier").css("display", "block");
                    $("#filter").css("display", "block");
                })},
            ajout : function(id){
                $.getJSON("index.php?a=ac&id="+id, function(res){
                    total = res.total;
                    nbitems = res.nb;
                    $(".small").html(nbitems + ' art<br />' + total +' €');
                });

            }
        };
    })();

    //Fil d'ariane
    updateAriane = function(nom, niveau){

    };



    //Menu du haut
    //HEADER


    //quand on click sur le bouton afficher:
    status = 0;
    $("#logo").on('click',function(){
        if(status == 0){
            //soit on fait apparaitre les onglets du menu:
            console.log(  $("li.menu"));
            $("li.menu").slideDown();
            $("body").animate({
                paddingTop: "14em"
            }, 200 );
            status = 1;
        }else{

            //soit on les masque:
            $("li.menu").slideUp();
            $("body").animate({
                paddingTop: "6em"
            }, 300 );
            status = 0;
        }
    });

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
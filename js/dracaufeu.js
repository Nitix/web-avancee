/**
 * Created by Guillaume on 18/03/14.
 */

$(document).ready(function(){

    //Contenu

    lr =  function(){
        var id = $(this).data('id');
        var nom = $(this).data('nom');
        $.getJSON("index.php?a=lr&idt="+id, function(res){
            ariane.update(1,nom, lr, id);
            afficheResto(res);
        });
    };

    $('.linkResto').on('click', function(){
        listeResto();
    });

    listeResto = function(){
        $.getJSON("index.php?a=ltr", function(res){
            ariane.update(1, "Nos Restos", listeResto, 0);
            afficheResto(res);
        });
    };

    afficheResto = function(res){
        $('#contenu').html("");
        for(i = 0; i < res.length; i++){
            var message = $('<section class="resto" data-id="'+res[i].id+'" data-nom="'+res[i].nom+'"><img src="'+res[i].imageUri+'" alt="logo"><div class="resto"><p>'+res[i].nom+'</p><a href="#"> Voir la carte</a></div></section>');
            $("#contenu").append(message);
            message.click(lp(res[i]));
        }
    };

    lp =  function(data){
        //Callback pour passage de paramètre (afin d'alleger le serveur)
        return function(){
            var id = $(this).data('id');
            var nom = $(this).data('nom');
            $.getJSON("index.php?a=lp&idr="+id, function(res){
                ariane.update(2,nom, lp, id);
                $('#contenu').html('<div id="resto-list"><img class="visuResto" src="'+data.imageUri+'" alt="Resto"></div>');
                affichePlats(res);
            });
        };
    };


    $('.linkPlats').on('click', function(){
        $.getJSON("index.php?a=ltp", function(res){
            ariane.update(1, "Nos Plats");
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
            var bouton = $('<td class="pointer" data-id="'+res[i].id+'">Ajouter</td>');
            message.append(bouton);
            table.append(message);
            bouton.on('click', function(){
                panier.ajout($(this).data('id'));
            });
        }
    };

    lt = function(){
        $.getJSON("index.php?a=lt", function(res){
            $('#contenu').html('');
            for(i = 0; i < res.length; i++){
                var message = $('<section data-id="'+res[i].id+'" data-nom="'+res[i].nom+'"><img src="'+res[i].imageUri+'" alt="logo"><span><img src="'+res[i].imageUri+'" alt="logo" /><p>'+res[i].nom+'</p></span></div>');
                $("#contenu").append(message);
                message.click(lr);
                ariane.delete(0);
            }
        });
    }
    lt();

    //--------------------
    //----- Panier -------
    //--------------------
    var panier = (function(){
        var total = 0,
            nbitems = 0,
            json = '';
        function transformJSON(data){
            $("#panier-contenu").html("<tr><th>Nom</th><th>Prix unitaire</th><th>Quantité</th><th>Total</th></tr>");
            total = data.total;
            nbitems = data.nb;
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
    ariane = (function(){
        var nomNiveauUn = '',
            actionNiveauUn = '',
            idNiveauUn = 0,
            definedNiveauUn = false,
            nomNiveauDeux = '',
            actionNiveauDeux ='',
            idNiveauDeux= 0,
            definedNiveauDeux = false;
        function show(){
            var un = $('<span class="pointer">Accueil</span>');
            un.on('click', lt);
            $("#ariane").html(un);
            if(definedNiveauUn){
                var deux = $('<span class="pointer" data-id="'+idNiveauUn+'" data-nom="'+nomNiveauUn+'">'+nomNiveauUn+'</span>');
                deux.on('click', actionNiveauUn);
                $("#ariane").append(' / ');
                $("#ariane").append(deux);
                if(definedNiveauDeux){
                    var troix = $('<span class="pointer" data-id="'+idNiveauDeux+'" data-nom="'+nomNiveauDeux+'">'+nomNiveauDeux+'</span>');
                    troix.on('click', actionNiveauDeux);
                    $("#ariane").append(' / ');
                    $("#ariane").append(troix);
                }
            }
        };
        return {
            update :function(niveau, nom, action, id){
                switch(niveau){
                    case 0:
                        definedNiveauUn = false;
                        definedNiveauDeux = false;
                        break;
                    case 1 :
                        definedNiveauUn = true;
                        definedNiveauDeux = false;

                        nomNiveauUn = nom;
                        actionNiveauUn = action;
                        idNiveauUn = id;
                        break;
                    case 2 :
                        nomNiveauDeux = nom;
                        actionNiveauDeux = action;
                        idNiveauDeux=  id;
                        definedNiveauDeux = true;
                        break;
                }
                show();
            },
            delete :function(niveau){
                switch(niveau){
                    case 0:
                        definedNiveauUn = false;
                        definedNiveauDeux = false;
                        break;
                    case 1 :
                        definedNiveauDeux = false;
                        break;
                }
                show();
            }
        };
    })();

    //Menu du haut
    //HEADER


    //quand on click sur le bouton afficher:
    status = 0;
    $("#logo").on('click',function(){
        if(status == 0){
            //soit on fait apparaitre les onglets du menu:
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
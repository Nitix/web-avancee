<?php

class Vue{


    public static function affiche($panier)
    {
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <!-- style -->
            <link rel="stylesheet" href="css/style.css"/>

            <!-- title -->
            <title> EasyLunch </title>

            <!-- meta -->
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="HandheldFriendly" content="true">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">

            <!-- script -->
            <script src="js/jquery-1.11.0.min.js"></script>
            <script src="js/dracaufeu.js"></script>

        </head>

        <body>
        <nav>
            <ul>
                <li class="menu" id="accueil"><a href="index.html">Accueil</a> </li>
                <li class="menu restos"><a href="#">Nos Restos</a></li>
                <li class="menu plats"><a href="#">Nos Plats </a></li>
                <li ><a href="index.php"><img class="logo" src="datas/images/logo_small.png"></a></li>
                <li class="afficher_panier"><img src="datas/images/panier.png"><a><div class="small"><?php echo $panier['nb'] . " art<br /> " . $panier['total']?> €</div></a></li>
                <li class="afficher_form"><a href="#"><img src="datas/images/contact.png"></a></li>
                <li id="afficher"><img id="logo" src="datas/images/logo_small.png" alt="logo"><span><img class="afficher_panier" src="datas/images/panier.png"><img class="afficher_form" src="datas/images/contact.png"></span></li>
            </ul>
        </nav>

        <span id="filter"></span>

        <div id="panier">
            <img id="fermer" src="datas/images/croix.png" alt="logo">
            <h1>Panier</h1>
            <table id="panier-contenu">
            </table>
        </div>

        <div id="form">
            <img id="fermer-form" src="datas/images/croix.png" alt="logo">
            <h1>Contact</h1>
            <form  method="POST" action="mailto:toto@gmail.com">
                <!-- --------------Le message----------------------->
                <input type="text" placeholder="Nom" name="nom" required /><br>
                <input type="text" placeholder="Mail" name="mail" required /><br>
                <textarea rows="5" placeholder="Message" name="content_contact">Contenu de votre message </textarea>

                <!-- --------------Bouton envoyer-------------------->
                <input type="submit" name="submit" value="Envoyer"/>
            </form>
        </div>
        <div id="contenu"></div>
        </body>
        </html>
    <?php
    }

}
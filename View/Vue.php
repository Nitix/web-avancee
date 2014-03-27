<?php

class Vue{


    public static function affiche($themes = null)
    {
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mon Resto</title>
            <script src="js/jquery-1.11.0.min.js"></script>
            <script src="js/dracaufeu.js"></script>
        </head>
        <body>
        <nav>
            <div class='Accueil'> Mon Resto</div>
            <div class ='Panier'> panier </div>
        </nav>
        <section></section>
        </body>
        </html>
    <?php
    }

}
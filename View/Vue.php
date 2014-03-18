<?php

class Vue{


	public function affiche($param=null){

		return "<!DOCTYPE html>
		<html>
		<head>
			<title>Mon Resto</title>
		</head>
		<body>
		<nav>
		<div class='Accueil'> Mon Resto</div>
		<div class ='Panier'> panier </div>
		</nav>
		".$this->content($param)."</body>
		</html>"
	}


	public function content($param=null){

		
	}





}
<?php
	
class Controller{

	public function __construct(){
		
		$this->action=  array (
						'lt' => 'listetheme',
						't' => 'theme',
						'lr' =>'listeresto',
						'r' =>'resto'
						'lp' => 'listeplat',
						'p' => 'plat',
						'ac' =>'ajoutpanier',
						'ag' =>'panier'
						);
	}



public function callAction($param=null){
		
		if(isset($param["a"])) { // si $param contient

			if (array_key_exists($param["a"], $this->action)){
				$a = $this->action[$param['a']];
				return $this->$a($param);

			}else{

				return $this->defaut();
			}
		}else{

				return $this->defautPage();
			}
	}

	public function defautPage(){
		return header('Location: web-avancee?a=lt');      
  					exit();
	}

	public function defaut(){
		return "404 page not found";
	}





public function listetheme($param){

	
	
}	

}

public function theme($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function listeresto($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function rest($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function listeplat($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function plat($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function ajoutpanier($param){
	if(!isset($param['id'])){
		return $this->defaut();
	}else{
	
	
}	

}

public function panier($param){

		

}

}
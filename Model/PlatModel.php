<?php

/**
 * Description of PlatModel
 *
 * @author Guillaume
 */
class PlatModel {
    	private $guzzleClient;
	static private $baseUri = 'https://webetu.iutnc.univ-lorraine.fr/www/canals5/crazylunch/';
	static private $ressourceName ='plats/'	;
	private $arrayData = array();
	private $rawData;


	public function __construct(){
		$this->guzzleClient = new Client(static::$baseUri);
	}

	public function find($id){  
	    $this->request = $this->guzzleClient->get(static::$ressourceName.$id);
	    $this->reponse = $request->send();
	    $this->rawData = $reponse->json();
	    $this->arrayData = json_decode($rawData);
	}
	
	public function findAll(){
	    $this->request = $this->guzzleClient->get(static::$ressourceName);
	    $this->reponse = $request->send();
	    $this->rawData = $reponse->json();
	    $this->arrayData = json_decode($rawData);
	}
	
	public function findRel($id,$relation){
	    
	    $this->request = $this->guzzleClient->get(static::$ressourceName.$id.'/'.$relation);
	    $this->reponse = $request->send();
	    $this->rawData = $reponse->json();
	    $this->arrayData = json_decode($rawData);
	}
	
	public function getJson(){
	    return $this->rawData;
	}
	
	public function getArray(){
	    return $this->arrayData;
	}
}

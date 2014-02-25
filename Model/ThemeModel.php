<?php

/**
 * Description of ThemeModel
 *
 * @author Guillaume
 */
use Guzzle\Http\Client;

class ThemeModel {

	private $guzzleClient;
	private $baseUri = 'https://webetu.iutnc.univ-lorraine.fr/www/canals5/crazylunch/';
	private $resourceName ='Themes'	;
	private $arrayData = array();
	private $rawData;


	public function __construct(){
		$this->guzzleClient = new Client(static::$baseUri);
	}

	public function find($id){
		$this->guzzleClient->get();
	}
}
<?php

/**
 * Description of ThemeModel
 * @author Tristan
 * @author Guillaume
 */
use Guzzle\Http\Client;

class ThemeModel {

    private $guzzleClient;
    static private $baseUri = 'https://webetu.iutnc.univ-lorraine.fr/www/canals5/crazylunch/';
    static private $ressourceName = 'themes/';
    private $arrayData = array();
    private $rawData;

    public function __construct() {
        $this->guzzleClient = new Client(static::$baseUri);
    }

    public function find($id) {
        $request = $this->guzzleClient->get(static::$ressourceName . $id);
        $reponse = $request->send();
        $this->rawData = $reponse->json();
        $this->arrayData = json_decode($this->rawData);
    }

    public function findAll() {
        $request = $this->guzzleClient->get(static::$ressourceName);
        $reponse = $request->send();
        $this->rawData = $reponse->json();
        $this->arrayData = json_decode($this->rawData);
    }

    public function findRel($id, $relation) {

        $request = $this->guzzleClient->get(static::$ressourceName . $id . '/' . $relation);
        $reponse = $request->send();
        $this->rawData = $reponse->json();
        $this->arrayData = json_decode($this->rawData);
    }

    public function getJson() {
        return $this->rawData;
    }

    public function getArray() {
        return $this->arrayData;
    }

}

<?php

/**
 * Description of PlatModel
 *
 * @author Guillaume
 */
use Guzzle\Http\Client;


class PlatModel {

    private $guzzleClient;
    static private $baseUri = 'https://webetu.iutnc.univ-lorraine.fr/www/canals5/crazylunch/';
    static private $ressourceName = 'plats/';
    private $arrayData = array();
    private $rawData;

    public function __construct() {
        $this->guzzleClient = new Client(static::$baseUri);
    }

    public function find($id) {
        $request = $this->guzzleClient->get(static::$ressourceName . $id);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
        return $this;
    }

    public function findAll() {
        $request = $this->guzzleClient->get(static::$ressourceName);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
        return $this;
    }

    public function findRel($id, $relation) {

        $request = $this->guzzleClient->get(static::$ressourceName . $id . '/' . $relation);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
        return $this;
    }

    public function getJson() {
        return $this->rawData;
    }

    public function getArray() {
        return $this->arrayData;
    }

}

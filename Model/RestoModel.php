<?php

use Guzzle\Http\Client;

/**
 * Description of RestoModel
 *
 * @author Guillaume
 */
class RestoModel {

    private $guzzleClient;
    static private $baseUri = 'https://webetu/www/canals5/crazylunch/';
    static private $ressourceName = "restos/";
    private $arrayData;
    private $rawdata;

    public function __construct() {
        $this->guzzleClient = new Client(static::$baseUri);
    }

    public function find($id) {
        $request = $this->guzzleClient->get(static::$ressourceName . $id);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
    }

    public function findAll() {
        $request = $this->guzzleClient->get(static::$ressourceName);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
        return $this;
    }

    public function findRel($id, $rel) {
        $request = $this->guzzleClient->get(static::$ressourceName . $id . '/' . $rel);
        $response = $request->send();
        $this->rawData = $response->getBody(true);
        $this->arrayData = $response->json();
    }

    public function getJson() {
        return $this->rawData;
    }

    public function getArray() {
        return $this->arrayData;
    }

}

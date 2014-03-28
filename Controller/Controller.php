<?php

class Controller{

    public function __construct(){

        $this->action=  array (
            'lt' => 'listetheme',
            't' => 'theme',
            'lr' =>'listeresto',
            'r' =>'resto',
            'lp' => 'listeplat',
            'p' => 'plat',
            'ac' =>'ajoutpanier',
            'ag' =>'panier',
            'ltp' => 'listeToutPlats',
            'ltr' => 'listeToutRestos'
        );
    }

    public function returnJson(){
        header("Content-type: application/json");
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
        $c = Cart::getInstance();
        Vue::affiche($c->getShortArray());
    }

    public function defaut(){
        echo "404 page not found";
    }

    public function listeToutPlats(){
        $r = new PlatsModel() ;
        $json = $r->findAll()->getJson();
        $this->returnJson();
        echo $json;
    }

    public function listeToutRestos(){
        $r = new RestoModel();
        $json = $r->findAll()->getJson();
        $this->returnJson();
        echo $json;
    }

    public function listetheme(){
        $r = new ThemeModel() ;
        $json = $r->findAll()->getJson();
        $this->returnJson();
        echo $json;
    }

    public function theme($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{

            $r = new ThemeModel() ;
            $json = $r->find($param['id'])->getJson();
            $this->returnJson();
            echo $json;
        }
    }

    public function listeresto($param){
        if(!isset($param['idt'])){
            echo $this->defaut();
        }else{
            $r = new ThemeModel() ;
            $json = $r->findRel($_GET['idt'], 'restos')->getJson();
            $this->returnJson();
            echo $json;
        }

    }

    public function resto($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $r = new RestoModel() ;
            $json = $r->find($param['id'])->getJson();
            $this->returnJson();
            echo $json;
        }

    }

    public function listeplat($param){
        if(!isset($param['idr'])){
            echo $this->defaut();
        }else{
            $r = new RestoModel() ;
            $json = $r->findRel($param['idr'], 'plats')->getJson();
            $this->returnJson();
            echo $json;

        }

    }

    public function plat($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $r = new RestoModel() ;
            $json = $r->find($param['id'])->getJson();
            $this->returnJson();
            echo $json;

        }

    }

    public function ajoutpanier($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $c= Cart::getInstance();
            $this->returnJson();
            $plat = new PlatModel();
            $c->add($plat->find($param['id'])->getArray());
            echo $c->getShort();
        }

    }

    public function panier(){
        $c= Cart::getInstance();
        $this->returnJson();
        echo $c->get();
    }

}
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
            'ag' =>'panier'
        );
    }

    public function echoJson(){
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
        header('Location: web-avancee?a=lt');
        exit();
    }

    public function defaut(){
        echo "404 page not found";
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
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{

            $r = new ThemeModel() ;
            $json = $r->findRel($param['id'], 'restos')->getJson();
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
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $r = new RestoModel() ;
            $json = $r->find($param['id'])->getJson();
            $this->returnJson();
            echo $json;

        }

    }

    public function plat($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $r = new PlatModel() ;
            $json = $r->find($param['id'])->getJson();
            $this->returnJson();
            echo $json;

        }

    }

    public function ajoutpanier($param){
        if(!isset($param['id'])){
            echo $this->defaut();
        }else{
            $r = new PlatModel() ;
            $c= $r->getInstance();
            echo $this->returnJson();
            echo $c->add($param);

        }

    }

    public function panier($param){
        $r = new PlatModel() ;
        $c= $r->getInstance();
        echo $this->returnJson();
        echo $c->get();

    }

}
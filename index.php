<?php

require 'vendor/autoload.php';
include 'lunch_autoload.php' ;

$c= new Controller() ;
$c->callAction( $_REQUEST ) ;
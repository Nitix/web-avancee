<?php
require 'vendor/autoload.php';
include 'lunch_autoload.php' ;
session_start();

$c= new Controller() ;
$c->callAction( $_REQUEST ) ;
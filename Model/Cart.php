<?php

/**
 * Description of Cart class
 *
 * @author canals
 */
class Cart {
    
    private static $sessVarName = 'thhstattstftftta';
    private $nbItems=0;
    private $total=0;
    private $items=array();
    
    /**
     * getInstance : returns the current instance of a Cart, stored in the session
     * if the instance does not exists : creates et stores it
     * 
     * @access public
     * @static
     * @return Cart the current cart instance 
     */
    public static function getInstance() {
      if (! isset( $_SESSION[static::$sessVarName])) {
         $cart = new Cart();
         $_SESSION[static::$sessVarName]=$cart;  
      } 
      
      $cart = & $_SESSION[static::$sessVarName];
      return $cart;
    }
    
    /**
     * add : add an item into the cart and update nbItems and total
     * if the item is already present in the cart, increment the quantity
     * the added item is an array : array('id'=>itemId, 'nom'=>itemName
     *                                    'prix'=>itemPrice) 
     * 
     * @access public
     * @param Array $item : an array corresponding to the added item
     * @return void
     */
    public function add(Array $item) {
        $id = $item['id'];
        if (array_key_exists($id, $this->items)) {
            $this->items[$id]['qte']++;
            $this->items[$id]['total_item'] +=$item['prix'];
        } else {
            $this->items[$id]['qte'] = 1;
            $this->items[$id]['nom'] = $item['nom'];
            $this->items[$id]['pu'] = $item['prix'];
            $this->items[$id]['total_item']=$item['prix'];
        }
        $this->nbItems++;
        $this->total += $item['prix'];
        
    }

    /**
     *  get : get a json representation of the cart
     *
     *  @access public  
     *  @return String (json encoded)
     */
    public function get() {
        $cart['nb'] = $this->nbItems;
        $cart['total'] = $this->total;
        $cart['items'] = $this->items;
        return json_encode($cart);
        
    }
    public function getShort() {
        $cart['nb'] = $this->nbItems;
        $cart['total'] = $this->total;
        return json_encode($cart);
    }
}


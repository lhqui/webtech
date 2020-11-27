<?php
namespace Classes;
class User {
    public $_data,
            $_logged=false;
    public function __construct($user = null) {
        $db = DB::getInstance();
        if(!$user) {
            if(Session::exist('session/user')) {
                $userFind=self::find(Session::get(Config::get('session/user')));
                if($userFind!=null) {
                    $this->_data = $userFind;
                    $this->_logged = true;
                }
                else
                    print_r("Invalid user");
            }
            else
                print_r("Invalid user session");
        }
        else {
            $userFind=self::find($user);
            if($userFind != null) {
                $this->_data = $userFind;
                $this->_logged = true;
            }
            else
                print_r("Invalid user");
        }
    }
    public static function find($username) {
        $db = DB::getInstance();
        $db->get('user',array('username','=',$username));
        if($db->everythingOk())
            return $db->first();
    }
    public static function login($uname,$psw) {
        $db = DB::getInstance();
        $db->get('user',array('username','=',$uname));
        if($db->everythingOk()) {
            $result = $db->first();
            if(strcmp($result->username,$uname)===0 && strcmp($result->password,$psw)===0) {
                Session::put(Config::get('session/user'),$uname);
                return true;
            }
        }
        return false;
    }
}
?>
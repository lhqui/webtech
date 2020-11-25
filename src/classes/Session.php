<?php 
namespace Classes;
class Session {
    public static function put($key,$value)
    {
        return $_SESSION[$key] = $value;
    }

    public static function get($name)
    {
        return $_SESSION[$name];
    }

    public static function exist($name)
    {
        return (isset($_SESSION[$name])) ? true : false;
    }

    public static function delete($name)
    {
        if(self::exist($name))
            unset($_SESSION[$name]);
    }

    public static function flash($name,$string ='')
    {
        if(self::exist($name))
        {
            $session = self::get($name);
            self::delete($name);
            return $session;
        }
        else
            return self::put($name,$string);
        return '';
    }
}
?>
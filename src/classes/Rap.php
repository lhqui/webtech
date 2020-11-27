<?php
namespace Classes;
class Rap {
    public $_data;
    public static function add($post) {
        $db = DB::getInstance();
        if($db->insert('phim',$data)) 
            return true;
        else
            return false;
    }
    public function getAllSuatChieu($phim_id) {
        
    }
}
?>
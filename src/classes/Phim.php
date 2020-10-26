<?php
namespace Classes;
class Phim {
    public $data;
    private function __construct($id) {
        $db = DB::getInstance();
        $db->get('phim',array('phim_id','=',$id));
        if($db->everythingOk()) {
            $this->_data = $db->first();
        }
    }
    public static function getAll() {
        $movieList = array();
        $db = DB::getInstance();
        $db->get('phim');
        if($db->everythingOk()) {
            foreach($db->result() as $result)
            {
                $movie = new Phim($result->phim_id);
                array_push($movieList,$movie);
            }
            return $movieList;
        }
    }
    public static function add($data) {
        $db = DB::getInstance();
        if($db->insert('phim',$data)) 
            return true;
        else
            return false;
    }
}
?>
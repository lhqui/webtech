<?php
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
                $movie = new Phim($result->PHIM_ID);
                array_push($movieList,$movie);
            }
            return $movieList;
        }
    }
}
?>
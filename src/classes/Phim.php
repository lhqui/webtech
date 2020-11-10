<?php
namespace Classes;
class Phim {
    public  $_data,
            $_dangchieu;
    /* 
        $data = phim_id / phim_ten / phim_anhbia / phim_mieuta / phim_ngaysx / phim_ngaychieu
                phim_gia / phim_thoiluong
    */
    public function __construct($id) {
        $db = DB::getInstance();
        $db->get('phim',array('phim_id','=',$id));
        if($db->everythingOk()) {
            // lay du lieu
            $this->_data = $db->first();
            // phim dang chieu hay sap chieu ?
            $now = date('Y/m/d');
            $interval = \date_diff(date_create($this->_data->phim_ngaychieu),date_create($now));
            $interval=$interval->format("%a");
            $interval > 0 ? $this->_dangchieu=true : $this->_dangchieu=false;
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
    public function img() {
        return "data:image/png;base64,"    . base64_encode($this->_data->phim_anhbia) ;
    }
    public function template() {
        echo "
            <div data-dangchieu='".$this->_dangchieu."' class='phim' id='".$this->_data->phim_id."'>
                <img src='".$this->img()."'></img>
                <h4 class='phim_ten'>".$this->_data->phim_ten."</h4>
                <div id='phim_mieuta'>".$this->_data->phim_mieuta."</div>
            </div>
        ";
    }
}
?>
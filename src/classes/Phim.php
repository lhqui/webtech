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
            $now = new \DateTime(date('Y-m-d'));
            $ngaychieu = new \DateTime($this->_data->phim_ngaychieu);        
            if($ngaychieu>$now)
                $this->_dangchieu=0;
            else
                $this->_dangchieu=1;
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
    public function getAllRap() {
        // Select tất cả rạp có chiếu phim này
        $ds_rap = array();
        $db=DB::getInstance();
        $db->query('select rap_id from suatchieu where phim_id=(?)',array($this->_data->phim_id));
        if($db->everythingOk())
        {
            foreach($db->result() as $result)
            {
                $rap = new Rap($result->rap_id);
                array_push($ds_rap,$rap);
            }
            return $ds_rap;
        }
    }
    public function template() {
        echo "
            <div data-dangchieu='".$this->_dangchieu."' class='phim' id='".$this->_data->phim_id."'>
                <img id='phim_anhbia' src='".Image::img($this->_data->phim_anhbia)."'></img>
                <img id='phim_anh' src='".Image::img($this->_data->phim_anh)."'></img>
                <h4 id='phim_ten'>".$this->_data->phim_ten."</h4>
                <div id='phim_mieuta'>".$this->_data->phim_mieuta."</div>
                <div id='phim_thoiluong'>".$this->_data->phim_thoiluong."</div>
                <div id='phim_ngaychieu'>".$this->_data->phim_ngaychieu."</div>
                <div id='phim_gia'>".$this->_data->phim_gia."</div>
            </div>
        ";
    }
}
?>
<?php 
namespace Classes;
class MuaVe {
    public $_data,
    $_suatchieu,
    $_ds_ghe=[];
    public function __construct($uname,$muave_stt) {
        $db=DB::getInstance();
        $db->query('select * from muave where username=? and muave_stt=?',array($uname,$muave_stt));
        if($db->everythingOk()) {
            $this->_data = $db->first();
            $this->_suatchieu = new SuatChieu($this->_data->rap_id,$this->_data->phong_stt,$this->_data->suatchieu_thoidiem);
            $db->query('select * from ve where username=? and muave_stt=?',array($uname,$muave_stt));
            if($db->everythingOk()) {
                foreach($db->result() as $ghe) {
                    array_push($this->_ds_ghe,$ghe);
                }
            }
        }
    }
    public static function getAll($uname = null) {
        if($uname == null) {
            $uname = Session::get(Config::get('session/user'));
        }
        $ds_ve=[];
        $db=DB::getInstance();
        $db->query('select * from muave where username=? order by muave_stt desc',array($uname));
        if($db->everythingOk()) {
            foreach($db->result() as $row) {
                array_push($ds_ve,new MuaVe($uname,$row->muave_stt));
            }
        }
        return $ds_ve;
    }
}

?>
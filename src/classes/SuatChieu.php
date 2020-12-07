<?php 
namespace Classes;
class SuatChieu {
    public $_data,
        $_phim,
        $_isFull,
        
        $_isDangChieu,
        $_end;
    public function __construct($rap_id,$phong_stt,$suatchieu_thoidiem) {
        $db = DB::getInstance();
        $db->query('select * from suatchieu where rap_id=? and phong_stt=? and suatchieu_thoidiem=?',array($rap_id,$phong_stt,$suatchieu_thoidiem));
        // $db->get('suatchieu',array('suatchieu_id','=',$id));
        if($db->everythingOk()) {
            // lay du lieu
            $this->_data = $db->first();
            // // get phim
            $this->_phim = new Phim($this->_data->phim_id);
            // check if dangchieu
            $now=date("Y-m-d H:i:s");
            $start = strtotime($this->_data->suatchieu_thoidiem);
            $end = strtotime('+'.$this->_phim->_data->phim_thoiluong.' minutes',$start);
            $this->_end = date('Y-m-d H:i:s',$end);
            // $this->_end = $end;
            if($now>date('Y-m-d H:i:s',$start) && $now<date('Y-m-d H:i:s',$end)) {
                $this->_isDangChieu = true;
            }
            else
                $this->_isDangChieu=false;
            // check if full
        }
        else
            print_r('error');
    }
    public function template() {
        echo "
            <suat-chieu id='".$this->_data->suatchieu_id."'></suat-chieu>
        ";
    }
    public static function getAll($phim,$ngay) {
        $result = [];
        $db=DB::getInstance();
        $db->query('select * from suatchieu where DATE(suatchieu_thoidiem) = ? and phim_id = ?',array($ngay,$phim));
        if($db->everythingOk()) {
            foreach($db->result() as $suatchieu) {
                $suat = new SuatChieu($suatchieu->rap_id,$suatchieu->phong_stt,$suatchieu->suatchieu_thoidiem);
                array_push($result,$suat);
            }
        }
        return $result;
    }
    public static function add($phim,$phong,$thoidiem) {
        $db = DB::getInstance();
        $result = $db->insert('suatchieu',array(
            'rap_id' => $phong->_data->rap_id,
            'phong_stt' => $phong->_data->phong_stt,
            'suatchieu_thoidiem' => $thoidiem,
            'phim_id' => $phim->_data->phim_id
        ));
        if($result) 
            return true;
        else
            return false;
    }
}

?>
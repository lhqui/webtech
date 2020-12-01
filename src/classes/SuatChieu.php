<?php 
namespace Classes;
class SuatChieu {
    public $_data,
        $_phim,
        $_isFull,
        $_isDangChieu;
    public function __construct($id) {
        $db = DB::getInstance();
        $db->get('suatchieu',array('suatchieu_id','=',$id));
        if($db->everythingOk()) {
            // lay du lieu
            $this->_data = $db->first();
            // get phim
            $this->_phim = new Phim($this->_data->phim_id);
            // check if dangchieu
            $now=date("Y-m-d H:i:s");
            $ngaychieu = strtotime($this->_data->suatchieu_ngaychieu);
            $end = strtotime('+'.$this->_phim->_data->phim_thoiluong.' minutes',strtotime($start));
            if($now>$ngaychieu && $now<$end) {
                $this->_isDangChieu = true;
            }
            else
                $this->_isDangChieu=false;
            // check if full
        }
    }
    public function template() {
        echo "
            <suat-chieu id='".$this->_data->suatchieu_id."'></suat-chieu>
        ";
    }
    public static function getAll($phim,$ngay) {
        $db=DB::getInstance();
        $db->query('select * from suatchieu where DATE(suatchieu_thoidiem) = ? and phim_id = ?',array($ngay,$phim));
        if($db->everythingOk()) {
            return $db->result();
        }
    }
}

?>
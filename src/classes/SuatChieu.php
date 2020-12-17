<?php 
namespace Classes;
class SuatChieu {
    public $_data,
        $_phim,
        $_isFull,
        $_isDangChieu,
        $_veRemain,
        $_isPassed,
        $_viTri,
        $_end;
    public function __construct($rap_id,$phong_stt,$suatchieu_thoidiem) {
        $db = DB::getInstance();
        $db->query('select * from suatchieu where rap_id=? and phong_stt=? and suatchieu_thoidiem=?',array($rap_id,$phong_stt,$suatchieu_thoidiem));
        // $db->get('suatchieu',array('suatchieu_id','=',$id));
        if($db->everythingOk()) {
            // lay du lieu
            $this->_data = $db->first();
            // $rap= new Rap($this->_data->rap_id);
            $this->_viTri = "Phòng " . $this->_data->phong_stt ." ". $this->getRapName(); 
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
            else{
                $this->_isDangChieu=false;
                if($now < date('Y-m-d H:i:s',$start)) {
                    $this->_isPassed = false;
                }
                else {
                    $this->_isPassed = true;
                }
            }
            // check if full
            $db->query('select count(*) as result from ve where rap_id = ? and phong_stt = ? and suatchieu_thoidiem=?',array($this->_data->rap_id,$this->_data->phong_stt,$this->_data->suatchieu_thoidiem));
            $veCount = $db->first()->result;
            $this->_isFull=$veCount==50?true:false;
            $this->_veRemain=50-$veCount;
        }
        else
            print_r('error');
    }
    private function getRapName() {
        $db=DB::getInstance();
        $db->get('rap',array('rap_id','=',$this->_data->rap_id));
        return $db->first()->rap_ten;
    }
    public function template() {
        echo "
            <suat-chieu id='".$this->_data->suatchieu_id."'></suat-chieu>
        ";
    }
    public function checkGhe($row,$col,$uname) {
        // 0=available 1=taken 2=taken by me
        $db=DB::getInstance();
        $query=$db->query('select * from ve where rap_id=? and phong_stt=? and suatchieu_thoidiem=? and ghe_hang=? and ghe_stt=?',array(
            $this->_data->rap_id,$this->_data->phong_stt,$this->_data->suatchieu_thoidiem,$row,$col
        ));
        if($db->count()==0) {
            return 0;
        }
        else {
            if($query->first()->username==$uname) {
                $timeQuery = $db->query('select * from muave where username=? and muave_stt=?',array($uname,$query->first()->muave_stt));
                $time = $timeQuery->first()->muave_thoidiem;
                return $time;
            }
            else
                return 1;
        }
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
<?php 
namespace Classes;
class Phong {
    public $_data,
        $_lichchieu=[],
        $_dangchieu;
    public function __construct($phong_stt,$rap_id) {
        $db=DB::getInstance();
        // get phim currently showing in this room
        $db->query('select * from phong where phong_stt = ? and rap_id = ?',array($phong_stt,$rap_id));
        if($db->everythingOk())
            $this->_data = $db -> first();
        // $now=date("Y-m-d H:i:s");
        $db->query('select * from suatchieu where rap_id=? and phong_stt=? order by suatchieu_thoidiem',array($rap_id,$phong_stt));
        /*$db->query('select * from suatchieu where rap_id=? and phong_stt=? and ?>suatchieu_thoidiem and ?<ADDTIME(suatchieu_thoidiem,CONCAT(select phim_thoiluong from phim where phim_id = phim_id),":0")',array($rap_id,$phong_stt,$now,$now));*/
        if($db->everythingOk()) {
            foreach($db->result() as $suatchieu) {
                // get all suatchieu of this phong
                
                $suat = new SuatChieu($suatchieu->rap_id,$suatchieu->phong_stt,$suatchieu->suatchieu_thoidiem);
                array_push($this->_lichchieu,$suat);
                if($suat->_isDangChieu) 
                    $this->_dangchieu=$suat;
            }
            // $this->_dangchieu = new SuatChieu($db->first()->suatchieu_id);
        }
        else {
            print_r($db->error());
        }
    }
    public function pushSuatChieu($phim_id) {
        $now = date("Y-m-d H:i:s");
        if(empty($this->_lichchieu)) {
            SuatChieu::add(new Phim($phim_id),$this,$now);
        }
        else {
            $thoidiem = end($this->_lichchieu)->_end;
            if($now > $thoidiem) 
                SuatChieu::add(new Phim($phim_id),$this,$now);
            else
                SuatChieu::add(new Phim($phim_id),$this,date('Y-m-d H:i:s',strtotime('+15 minutes',strtotime($thoidiem))));
        }
    }
}
?>
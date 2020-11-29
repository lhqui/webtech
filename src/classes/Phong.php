<?php 
namespace Classes;
class Phong {
    public $_data,
        $_lichchieu;
    public function __construct($phong_stt,$rap_id) {
        $db=DB::getInstance();
        // get phim currently showing in this room
        // $now=date("Y-m-d H:i:s");
        $db->query('select * from suatchieu where rap_id=? and phong_stt=?',array($rap_id,$phong_stt));
        /*$db->query('select * from suatchieu where rap_id=? and phong_stt=? and ?>suatchieu_thoidiem and ?<ADDTIME(suatchieu_thoidiem,CONCAT(select phim_thoiluong from phim where phim_id = phim_id),":0")',array($rap_id,$phong_stt,$now,$now));*/
        if($db->everythingOk()) {
            foreach($db->result() as $suatchieu) {
                // get all suatchieu of this phong
                array_push($this->_lichchieu,new SuatChieu($suatchieu->suatchieu_id));
            }
            // $this->_dangchieu = new SuatChieu($db->first()->suatchieu_id);
        }
        else {
            print_r($db->error());
        }
    }
    public function pushSuatChieu($phim) {

    }
}
?>
<?php
namespace Classes;
class Rap {
    public $_data,
        $_dsPhong = array();
    // rap_id // rap_ten // rap_diachi
    public function __construct($rap_id) {
        $db = DB::getInstance();
        if($rap_id) {
            $db->get('rap',array('rap_id','=',$rap_id));
            if($db->everythingOk()) {
                // lay du lieu
                $this->_data = $db->first();
                // lay ds_phong
                $db->get('phong',array('rap_id','=',$rap_id));
                if($db->everythingOk()) {
                    foreach($db->result() as $phong) {
                        array_push($this->_dsPhong,new Phong($phong->phong_stt,$rap_id));
                    }
                }
            }
        }
    }
    public function makeSuatChieu() {
        
    }
    public static function getAll() {
        $ds_rap=[];
        $db = DB::getInstance();
        $db->get('rap',array());
        if($db->everythingOk()) {
            foreach($db->result() as $rap) {
                $rapInstance = new Rap($rap->rap_id);
                array_push($ds_rap,$rapInstance);
            }
        }
        return $ds_rap;
    }
    public static function add($post) {
        $db = DB::getInstance();
        $rapInsert = $db->insert('rap',array(
            'rap_ten' => $post['rap_ten'],
            'rap_diachi' => $post['rap_diachi']
        ));
        $query = $db->query('select * from rap where rap_ten = ? and rap_diachi=?',array($post['rap_ten'],$post['rap_diachi']));
        $rap_id = $query->first()->rap_id;
        for($i = 1;$i<=$post['phong_soluong'];$i++) {
            $db->insert('phong',array(
                'rap_id' => $rap_id,
                'phong_stt'=>$i
            ));
        }
        return true;
    }
    public function getAllSuatChieu($phim_id) {
        
    }
}
?>
<?php 
namespace Classes;
class SuatChieu {
    public $_data,
        $_isFull;

    public function __construct($id) {
        $db = DB::getInstance();
        $db->get('suatchieu',array('suatchieu_id','=',$id));
        if($db->everythingOk()) {
            // lay du lieu
            $this->_data = $db->first();
            
        }
    }
    public function template() {
        echo "
            <suat-chieu id='".$this->_data->suatchieu_id."'></suat-chieu>
        ";
    }
}

?>
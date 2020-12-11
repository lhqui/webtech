<?php
namespace Classes;
class User {
    public $_data,
            $_logged=false;
    public function __construct($user = null) {
        $db = DB::getInstance();
        if(!$user) {
            if(Session::exist(Config::get('session/user'))) {
                $userFind=self::find(Session::get(Config::get('session/user')));
                if($userFind!=null) {
                    $this->_data = $userFind;
                    $this->_logged = true;
                }
                else
                    print_r("Invalid user");
            }
            else
                print_r("Invalid user session");
        }
        else {
            $userFind=self::find($user);
            if($userFind != null) {
                $this->_data = $userFind;
                $this->_logged = true;
            }
            else
                print_r("Invalid user");
        }
    }
    public static function signup($uname,$psw) {
        $db= DB::getInstance();
        $db->get('user',array('username','=',$uname));
        if($db->count()==0) {
            $db->insert('user',array(
                'username'=>$uname,
                'password'=>$psw
            ));
            Session::put(Config::get('session/user'),$uname);
            return "Đăng ký thành công, chào mừng ".$uname;
        }
        else {
            return "Tên đăng nhập đã tồn tại";
        }
    }
    public static function find($username) {
        $db = DB::getInstance();
        $db->get('user',array('username','=',$username));
        if($db->everythingOk())
            return $db->first();
    }
    public function dat_ve($rap_id,$phong_stt,$suatchieu_thoidiem,$soluong,$ds_ghe) {
        $db=DB::getInstance();
        // find muave_stt
        $suat = new SuatChieu($rap_id,$phong_stt,$suatchieu_thoidiem);
        $db->query('select COUNT(*) as result from muave where username=?',array($this->_data->username));
        if($db->everythingOk()) {
            $id = $db->first()->result+1;
            // suat chieu
            $suat = new SuatChieu($rap_id,$phong_stt,$suatchieu_thoidiem);
            // calculate tong tien
            $tongtien=$suat->_phim->_data->phim_gia*$soluong;
            // insert into mua ve
            $db->insert('muave',array(
                'username'=>$this->_data->username,
                'muave_stt'=>$id,
                'rap_id'=>$rap_id,
                'phong_stt'=>$phong_stt,
                'suatchieu_thoidiem'=>$suatchieu_thoidiem,
                'muave_soluong'=>$soluong,
                'muave_tongtien'=>$tongtien,
                'muave_thoidiem'=>date("Y-m-d H:i:s")
            ));
            // loop through and insert into ve
            $array = str_split($ds_ghe);
            for($i=0;$i<count($array);$i=$i+2) {
                $row = $array[$i];
                $col = $array[$i+1];
                $db->insert('ve',array(
                    'ghe_hang'=>$row,
                    'ghe_stt'=>$col,
                    'rap_id'=>$rap_id,
                    'phong_stt'=>$phong_stt,
                    'suatchieu_thoidiem'=>$suatchieu_thoidiem,
                    'username'=>$this->_data->username,
                    'muave_stt'=>$id
                ));
            }
            print_r('Đặt vé thành công, cám ơn '.$this->_data->username.' !');
        }
    }
    public static function login($uname,$psw) {
        $db = DB::getInstance();
        $db->get('user',array('username','=',$uname));
        if($db->everythingOk()) {
            $result = $db->first();
            if(strcmp($result->username,$uname)===0 && strcmp($result->password,$psw)===0) {
                Session::put(Config::get('session/user'),$uname);
                return true;
            }
        }
        return false;
    }
    public static function logout() {
        Session::delete(Config::get('session/user'));
    }
}
?>
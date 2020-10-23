<?php
    namespace Classes;
    use Classes\Phim;
    class Router {
        public function index() {
            $ds_phim = Phim::getAll();
            include './view/home.php';
        }
        public function view($page) {
            include './view/'.$page.".php";
        }
        public function manage() {
            // if(strcmp($uname,Config::get('admin/username'))==0 && strcmp($psw,Config::get('admin/password')==0))
                include './view/admin.php';
            // else
            //     echo 'Failed admin authen';
            
            
        }
        public function manage_function($page) {
            include './functions/'.$page.".php";
        }
    }
?>
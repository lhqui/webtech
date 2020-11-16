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
            $ds_phim = Phim::getAll();
            include './view/admin.php';
        }
        public function phim($phim_id) {
            if($phim_id==null) 
                $phim = Phim::getAll();
            else
                $phim = new Phim($phim_id);
            include './view/phim.php';
        }
        public function functions($page) {
            include './functions/'.$page.".php";
        }
    }
?>
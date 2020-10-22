<?php 
class Image {
    static function SaveImage($name,$uploadDir)
    {
        if(isset($_FILES[$name]['name']) && getimagesize($_FILES[$name]['tmp_name'])!=false)
        {
            // $pic = file_get_contents($_FILES['pic']['tmp_name']);
            // $pic = addslashes($pic);
            $img = $_FILES[$name]['name'];
            $tmp_dir = $_FILES[$name]['tmp_name'];

            $upload_dir = $uploadDir;
            $imgExt = strtolower(pathinfo($img,PATHINFO_EXTENSION));
            $pic = rand(1000,1000000000).".".$imgExt;
            move_uploaded_file($tmp_dir,$upload_dir.$pic);

            return $pic;
        }
    }
    
}

?>
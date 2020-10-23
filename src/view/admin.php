<html>
    <head>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.min.js'></script>
    </head>
    <body>
        <div id='movie_manage'>
            <div id='movie_input'>
                <form id='movie_input_form' action='/functions/add_movie.php' method='post'>
                    <label for='ten_phim'>Tên phim</label>
                    <input type='text' name='ten_phim'></input>
                    <label for='mieu_ta'>Miêu tả</label>
                    <textarea form='movie_input_form' name='mieu_ta'></textarea>
                    <label for='anh_bia'>Ảnh bìa</label>
                    <input type='file' accept='image/*' name='anh_bia'></input>
                    <label for='thoi_luong'>Thời lượng</label>
                    <input type='number' name='thoi_luong'></input>
                    <label for='gia'>Giá phim</label>
                    <input type='number' name='gia'></input>
                    <label for='ngay_sx'>Ngày sản xuất</label>
                    <input type='date' name='ngay_sx'></input>
                    <label for='ngay_chieu'>Ngày chiếu</label>
                    <input type='date' name='ngay_chieu'></input>
                    
                    <button type='submit'>Thêm phim</button>
                </form>
                <script>
                    $(document).ready(function() {
                        $('#movie_input_form').on('submit',function(e){
                            e.preventDefault()
                            $(this).ajaxSubmit(function(data){
                                alert(data);
                            })
                        })
                    })
                </script>
            </div>
        </div>
    </body>

</html>


<?php 
    

?>
const dom = document.querySelector('manager')
const template = dom.children[0].content
class MovieManager extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div id='movie_input'>
                <form className='form-group' id='movie_input_form' action='/functions/add_movie.php' method='post'>
                    <label for='ten_phim'>Tên phim</label>
                    <input type='text' name='phim_ten'></input>
                    <label for='mieu_ta'>Miêu tả</label>
                    <textarea form='movie_input_form' name='phim_mieuta'></textarea>
                    <label for='anh_bia'>Ảnh bìa poster</label>
                    <input type='file' accept='image/*' name='phim_anhbia'></input>
                    <label for='anh_bia'>Ảnh bìa dọc</label>
                    <input type='file' accept='image/*' name='phim_anh'></input>
                    <label for='thoi_luong'>Thời lượng</label>
                    <input type='number' name='phim_thoiluong'></input>
                    <label for='gia'>Giá phim</label>
                    <input type='number' name='phim_gia'></input>
                    <label for='ngay_chieu'>Ngày chiếu</label>
                    <input type='date' name='phim_ngaychieu'></input>
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
        )
    }
}
class Manager extends React.Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return(
            <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Phim</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Rạp</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Dịch vụ</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <MovieManager></MovieManager>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        Rạp phim
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        Dịch vụ
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Manager></Manager>,dom)
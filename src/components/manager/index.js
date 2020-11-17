const dom = document.querySelector('manager')
const template = dom.children[0].content
class MovieAdder extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault()
        $(event.target).ajaxSubmit(function(data){
            alert(data)
        })
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit} className='form-group' id='movie_input_form' action='/functions/add_movie.php' method='post'>
                    <label >Tên phim</label>
                    <input type='text' name='phim_ten'></input>
                    <label >Miêu tả</label>
                    <textarea form='movie_input_form' name='phim_mieuta'></textarea>
                    <label>Ảnh bìa poster</label>
                    <input type='file' accept='image/*' name='phim_anhbia'></input>
                    <label >Ảnh bìa dọc</label>
                    <input type='file' accept='image/*' name='phim_anh'></input>
                    <label >Thời lượng</label>
                    <input type='number' name='phim_thoiluong'></input>
                    <label >Giá phim</label>
                    <input type='number' name='phim_gia'></input>
                    <label >Ngày chiếu</label>
                    <input type='date' name='phim_ngaychieu'></input>
                    <button type='submit'>Thêm phim</button>
            </form>
        )
    }
}
class MovieManager extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <MovieAdder></MovieAdder>
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
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Phim</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Rạp</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Dịch vụ</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <MovieManager></MovieManager>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        Rạp phim
                    </div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        Dịch vụ
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Manager></Manager>,dom)
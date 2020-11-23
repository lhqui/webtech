const dom = document.querySelector('manager')
const template = dom.children[0].content
class TheaterAdder extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit() {
        
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit} className='form-group container w-50' id='movie_input_form' action='/functions/add_movie.php' method='post'>
                    <h4>Thêm rạp</h4>
                    <label >Tên rạp</label>
                    <input type='text' name='rap_ten' className="form-control"></input>
                    <label >Địa chỉ rạp</label>
                    <textarea form='movie_input_form' name='rap_diachi' className="form-control"></textarea>
                    <button type='submit'>Thêm rạp</button>
            </form>
        )
    }
}
class TheaterManager extends React.Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return(
            <TheaterAdder></TheaterAdder>
        )
    }
}
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
            <form onSubmit={this.handleSubmit} className='form-group container w-50' id='movie_input_form' action='/functions/add_movie.php' method='post'>
                    <h4>Thêm phim</h4>
                    <label >Tên phim</label>
                    <input type='text' name='phim_ten' className="form-control"></input>
                    <label >Miêu tả</label>
                    <textarea form='movie_input_form' name='phim_mieuta' className="form-control"></textarea>
                    <label>Ảnh bìa poster</label>
                    <input type='file' accept='image/*' name='phim_anhbia' className="form-control-file"></input>
                    <label >Ảnh bìa dọc</label>
                    <input type='file' accept='image/*' name='phim_anh' className="form-control-file"></input>
                    <label >Thời lượng</label>
                    <input type='number' name='phim_thoiluong' className="form-control"></input>
                    <label >Giá phim</label>
                    <input type='number' name='phim_gia' className="form-control"></input>
                    <label >Ngày chiếu</label>
                    <input type='date' name='phim_ngaychieu' className="form-control"></input>
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
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Suất chiếu</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <MovieManager></MovieManager>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <TheaterManager></TheaterManager>
                    </div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <SuatChieuManager></SuatChieuManager>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Manager></Manager>,dom)
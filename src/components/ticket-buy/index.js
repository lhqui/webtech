
class DatePick extends React.Component {
    constructor(props) {
        super(props)
        
    }
    createButtons() {
        const date = new Date()
        const lookup = { 1:"Thứ hai", 2:"Thứ ba", 3:"Thứ tư", 4:"Thứ năm", 5:"Thứ sáu", 6:"Thứ bảy", 0:"Chủ nhật", }
        // const lookup1 = { 1:"Tháng một", 2:"Tháng 2", 3:"Thứ tư", 4:"Thứ năm", 5:"Thứ sáu", 6:"Thứ bảy", 7:"Chủ nhật", }
        var result = []
        result.push({
            thu:lookup[date.getDay()],
            ngay:date.getDate(),
            thang:date.getMonth()
        })
        var nextDay = new Date(date)
        for(var i=0;i<6;i++) {
            nextDay.setDate(nextDay.getDate() + 1)
            result.push({
                thu:lookup[nextDay.getDay()],
                ngay:nextDay.getDate(),
                thang:nextDay.getMonth()
            })
        }

        this.dateButtons = result.map((elem,i)=>{
            return(
                <div className={'m-0 p-0'} style={{flex:"1"}} key={i}>
                    <p className={'p-0 m-0'}>{elem.thu}</p>
                    <p className={'p-0 m-0'}>{elem.ngay}/{elem.thang}</p>
                </div>
            )
        })
    }
    render() {
        this.createButtons()
        return(
            <div>
                <h4>Chọn ngày</h4>
                <div className={'d-flex'}>
                    {this.dateButtons}
                </div>
            </div>
        )
    }
}
class SuatChieuPick extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>
                <h4>Chọn suất chiếu</h4>
            </div>
        )
    }
}

const dom = document.querySelector('ticket-buy')
const template = document.querySelector('template#phim').content
class TicketBuy extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            modal:{
                backgroundColor:'black',
                width:'100%',
                height:'80%',
                color:'white'
            }
        }
        this.state = {
            chon_ghe:false,
            date:null,
            suatchieu_id:null
        }
    }
    shouldComponentUpdate(nextProp,nextState) {
        if(nextProp.show != this.props.show)
            return true
    }

    render() {
        return(
            <div  className="modal fade" id="ticket-buy" tabIndex="-1" role="dialog" aria-labelledby="ticket-buy" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div  style={this.style.modal} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Đặt vé</h5>
                            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                            <span className={"text-white"} aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row p-0">
                                <div id="movie-show" className="col-3 p-0" >
                                    <img className="img-fluid" style={{width:'100%'}} src={template.querySelector('img#phim_anh').src}></img>
                                </div>
                                <div className='col-9 bg-danger'>
                                    <DatePick></DatePick>
                                    <hr></hr>
                                    <SuatChieuPick></SuatChieuPick>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {this.state.chon_ghe&&
                                <button className={"btn btn-primary-outline p-1"} style={{fontFamily:"monaco, Consolas, Lucida Console",borderBottom:"solid #34b4eb 2px", color:'#34b4eb', fontSize:"18px"}}>
                                    Chọn ghế
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<TicketBuy></TicketBuy>,dom)
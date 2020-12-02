
class DatePick extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chosen:null
        }
        this.style = {
            activeButton: {
                border:'1px solid #34b4eb',
                color:'#34b4eb',
                borderRadius:"25px",
                flex:"1",
                textAlign:'center',
                cursor:'pointer',
            },
            normal: {
                border:'none',
                color:'white',
                flex:"1",
                textAlign:'center',
                cursor:'pointer',
                transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
                transform: "scale(1)",
                opacity: "1",
            },
            blur: {
                border:'none',
                color:'white',
                flex:"1",
                textAlign:'center',
                cursor:'pointer',
                transform: "scale(0.9)",
                boxShadow: "0px 0px 20px 10px black",
                zIndex: "100",
                opacity: "0.5",
                transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"
            }
        }
    }
    mouseEnter(e) {
        Object.assign(e.currentTarget.style,this.style.activeButton)
    }
    mouseOut(e) {
        if(this.state.chosen==null)
            Object.assign(e.currentTarget.style,this.style.normal)
        if(this.state.chosen!=null&&e.currentTarget.getAttribute('data-key')!=this.state.chosen)
            Object.assign(e.currentTarget.style,this.style.blur)
    }
    onClick(e) {
        const ngay = e.currentTarget.getAttribute('ngay')
        const thang = e.currentTarget.getAttribute('thang')
        const nam = e.currentTarget.getAttribute('nam')
        // UI
        if(e.currentTarget.getAttribute('data-key')==this.state.chosen) {
            this.setState({chosen:null})
            return
        }
        // backend
        this.setState({chosen:e.currentTarget.getAttribute('data-key')})
        this.props.selectDate(nam+"-"+thang+"-"+ngay)
    }
    createButtons() {
        const date = new Date()
        const lookup = { 1:"Thứ hai", 2:"Thứ ba", 3:"Thứ tư", 4:"Thứ năm", 5:"Thứ sáu", 6:"Thứ bảy", 0:"Chủ nhật", }
        var result = []
        result.push({
            thu:lookup[date.getDay()],
            ngay:date.getDate(),
            thang:date.getMonth()+1,
            nam:date.getFullYear()
        })
        var nextDay = new Date(date)
        for(var i=0;i<6;i++) {
            nextDay.setDate(nextDay.getDate() + 1)
            result.push({
                thu:lookup[nextDay.getDay()],
                ngay:nextDay.getDate(),
                thang:nextDay.getMonth()+1,
                nam:nextDay.getFullYear()
            })
        }
        this.dateButtons = result.map((elem,i)=>{
            return(
                <div data-key={i} ngay={elem.ngay} thang={elem.thang} nam={elem.nam} onClick={e=>this.onClick(e)} className={'m-0 p-0'} style={this.state.chosen!=null?this.state.chosen==i?this.style.activeButton:this.style.blur:this.style.normal} key={i} onMouseLeave={e=>{this.mouseOut(e)}} onMouseEnter={(e)=>{this.mouseEnter(e)}}>
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
                <div className={'d-flex mt-3'}>
                    {this.dateButtons}
                </div>
            </div>
        )
    }
}
class SuatChieuPick extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suatchieu:null
        }
    }
    createSuatChieu(data) {
        if(data.length==0) {
            this.setState({
                suatchieu:
                <div>
                    Không có suất chiếu
                </div>
            })

            return
        }
        this.setState({
            suatchieu:data.map((e,i)=>{
            return(
                <div key={i}>
                    {e._data.rap_id}
                </div>
            )})
        })
        // if(data.length==0) {
        //     this.suatchieu = <div>
        //         Không có suất chiếu
        //     </div>
        //     return
        // }
        // this.suatchieu = data.map((e,i)=>{
        //     return(
        //         <div key={i}>
        //             {e._data.rap_id}
        //         </div>
        //     )
        // })
    }
    getSuatChieu() {
        $.ajax({
            url:'/functions/get_suatchieu.php?movie='+this.props.movie+'&date='+this.props.date+''
        }).done((data) => {
            this.createSuatChieu(JSON.parse(data))
        })
    }
    componentDidUpdate() {
        this.getSuatChieu()
    }
    render() {
        return(
            <div>
                <h4>Chọn suất chiếu</h4>
                <div>
                    {this.state.suatchieu}
                </div>
            </div>
        )
    }
}

const dom = document.querySelector('ticket-buy')
const template = document.querySelector('template#phim').content
const phim = template.querySelector('div')
class TicketBuy extends React.Component {
    constructor(props) {
        super(props)
        this.selectDate = this.selectDate.bind(this)
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
            suatchieu:null
        }
    }
    selectDate(date) {
        this.setState({date:date})
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
                                    <img className="img-fluid" style={{width:'100%'}} src={phim.querySelector('img#phim_anh').src}></img>
                                </div>
                                <div className='col-9'>
                                    <DatePick selectDate={this.selectDate}></DatePick>
                                    <hr></hr>
                                    <SuatChieuPick date={this.state.date} movie={phim.id}></SuatChieuPick>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {this.state.ngay&&this.state.suatchieu&&
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
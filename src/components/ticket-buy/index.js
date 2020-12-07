
class Chair extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            normal: {
                height: '20px',
                width: '25px',
                backgroundColor: 'white',
                borderRadius: '30% 30% 0 0 ',
                display: 'inline-block',
                textAlign:'center',
                cursor:'pointer',
                margin:'5px',
                color:'black'
            },
            active: {
                backgroundColor:'red'
            }
            
        }
        this.state = {
            hover:false,
            select:false
        }
    }
    mouseIn(e) {
        this.setState({hover:true})
    }
    mouseOut(e) {
        this.setState({hover:false})
    }
    onClick(e) {
       this.setState({select:!this.state.select})
        if(!this.state.select) {
            Object.assign(e.target.style,this.style.active)
        }
        else {
            Object.assign(e.target.style,this.style.normal)
        }

        this.props.selectGhe(this.props.row,this.props.col)
    }
    render() {
        return(
            <div style={this.style.normal} onClick={e=>this.onClick(e)} onMouseOut={e=>this.mouseOut(e)} onMouseEnter={e=>this.mouseIn(e)}>
                {this.state.hover ? this.props.row+this.props.col : null}
            </div>
        )
    }
}
class ChairPick extends React.Component {
    constructor(props) {
        super(props)
        this.seat = {
            row:['A','B','C','D','E'],
            col:[1,2,3,4,5,6,7,8,9,10]
        }
    }
    createChairMap() {
        this.chairMap = this.seat.row.map((i,e)=>{
            return(
                <div key={i} className={'d-flex'}>
                {this.seat.col.map((i2,e2)=>{
                    if(e2==0)
                        return(
                            <div key={i+i2} className=''>
                                <p style={{color:'white',display:'inline',position:'absolute',left:'10px'}}>{i}</p>
                                <Chair selectGhe={this.props.selectGhe} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id} row={i} col={i2} key={i+i2} ></Chair>
                            </div>
                        )
                    else
                        return(
                            <div key={i+i2}>
                                <Chair selectGhe={this.props.selectGhe} row={i} col={i2}  key={i+i2} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id}></Chair>
                            </div>
                        )
                })}
                </div>
            )
        })
    }
    render() {
        this.createChairMap()
        return(
            <div className={'container-fluid h-50 w-100'} >
                <div className='mr-auto'>
                    <div style={{textAlign:'center',backgroundColor:'grey',borderRadius:'20px',fontFamily:"monaco, Consolas, Lucida Console",color:'white',width:'47%'}}>
                        Màn hình
                    </div>
                    <div  className='w-50'>
                        {this.chairMap}
                    </div>
                    <div className='d-flex justify-content-around w-50 pr-3'>
                        {this.seat.col.map((i,e)=>{
                            return(
                            <p style={{display:'inline',textAlign:'center',width:'20px'}}>{i}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
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
        const thu = e.currentTarget.getAttribute('thu')
        const ngay = e.currentTarget.getAttribute('ngay')
        const thang = e.currentTarget.getAttribute('thang')
        const nam = e.currentTarget.getAttribute('nam')
        // UI
        if(e.currentTarget.getAttribute('data-key')==this.state.chosen) {
            this.setState({chosen:null})
            this.props.selectDate(null)
            return
        }
        // backend
        this.setState({chosen:e.currentTarget.getAttribute('data-key')})
        this.props.selectDate({
            thu:thu,
            ngay:ngay,
            thang:thang,
            nam:nam
        })
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
                <div data-key={i} thu={elem.thu} ngay={elem.ngay} thang={elem.thang} nam={elem.nam} onClick={e=>this.onClick(e)} className={'m-0 p-0'} style={this.state.chosen!=null?this.state.chosen==i?this.style.activeButton:this.style.blur:this.style.normal} key={i} onMouseLeave={e=>{this.mouseOut(e)}} onMouseEnter={(e)=>{this.mouseEnter(e)}}>
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
            chosen:null
        }
        this.style = {
            normal:{
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
            },
            activeButton: {
                border:'1px solid #34b4eb',
                color:'#34b4eb',
                borderRadius:"25px",
                flex:"1",
                textAlign:'center',
                cursor:'pointer',
            },
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
    handleClick(e) {
        if(e.currentTarget.getAttribute('data-key')==this.state.chosen) {
            this.setState({chosen:null})
            this.props.selectSuat(null)
            return
        }
        // backend
        this.setState({chosen:e.currentTarget.getAttribute('data-key')})
        this.props.selectSuat(e.currentTarget.getAttribute('rap_id'),e.currentTarget.getAttribute('phong'),e.currentTarget.getAttribute('thoidiem'),e.currentTarget.getAttribute('rap_ten'))
    }
    createSuatChieu(data) {
        this.suatchieu = data.map((e1,i)=>{
            if(e1.suat.length==0) {
                return null
            }
            return(
                <div key={i}>
                    <p style={{fontSize:'15px',marginLeft:'5%'}}>{e1.rap._data.rap_ten}</p>
                    <div className='d-flex'>
                        {e1.suat.map((e,i)=>{
                            return(
                                <div data-key={e._data.rap_id+i}  rap_ten={e1.rap._data.rap_ten} rap_id={e._data.rap_id} phong={e._data.phong_stt} thoidiem={e._data.suatchieu_thoidiem} onClick={e=>this.handleClick(e)} className="m-0 p-0 mb-3" style={this.state.chosen!=null?this.state.chosen==e._data.rap_id+i?this.style.activeButton:this.style.blur:this.style.normal} key={i} onMouseLeave={e=>{this.mouseOut(e)}} onMouseEnter={(e)=>{this.mouseEnter(e)}}>
                                        <p className="p-0 m-0" style={{fontFamily:"monaco, Consolas, Lucida Console",padding:'none'}}>{e._data.suatchieu_thoidiem.slice(11,16)}</p>
                                        <div className="p-0 m-0">
                                            <div style={{display:'inline'}}>
                                                <svg width="1.05em" height="1.05em" viewBox="0 0 16 16" className="bi bi-door-open" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
                                                    <path fillRule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
                                                    <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
                                                </svg>
                                                <p style={{display:'inline',margin:'none',padding:'none',fontSize:'12px'}}>{e._data.phong_stt}</p>
                                            </div>
                                            <div style={{display:'inline',marginLeft:'5px'}}>
                                                <svg width="1.05em" height="1.05em" viewBox="0 0 16 16" className="bi bi-credit-card-2-front" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                                                    <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                                                    <path fillRule="evenodd" d="M2 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                                </svg>
                                                <p style={{display:'inline',margin:'none',padding:'none',fontSize:'12px',marginLeft:'3px'}}>5</p>
                                            </div>
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
        this.forceUpdate()
    }
    getSuatChieu() {
        $.ajax({
            url:'/functions/get_suatchieu.php?movie='+this.props.movie+'&date='+this.props.date+''
        }).done((data) => {
            this.createSuatChieu(JSON.parse(data))
        })
    }
    componentDidUpdate(prevProp) {
        if(this.props.date!=prevProp.date)
            this.getSuatChieu()
    }
    render() {
        return(
            <div className='m-0 p-0'>
                <h4>Chọn suất chiếu</h4>
                <div>
                    {this.suatchieu}
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
        this.selectSuat = this.selectSuat.bind(this)
        this.selectGhe = this.selectGhe.bind(this)
        this.selectGhe = this.selectGhe.bind(this)
        this.chonGheSwitch = this.chonGheSwitch.bind(this)
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
            suatchieu:null,
            rap_id:null,
            phong_stt:null,
            suatchieu_thoidiem:null,
            ds_ghe:[],
            thoidiem:null
        }
    }
    selectDate(date) {
        if(date!=null) {
            this.setState({thoidiem:date})
            this.setState({date:date.nam+"-"+date.thang+"-"+date.ngay})
        }
        else {
            this.setState({date:null})
        }
    }
    selectSuat(rap_id,phong_stt,suatchieu_thoidiem,rap_ten) {
        if(arguments.length == 1) {
            this.setState({
                suatchieu:null
            })
            return
        }
        this.setState({
            suatchieu:{
                rap:rap_id,
                phong:phong_stt,
                thoidiem:suatchieu_thoidiem,
                rap_ten:rap_ten
            }
        })
    }
    selectGhe(row,col) {
        const newState = this.state.ds_ghe
        const object=newState.find((ghe,i)=>{
            if(ghe.row==row && ghe.col==col) {
                newState.splice(i,1)
                return true
            }
        })
        if(object==undefined) {
            newState.push({
                row:row,
                col:col
            })
        }
        console.log(newState)
        this.setState({
            ds_ghe:newState
        })
    }
    datVe() {
        
    }
    chonGheSwitch() {
        this.setState({
            chon_ghe:true
        })
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
                        <div className={"modal-body"}>
                            <div className="row p-0" style={{display:this.state.chon_ghe?'none':''}}>
                                <div id="movie-show" className="col-3 p-0" >
                                    <img className="img-fluid" style={{width:'100%'}} src={phim.querySelector('img#phim_anh').src}></img>
                                </div>
                                <div className='col-9'>
                                    <DatePick selectDate={this.selectDate}></DatePick>
                                    <hr></hr>
                                    <SuatChieuPick selectSuat={this.selectSuat} date={this.state.date} movie={phim.id}></SuatChieuPick>
                                </div>
                            </div>
                            <div className={'p-0'} style={{display:!this.state.chon_ghe?'none':''}}>
                                <ChairPick  suatchieu_thoidiem={this.state.suatchieu_thoidiem} rap_id={this.state.rap_id} phong_stt={this.state.phong_stt} phim_id={phim.getAttribute('id')} selectGhe={this.selectGhe}></ChairPick>
                                {this.state.thoidiem&&this.state.suatchieu&&<div style={{position:'absolute',left:'50%',bottom:'1%',paddingTop:'15px',paddingRight:'10px'}} className=" w-50 h-100">
                                    <h5>
                                        Thông tin vé
                                    </h5>
                                    <div>
                                        <p>Phim: {phim.querySelector('h4#phim_ten').innerHTML}</p>
                                        <p>Rạp: {this.state.suatchieu.rap_ten}</p>
                                        <p>Phòng: {this.state.suatchieu.phong}</p>
                                        <p>Ngày chiếu: {this.state.thoidiem.thu}, {this.state.thoidiem.ngay+"-"+this.state.thoidiem.thang+"-"+this.state.thoidiem.nam}</p>
                                        <p>Giá vé: {phim.querySelector('#phim_gia').innerHTML}</p>
                                        {this.state.ds_ghe.length!=0&&
                                            <div>
                                                <p>Danh sách ghế: {this.state.ds_ghe.map((e,i)=>{
                                                    return(
                                                        e.row+e.col+" "
                                                    )
                                                })}</p>
                                                <p>Tổng cộng: {this.state.ds_ghe.length} x {phim.querySelector('#phim_gia').innerHTML} đ = {this.state.ds_ghe.length * phim.querySelector('#phim_gia').innerHTML}</p>
                                            </div>}
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            {this.state.chon_ghe&&
                                <div className='container-fluid d-flex justify-content-between'>
                                    <button style={{color:'white',fontFamily:"monaco, Consolas, Lucida Console", fontSize:"18px",transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"}} className={"btn btn-primary-outline p-1 mr-auto"} onMouseEnter={e=>{Object.assign(e.target.style,{borderBottom:"solid 1px #34b4eb",color:'#34b4eb'})}} onMouseLeave={e=>{Object.assign(e.target.style,{border:'none',color:'white'})}} onClick={e=>{this.setState({chon_ghe:false})}} >Quay lại</button>
                                    {this.state.ds_ghe.length!=0  &&
                                        <button style={{color:'white',fontFamily:"monaco, Consolas, Lucida Console", fontSize:"18px",transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"}} className={"btn btn-primary-outline p-1"} onMouseEnter={e=>{Object.assign(e.target.style,{borderBottom:"solid 1px #34b4eb",color:'#34b4eb'})}} onMouseLeave={e=>{Object.assign(e.target.style,{border:'none',color:'white'})}}>Đặt vé</button>
                                    }
                                </div>
                            }
                            {!this.state.chon_ghe && this.state.date!=null && this.state.suatchieu!=null &&
                                <div onMouseEnter={e=>{Object.assign(e.target.style,{borderBottom:"solid 1px #34b4eb",color:'#34b4eb'})}} onMouseLeave={e=>{Object.assign(e.target.style,{border:'none',color:'white'})}}>
                                    <button className={"btn btn-primary-outline p-1"} onClick={this.chonGheSwitch} style={{color:'white',fontFamily:"monaco, Consolas, Lucida Console", fontSize:"18px",transition:" visibility 0s, opacity 0.5s linear"}}>
                                        Chọn ghế
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<TicketBuy></TicketBuy>,dom)

class Chair extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            normal: {
                fontFamily:"monaco, Consolas, Lucida Console",
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
                fontFamily:"monaco, Consolas, Lucida Console",
                height: '20px',
                width: '25px',
                borderRadius: '30% 30% 0 0 ',
                display: 'inline-block',
                textAlign:'center',
                cursor:'pointer',
                margin:'5px',
                color:'black',
                backgroundColor:'yellow'
            },
            taken: {
                fontFamily:"monaco, Consolas, Lucida Console",
                height: '20px',
                width: '25px',
                borderRadius: '30% 30% 0 0 ',
                display: 'inline-block',
                textAlign:'center',
                cursor:'not-allowed',
                margin:'5px',
                color:'black',
                backgroundColor:'#424242'
            },
            mine: {
                fontFamily:"monaco, Consolas, Lucida Console",
                height: '20px',
                width: '25px',
                borderRadius: '30% 30% 0 0 ',
                display: 'inline-block',
                textAlign:'center',
                cursor:'help',
                margin:'5px',
                color:'black',
                backgroundColor:'green'
            }
            
        }
        this.state = {
            hover:false,
            select:false,
            status:null
        }
    }
    mouseIn(e) {
        if(this.props.status==1) {
            return
        }
        this.setState({hover:true})
    }
    mouseOut(e) {
        this.setState({hover:false})
    }
    onClick(e) {
        if(this.props.status!=0) {
            return
        }
        this.setState({select:!this.state.select})
        this.props.selectGhe(this.props.row,this.props.col)
    }
    componentDidUpdate(oldprop) {
        if(this.props.status!=oldprop.status) {
            this.setState({
                select:false
            })
        }
    }
    render() {
        return(
            <div style={this.props.status==0?this.state.select?this.style.active:this.style.normal:this.props.status==1?this.style.taken:this.style.mine} onClick={e=>this.onClick(e)} onMouseLeave={e=>this.mouseOut(e)} onMouseEnter={e=>this.mouseIn(e)}>
                {this.state.hover||this.state.select ? this.props.row+this.props.col : null}
                {this.props.status!=0 && this.props.status!=1 &&
                    <span style={{visibility: this.state.hover?"visible":"hidden",color:'black', width: '120px', backgroundColor: 'white', textAlign: 'center', padding: '5px 0', borderRadius: '6px', position: 'absolute', zIndex: '1'}}>
                        {this.props.status!=1&&this.props.row+this.props.col+"-Bạn đã đặt vào "+this.props.status}
                    </span>}
            </div>
        )
    }
}
class ChairPick extends React.Component {
    constructor(props) {
        super(props)
        this.checkGhe = this.checkGhe.bind(this)
        this.seat = {
            row:['A','B','C','D','E'],
            col:[1,2,3,4,5,6,7,8,9,10]
        }
        this.state = {
            data:null
        }
    }
    createChairMap(data) {
        var result = []
        for(var i = 0;i<5;i++) {
            result[i]=[]
            for(var j=i*10;j<(i*10)+10;j++) {
                result[i].push(data[j])
            }
        }
        this.chairMap = result.map((i,e)=>{
            return(
                <div key={e} className='d-flex'>
                    {
                        i.map((i2,e2)=>{
                            if(e2==0)
                                return(
                                    <div key={e+e2} className=''>
                                        <p style={{color:'white',display:'inline',position:'absolute',left:'10px'}}>{e}</p>
                                        <Chair status={i2.status} selectGhe={this.props.selectGhe} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id} row={i2.row} col={i2.col} key={this.props.suatchieu_thoidiem+this.props.rap_id+e+e2+i2.status} ></Chair>
                                    </div>
                                )
                            else
                                return(
                                    <div key={e+e2}>
                                        <Chair status={i2.status} selectGhe={this.props.selectGhe} row={i2.row} col={i2.col}  key={i2.status+this.props.suatchieu_thoidiem+this.props.rap_id+e+e2} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id}></Chair>
                                    </div>
                                )
                            })
                    }
                </div>
            )
        })
    }
    componentDidMount() {
        this.interval = setInterval(this.checkGhe,5000)
    }
    checkGhe() {
        if(this.props.phong_stt==null || this.props.suatchieu_thoidiem==null) {
            return
        }
        const rap_id = this.props.rap_id
        const phong_stt = this.props.phong_stt
        const suatchieu_thoidiem = this.props.suatchieu_thoidiem
        $.ajax({
            url:'/functions/check_ghe.php',
            data:{
                rap_id:rap_id,
                phong_stt:phong_stt,
                suatchieu_thoidiem:suatchieu_thoidiem,
            },
            method:'post'
        }).done(data1=>{
            const data= JSON.parse(data1)
            var result = []
        for(var i = 0;i<5;i++) {
            result[i]=[]
            for(var j=i*10;j<(i*10)+10;j++) {
                result[i].push(data[j])
            }
        }
        this.setState({data:result})
            // this.createChairMap(JSON.parse(data))          
        })
    }
    componentDidUpdate(oldprop) {
        if(oldprop!=this.props) {
            this.checkGhe()
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    
    render() {
        return(
            <div className={'container-fluid h-50 w-100'} >
                <div className='mr-auto'>
                    <div style={{textAlign:'center',backgroundColor:'grey',borderRadius:'20px',fontFamily:"monaco, Consolas, Lucida Console",color:'white',width:'47%'}}>
                        Màn hình
                    </div>
                    <div  className='w-50'>
                        {this.state.data!=null&&this.state.data.map((i,e)=>{
            return(
                <div key={e} className='d-flex'>
                    {
                        i.map((i2,e2)=>{
                            if(e2==0)
                                return(
                                    <div key={e+e2} className=''>
                                        <p style={{color:'white',display:'inline',position:'absolute',left:'10px'}}>{e}</p>
                                        <Chair status={i2.status} selectGhe={this.props.selectGhe} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id} row={i2.row} col={i2.col} key={this.props.suatchieu_thoidiem+this.props.rap_id+e+e2+i2.status} ></Chair>
                                    </div>
                                )
                            else
                                return(
                                    <div key={e+e2}>
                                        <Chair status={i2.status} selectGhe={this.props.selectGhe} row={i2.row} col={i2.col}  key={i2.status+this.props.suatchieu_thoidiem+this.props.rap_id+e+e2} rap_id={this.props.rap_id} phong_stt={this.props.phong_stt} suatchieu_thoidiem={this.props.suatchieu_thoidiem} phim_id={this.props.phim_id}></Chair>
                                    </div>
                                )
                            })
                    }
                </div>
            )
        })}
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
            chosen:null,
            data:null
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
        this.props.selectSuat(e.currentTarget.getAttribute('rap_id'),e.currentTarget.getAttribute('phong'),e.currentTarget.getAttribute('thoidiem'),e.currentTarget.getAttribute('rap_ten'),e.currentTarget.getAttribute('gio_chieu'))
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
                                <div data-key={e._data.rap_id+i} gio_chieu={e._data.suatchieu_thoidiem.slice(11,16)}  rap_ten={e1.rap._data.rap_ten} rap_id={e._data.rap_id} phong={e._data.phong_stt} thoidiem={e._data.suatchieu_thoidiem} onClick={e=>this.handleClick(e)} className="m-0 p-0 mb-3" style={this.state.chosen!=null?this.state.chosen==(e._data.rap_id+i)?this.style.activeButton:this.style.blur:this.style.normal} key={i} onMouseLeave={e=>{this.mouseOut(e)}} onMouseEnter={(e)=>{this.mouseEnter(e)}}>
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
                                                <p style={{display:'inline',margin:'none',padding:'none',fontSize:'12px',marginLeft:'3px'}}>{e._veRemain}</p>
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
            this.setState({
                data:JSON.parse(data)
            })
        })
    }
    componentDidUpdate(prevProp,prevState) {
        if(this.props.date!=prevProp.date)
            this.getSuatChieu()
        if(this.state.chosen!=prevState.chosen)
            this.createSuatChieu(this.state.data)
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
        this.datVe=this.datVe.bind(this)
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
        this.chairMap = React.createRef()
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
    selectSuat(rap_id,phong_stt,suatchieu_thoidiem,rap_ten,gio) {
        if(arguments.length == 1) {
            this.setState({
                suatchieu:null
            })
            return
        }
        this.setState({
            rap_id:rap_id,
            phong_stt:phong_stt
        })
        this.setState({
            ds_ghe:[]
        })
        this.setState({
            suatchieu:{
                rap:rap_id,
                phong:phong_stt,
                thoidiem:suatchieu_thoidiem,
                rap_ten:rap_ten,
                gio:gio
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
        this.setState({
            ds_ghe:newState
        })
    }
    datVe() {
        const rap_id=this.state.suatchieu.rap
        const phong_stt=this.state.suatchieu.phong
        const suatchieu_thoidiem = this.state.suatchieu.thoidiem
        const muave_soluong = this.state.ds_ghe.length
        var gheString = ''
        this.state.ds_ghe.forEach(e=>{
            gheString += e.row+e.col
        })
        $.ajax({
            url:'/functions/dat_ve.php',
            method:'post',
            data: {
                rap_id:rap_id,
                phong_stt:phong_stt,
                suatchieu_thoidiem:suatchieu_thoidiem,
                muave_soluong:muave_soluong,
                muave_tongtien:phim.querySelector('#phim_gia').innerHTML*muave_soluong,
                gheString:gheString
            }
        }).done(data=>{
            alert(data)
            this.setState({
                ds_ghe:[]
            })
        })
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
                                <ChairPick  ref={this.chairMap} suatchieu_thoidiem={this.state.suatchieu!=null&&this.state.suatchieu.thoidiem} rap_id={this.state.rap_id} phong_stt={this.state.phong_stt} phim_id={phim.getAttribute('id')} selectGhe={this.selectGhe}></ChairPick>
                                <div style={{fontFamily:"monaco, Consolas, Lucida Console"}}>
                                    <div className='row w-50 pl-5'>
                                        <div style={{height:'20px',width:'25px',backgroundColor:'green',borderRadius:'30% 30% 0 0'}}></div>
                                        <p className="col-6" style={{display:'inline'}}>Ghế của bạn</p>
                                    </div>
                                    <div className='row w-50 pl-5'>
                                        <div style={{height:'20px',width:'25px',backgroundColor:'#424242',borderRadius:'30% 30% 0 0'}}></div>
                                        <p className="col-6" style={{display:'inline'}}>Ghế đã đặt</p>
                                    </div>
                                    <div className='row w-50 pl-5'>
                                        <div style={{height:'20px',width:'25px',backgroundColor:'white',borderRadius:'30% 30% 0 0'}}></div>
                                        <p className="col-6" style={{display:'inline'}}>Ghế trống</p>
                                    </div>
                                    <div className='row w-50 pl-5'>
                                        <div style={{height:'20px',width:'25px',backgroundColor:'yellow',borderRadius:'30% 30% 0 0'}}></div>
                                        <p className="col-6" style={{display:'inline'}}>Ghế đang chọn</p>
                                    </div>

                                </div>
                                {this.state.thoidiem&&this.state.suatchieu&&<div style={{fontFamily:"monaco, Consolas, Lucida Console",position:'absolute',left:'50%',bottom:'1%',paddingTop:'15px',paddingRight:'10px'}} className=" w-50 h-100"  >
                                    <h5 style={{textAlign:'center',color:'#34b4eb',fontWeight:'bold'}}>
                                        Thông tin vé
                                    </h5>
                                    <div>
                                        <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Phim:</span> {phim.querySelector('h4#phim_ten').innerHTML}</p>
                                        <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Rạp:</span> {this.state.suatchieu.rap_ten}</p>
                                        <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Phòng:</span> {this.state.suatchieu.phong}</p>
    <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Ngày chiếu: </span> {this.state.thoidiem.thu}, {this.state.thoidiem.ngay+"-"+this.state.thoidiem.thang+"-"+this.state.thoidiem.nam}</p>
    <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Giờ chiếu:  </span>{this.state.suatchieu.gio}</p>
                                        <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Giá vé:</span> {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(phim.querySelector('#phim_gia').innerHTML)}</p>
                                        {this.state.ds_ghe.length!=0&&
                                            <div>
                                                <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Danh sách ghế: </span>{this.state.ds_ghe.map((e,i)=>{
                                                    return(
                                                        e.row+e.col+" "
                                                    )
                                                })}</p>
                                                <p><span style={{color:'#34b4eb',fontWeight:'bold'}}>Tổng cộng:</span> {this.state.ds_ghe.length} x {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(phim.querySelector('#phim_gia').innerHTML)} = <span style={{color:'#34b4eb'}}> {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(this.state.ds_ghe.length * phim.querySelector('#phim_gia').innerHTML)}</span></p>
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
                                        <button style={{color:'white',fontFamily:"monaco, Consolas, Lucida Console", fontSize:"18px",transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"}} className={"btn btn-primary-outline p-1"} onMouseEnter={e=>{Object.assign(e.target.style,{borderBottom:"solid 1px #34b4eb",color:'#34b4eb'})}} onMouseLeave={e=>{Object.assign(e.target.style,{border:'none',color:'white'})}} onClick={this.datVe}>Đặt vé</button>
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
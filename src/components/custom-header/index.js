const dom = document.querySelector('custom-header')
const user = document.querySelector('template#user').content.children[0]
class UserDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            font: {
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:'20px',
            },
            class:"my-auto btn btn-primary-outline p-1",
            dropdown: {
                position:'absolute',
                display:'block',
                right:"17px",
                width:"190px",
                padding:'5px',
                textAlign:"right"
            },
            hidden: {
                display:"none"
            },
            buttonStyle: {
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
            }
            
        }
        this.state = {
            dropdown:false
        }
    }
    logout() {
        var r = confirm("Bạn muốn đăng xuất ?")
        if(r==true) {
            $.ajax({
                url: "/functions/logout.php",
              }).done(function() {
                location.reload()
              });
        }
    }
    render() {
        return(
            <div style={{position:'relative'}} onMouseLeave={()=>this.setState({dropdown:false})}  onMouseEnter={()=>this.setState({dropdown:true})} >
                <svg style={{padding:'none',marginTop:'4px',marginRight:"10px"}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                <button onMouseEnter={()=>this.setState({dropdown:true})} className={this.style.class} style={this.style.font} >{this.props.user.getAttribute('username')}   <span className="caret"></span></button>
                <ul style={this.state.dropdown?this.style.dropdown:this.style.hidden} >
                    <li ><button onMouseEnter={(e)=>{Object.assign(e.target.style,{color:'#34b4eb'})}} onMouseOut={(e)=>{Object.assign(e.target.style,{color:'white'})}} style={this.style.buttonStyle} className="btn btn-primary-outline">Quản lý tài khoản</button></li>
                    <li ><button onClick={this.logout} onMouseEnter={(e)=>{Object.assign(e.target.style,{color:'#34b4eb'})}} onMouseOut={(e)=>{Object.assign(e.target.style,{color:'white'})}} style={this.style.buttonStyle} className="btn btn-primary-outline">Đăng xuất</button></li>
                </ul>
            </div>
        )
    }
}
const titleStyle = {fontSize:"30", color:"white", fontWeight:"bold"}
// const textStyle = {fontSize:"18", color:"white"}
class MovieVgc extends React.Component {
    constructor(props) {
        super(props)
        this.style= {
            btnM : {fontFamily:"monaco, Consolas, Lucida Console",
            fontSize:"25", 
            fontWeight:"bold", 
            color:"white",
            marginTop:"40",
            marginRight:"40px"
            },
            btnMA : {fontFamily:"monaco, Consolas, Lucida Console",
            fontSize:"25", 
            fontWeight:"bold", 
            color:"#34b4eb",
            marginTop:"40",
            marginRight:"40px"
            },
            btnMuave: {
                width:"200px",
                fontFamily:"monaco, Consolas, Lucida Console",
                fontSize:"25", 
                fontWeight:"bold", 
                color:"white",
                marginTop:"40"
            }
            
        }
    }
    handleMouseIn(e) {
        Object.assign(e.target.style, this.style.btnMA)
    }
    handleMouseOut(e) {
        Object.assign(e.target.style, this.style.btnM)
    }
    render () {
        return (
            <div style={{height:"150px", background: "-webkit-linear-gradient(left, rgb(12,0,50), rgb(0,0,0) , rgba(0,0,0,1.2)) "}} className="row ">
                <div style={{backgroundColor:""}} className="col-md-3 text-center">
                    <button style={this.style.btnMuave} className="btn btn-danger rounded-pill" > Đặt Vé </button>
                </div>
                <div style={{backgroundColor:""}} className="col-md-9">
                    <button style={this.style.btnM} onMouseEnter={(e)=> {this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}} className="btn btn-outline" > Đang chiếu </button>
                    <button style={this.style.btnM} onMouseEnter={(e)=> {this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}} className="btn btn-outline" > Sắp chiếu</button>
                </div>
              
            </div>
        )
    }
}
class TheatreVgc extends React.Component {
    constructor(props) {
        super(props) 
        this.style = {
            textStyle : {fontSize:"18", color:"white",display:"inline", paddingRight:"5px", marginTop:"10px"},
            textStyleA : {fontSize:"18", color:"#34b4eb", paddingRight:"20px", cursor:"pointer", display:"inline"},
            imgStyle: {width:"300", height:"200"}
        }
    }
    handleMouseIn(e) {
        Object.assign(e.target.style, this.style.textStyleA)
    }
    handleMouseOut(e) {
        Object.assign(e.target.style, this.style.textStyle)
    }
    render() {
        return (
            <div style={{height:"450px", background: "-webkit-linear-gradient(left, rgb(49,0,74), rgb(49,0,74) 0%, rgba(0,0,0,1.2)) "}} className="row ">
                <div style={{backgroundColor:"", paddingTop:"10px"}} className="col-md-3 text-center ">
                        <img style={this.style.imgStyle} src="https://i.ibb.co/dkK2Zh3/happy.jpg" ></img>
                        <div style={{paddingLeft:"40px"}} className="text-left">
                            <p style={titleStyle} >Xem Thông Tin Của Rạp</p>
                             <p style={this.style.textStyle}>Hãy chọn rạp gần với vị trí bạn nhất</p>
                        </div>
                        
                        <br></br>
                        <div  style={{paddingTop:"10px", paddingLeft:"40px"}}>
                            <button style={{color:"white", fontSize:"25", fontWeight:"bold"}} className="btn btn-danger rounded-pill text-center">Chọn Vị Trí Của Bạn</button>
                        </div>
                </div>
                <div style={{backgroundColor:""}} className="col-md-9">
                        <p style={titleStyle}>Rạp VGC</p>
                        <div>
                            <p style={this.style.textStyle} onMouseEnter={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>Chọn Rạp </p>
                            <i style={this.style.textStyle} onMouseEnter={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}} className="fas fa-chevron-right"></i>
                        </div>
                        
                        
                </div>
            </div>
        )
    }
}
const textStyleService = {fontSize:"18", color:"white",display:"inline", paddingRight:"5px", marginTop:"10px"}
class TheatreServices extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            imgStyle: {width:"300", height:"200"}
        }
    }
    render() {
        return (
            <div  style={{height:"450px", background: "-webkit-linear-gradient(left, rgb(69,162,158), rgb(69,162,158), rgba(0,0,0,1.2)) "}} className="row ">
                 <div style={{backgroundColor:"",paddingTop:"10px"}} className="col-md-3 text-center">
                        <img style={this.style.imgStyle} src="https://i.ibb.co/qpwYTfS/pop.jpg"></img>
                        <div style={{paddingLeft:"40px"}} className="text-left">
                            <p style={titleStyle}>Tận Hưởng Bộ Phim Cùng Thực Đơn Nhanh</p>
                            <p style={textStyleService}>Xem qua những món ăn và thức uống có sẵn tại các rạp</p>
                        </div>
                       
                </div>
                    <div style={{paddingTop:"10px"}} className="col-md-3 text-left">
                             <button style={{color:"white", fontSize:"25", fontWeight:"bold"}} className="btn btn-danger rounded-pill">Xem Thực Đơn</button>
                    </div>
            </div>
       
            )
    }
}
class SearchPopup extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            boxContain :{ height:'', width:'', backgroundColor:"red", position:'',display:'', marginTop:'' },
            box: {height:'auto', width:'70%', position:'relative', background:'blue', overfloow:'auto'},
            boxResult :{height:'300px', backgroundColor:"blue",  marginTop:''}

        }
        
    }

    render () {
        return (
            <div className='card' style={{border:'none'}}>
                <div className='card-body' style={this.style.boxContain}>
                    <form className='form-inline d-flex justify-content-center md-form form-sm mt-0'>
                        <i className='fas fa-search' aria-hidden='true'></i>
                        <input className='form-control form-control-sm ml-3 w-75' type='text' placeholder='search' ara-label='search'></input>
                    </form>
                </div>
            
            <div className='card-body' style={this.style.boxResult}>

            </div>
            </div>
        )    
    }
}

class CustomHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dropdown:'',
            popUp: false,
        }
        this.handleMouseIn = this.handleMouseIn.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.style = {
            font:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:'20px'
            },
            fontA:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'34b4eb',
                fontSize:'20px'
            },
            hoveredFont: {
                color:' 34b4eb',
                fontFamily:"monaco, Consolas, Lucida Console",
                fontSize:'20px'
            },
            boxContain :{ height:'700px', width:'500px', backgroundColor:"blue", position:'fixed',display:'' },
        }
    }
    
    handleMouseIn(e) {
        const id = e.target.id
        this.setState({dropdown:id})
        Object.assign(e.target.style,this.style.hoveredFont) 
        
        // console.log(e.target.style.color)
    }
    handleMouseOut(e) {
        this.setState({dropdown:''})
        e.target.classList.remove('bg-primary')
        Object.assign(e.target.style,this.style.font)

        
    }
    handleOnClick(e) {
        const goto = e.target.getAttribute('goto')
        const redirect = window.location.hostname + "/" + goto
        window.location.assign("/./"+goto) 
    }
    handleOnSearch() {
        this.setState({popUp: !this.state.popUp})
        console.log('1')
    }
    render() {
        const buttonClassName = "btn-primary-outline btn"
        return(
        <div>
            {this.state.popUp?
            <div className='fixed-top text-center' style={{backgroundColor:'black'}}>
                <div className="list-inline">
                    <div className='list-inline-item' style={{backgroundColor:'green'}}>
                        <button style={this.style.font} goto="" onClick={(e)=>{this.handleOnClick(e)}} className={buttonClassName}>VGC</button>
                    </div>
                    <div className='list-inline-item' style={{backgroundColor:'blue', width:'1200px'}}>
                        <SearchPopup></SearchPopup>
                    </div>
                    <i className="fas fa-times list-inline-item" style={{color:'white',backgroundColor:'red'}} onClick={()=>{this.handleOnSearch()}}></i>
                </div>


            </div>
            :
            <div className={'fixed-top'} style={{backgroundColor:'black'}}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <button style={this.style.font} goto="" onClick={(e)=>{this.handleOnClick(e)}} className={buttonClassName}>VGC</button>
                    </div>
                    <div id="button">
                        <button goto="phim" id="phim" style={this.state.dropdown=="phim"?this.style.fontA:this.style.font} onClick={(e)=>{this.handleOnClick(e)}}  onMouseOver={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Phim
                        </button>
                        <button id='rap' style={this.state.dropdown=="rap"?this.style.fontA:this.style.font}  onMouseOver={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Rạp
                        </button>
                        <button id='dichvu' style={this.state.dropdown=="dichvu"?this.style.fontA:this.style.font} onMouseOver={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Dịch vụ
                        </button>
                        {/* <button onClick={()=>{this.handleOnSearch()}} onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} style={this.style.font} className={buttonClassName}>time kiem</button> */}

                        {/* {this.state.popUp?
                        <div style={this.style.boxContain} >
                            <SearchPopup   show={this.state.popUp}></SearchPopup>
                        </div>
                         
                        :
                        <button onClick={()=>{this.handleOnSearch()}} onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} style={this.style.font} className={buttonClassName}>time kiem</button>
                        } */}
                    </div>
                
                    <div className=''>
                        {$(user).is('br')?
                        <button onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} style={this.style.font} className={buttonClassName} data-toggle='modal' data-target='#userModal'>Đăng nhập</button>
                        :
                        <UserDropdown user={user}></UserDropdown>
                        }
                    </div>
                </div>
                
                <div id="content" className="container-fluid bg-primary" >
                    <div id='phimDropDown' onMouseLeave={(e)=>this.handleMouseOut(e)} className={this.state.dropdown=='phim'?"dropdown open":"dropdown-menu close"}>
                        <MovieVgc></MovieVgc>
                    </div>
                    <div id='rapDropDown' onMouseLeave={(e)=>this.handleMouseOut(e)} className={this.state.dropdown=='rap'?"dropdown open":"dropdown-menu"}>
                        <TheatreVgc></TheatreVgc>
                    </div>
                    <div id='dichvuDropDown' onMouseLeave={(e)=>this.handleMouseOut(e)} className={this.state.dropdown=='dichvu'?"dropdown open":"dropdown-menu"} >
                        <TheatreServices></TheatreServices>
                    </div>
                </div>
            </div>
                    }
        </div>
        )
    }
}
ReactDOM.render(<CustomHeader></CustomHeader>,dom)
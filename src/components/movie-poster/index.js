const dom = document.querySelectorAll('movie-poster')
const user = document.querySelector('template#user').content.children[0]

const imgOut = {
                    width: "100%",
                    height: "420px",
                    position: "relative",
                    backgroundColor:'white',
                    opacity:'1',
                    margin:'auto',
                    }
const imgDetail = {
                    width: "100%",
                    height: "500px",
                    position: "relative",
                    backgroundColor:'white',
                    opacity:'1',
                    margin:'auto',
                    clipPath:"polygon(0 0, 65% 0, 46% 100%, 0 100%)",
                    
                  
                    }
const poster = {width:"350px", height:"300px", display:"block",}
const btnstyle = {position:"absolute",top:"70%", left:"10%", width:"200px", color:"#34b4eb", height:"50" }
const btnDatve = {fontSize:'18px',color:"", width:"300px", position:"absolute", top:"60%", right:"5%",backgroundColor:'' }
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            frame: {
                width: "100%",
                height: "500px",
                position: "relative",
                backgroundColor:'',
                opacity:'1',
                margin:'auto',
            },
            fadeOut: {
                height: "100%",
                opacity:'1.2',
                width: "100%",
                position:"absolute",
                background: "-webkit-linear-gradient(left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100% ) "
            },
            fadeIn: {
                height: "100%",
                opacity:'1.2',
                width: "100%",
                position:"absolute",
                background: "-webkit-linear-gradient(left, rgba(0,0,0,1.2) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1.2) 80%, rgba(0,0,0,0) 100% ) "
            }
        }
    }
    handleOnDatVe(e) {
        e.preventDefault()
        if($(user).is('br')) {
            $('#userModal').modal('show')
        }
        else {
            $('#ticket-buy').modal('show')
        }
    }
     reverseInPlace(str) {
        var words = str.split('-')
        return words[2] +"-"+ words[1] + "-"+ words[0]
      }
    render() {

        return(
            <div >
               
                <div style={!this.props.detail?imgOut:imgDetail} >
                    <div style={this.props.detail?this.style.fadeIn:this.style.fadeOut}></div>
                    <img className={"h-100 w-100 d-block border border-secondary"} src={this.props.template.querySelector('img#phim_anhbia').src}></img>
                    { !this.props.detail && 
                    <div style={{fontFamily:"monaco, Consolas, Lucida Console",position:'absolute',width:'250px',height:'300px',paddingLeft:'15px',top:'70%',opacity:'1',filter:'brightness(1.75)',color:'white'}}>
                        <h3 >
                            {this.props.template.querySelector('#phim_ten').innerHTML}
                        </h3>
                        <h6>
                            {this.props.template.getAttribute('data-dangchieu')==1?this.props.template.querySelector('#phim_thoiluong').innerHTML+" phút":"Công chiếu vào "+this.reverseInPlace(this.props.template.querySelector('#phim_ngaychieu').innerHTML)}
                            {/* {this.props.template.querySelector('#phim_thoiluong').innerHTML} phút */}
                        </h6>
                        <div className='row pl-2'>
{                        this.props.template.getAttribute('data-dangchieu')==0 &&    <button style={{filter:"brightness(50%)"}} onClick={()=>{window.location.href='/phim/'+ this.props.template.id}} className='btn   btn-danger rounded-pill'>Xem chi tiết</button>}
{                          this.props.template.getAttribute('data-dangchieu') == 1 &&          <button style={{filter:"brightness(50%)"}} onClick={()=>{window.location.href='./phim/'+ this.props.template.id}}   className='btn  btn-danger rounded-pill'>Đặt vé ngay</button>}
                            {/* {this.props.template.getAttribute('data-dangchieu')==1?
                            <button className="btn btn-outline-primary rounded-pill" style={btnstyle} onClick={()=>{window.location.href='./phim/'+ this.props.template.id}}><p style={{color:"white", margin:"auto"}}>Xem chi tiết</p></button> 
                        :<p>Ngày chiếu: {this.props.template.querySelector('#phim_ngaychieu').innerHTML}</p>
                            } */}
                        </div>
                    </div> 
                    }
                </div>
                <div>
                { this.props.detail &&
                    <div className="row" style={{fontFamily:"monaco, Consolas, Lucida Console",color:'#FFF8DC',position:"absolute", top:"10%", marginLeft:"55%", width:"700px"}}>
                            <div className="col-md-4">
                                <img style={poster} className='w-100'  src={this.props.template.querySelector('img#phim_anh').src}></img>
                                <p style={{marginTop:'10px'}}>Thời lượng: {this.props.template.querySelector('#phim_thoiluong').innerHTML}p</p>
                                <p>{this.props.template.getAttribute('data-dangchieu')==0?"Khởi chiếu vào: "+this.reverseInPlace(this.props.template.querySelector('#phim_ngaychieu').innerHTML):"Giá phim: "+new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(this.props.template.querySelector('#phim_gia').innerHTML)}</p>
                            </div>
                        <div  className="col-md-8">
                            <h2  style={{fontWeight:'bold', textTransform:"uppercase", filter: "brightness(1.75)"}}><span>{this.props.template.querySelector('#phim_ten').innerHTML}</span></h2>
                            <p style={{margin:'none',padding:'none',fontWeight:'bold'}}>Tóm tắt: </p>
                            <div style={{overflowY:'scroll',height:'200px',margin:'none',padding:'none'}}>{this.props.template.querySelector('#phim_mieuta').innerHTML}</div>
                        </div>
                    </div> 
                    
                }</div>
                <div>
                    {this.props.detail && 
                    <div>
                    <button onClick={e=>this.handleOnDatVe(e)} className='btn btn-danger rounded-pill'  style={btnDatve}><p style={{color:"", margin:"auto", maxWidth:"auto"}}>Đặt vé</p></button>
                    </div>
                    }
                </div>
     
                
               
            </div>
        )
    }
}

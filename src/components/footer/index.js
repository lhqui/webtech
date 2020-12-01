const domContainer =  document.querySelector('footer')
const labelstyle = {color:"white", fontSize:"19px", fontWeight:"bold", textTransform:"uppercase"}
const textCopyR = {color:"white", fontSize:"15px", paddingTop:"5px", display:"inline-block", paddingRight:"5px"}


class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={hover: false}
        this.style = {
            textstyle : {color:"white", fontSize:"15px", paddingTop:"5px",opacity: "0.5", textDecoration: 'none', cursor:"poiter", display:"inline-block", paddingRight:"5px"},
            textstyleA : {color:"#34b4eb", fontSize:"18px", paddingTop:"10px",textDecoration: 'underline', cursor:"pointer"}
        }
    }
    handleMouseIn(e) {
        Object.assign(e.target.style, this.style.textstyleA)
    }
    handleMouseOut(e) {
        Object.assign(e.target.style, this.style.textstyle)
    }
    toggleHover() {
        this.setState({hover: !this.state.hover})
    }
    render() {
        return(
            <footer className=' page-footer font-small pt-4 '>
              
               <hr style={{border:'0'},{clear:'both'},{backgroundColor:'white'}}></hr>
                
                <div style={{height:"400px"}} className="row container mx-auto">
                    <div className='col-md-3 mx-auto mt-3 pb-3 text-left'>
                            <p style={labelstyle} className="mb-4 ">liên hệ</p>
                            <i style={this.style.textstyle} className=" fa fa-home"> </i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}> Ninh kiều, Cần thơ</p>
                            <br></br>
                            <i style={this.style.textstyle} className="fas fa-phone"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>1900 6789</p>
                            <br></br>
                            <i style={this.style.textstyle} className="fas fa-envelope"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}} > vgc@gmail.com</p>
                    </div>
                    <div className='col-md-3 mx-auto mt-3 pb-3 text-left'>
                            <p style={labelstyle} className="mb-4">Chính sách sử dụng</p>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>Điều Khoản Chung</p>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>Điều Khoản Thanh toán</p>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>Chính Sách Bảo Mật</p>
                            <br></br>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}>Câu Hỏi Thường Gặp</p>

                    </div>
                    <div className='col-md-3 mx-auto mt-3 pb-3 text-left'>
                            <p style={labelstyle} className="mb-4">theo dõi qua</p>
                            <i style={this.style.textstyle} className="fab fa-facebook-square"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}> Facebook</p>
                            <br></br>
                            <i style={this.style.textstyle} className="fab fa-twitter"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}> Twitter</p>
                            <br></br>
                            <i style={this.style.textstyle} className="fab fa-instagram"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}> Twitter</p>
                            <br></br>
                            <i style={this.style.textstyle} className="fab fa-youtube"></i>
                            <p style={this.style.textstyle} onMouseOver={(e)=>{this.handleMouseIn(e)}} onMouseLeave={(e)=>{this.handleMouseOut(e)}}> Youtube</p>
                    </div>
                </div>
                <hr style={{backgroundColor:"white"}}></hr>
                <div style={{marginLeft:"40%"}}>
                <i style={textCopyR}className="far fa-copyright"> </i>
                <p style={textCopyR}> VGC All RIGHTS RESERVED</p>
        
                </div>
           
                
            </footer>
        )
    }
}
ReactDOM.render(<Footer></Footer>,domContainer)
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
                backgroundColor:'#262626',
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
class CustomHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown:''
        }
        this.handleMouseIn = this.handleMouseIn.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.style = {
            font:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:'20px'
            },
            hoveredFont: {
                color:'#34b4eb',
                fontFamily:"monaco, Consolas, Lucida Console",
                fontSize:'20px'
            }
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
    render() {
        const buttonClassName = "btn-primary-outline btn"
        return(
            <div className={'fixed-top'} style={{backgroundColor:'black'}}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <button style={this.style.font} goto="" onClick={(e)=>{this.handleOnClick(e)}} className={buttonClassName}>VGC</button>
                    </div>
                    <div id="button">
                        <button goto="phim" style={this.style.font} onClick={(e)=>{this.handleOnClick(e)}} id='phim' onMouseOut={this.handleMouseOut} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Phim
                        </button>
                        <button id='rap' style={this.style.font}  onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Rạp
                        </button>
                        <button id='dichvu' style={this.style.font} onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Dịch vụ
                        </button>
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
                    <div id='phimDropDown' className={this.state.dropdown=='phim'?"dropdown open":"dropdown-menu close"}>
                        Phim
                    </div>
                    <div id='rapDropDown'  className={this.state.dropdown=='rap'?"dropdown open":"dropdown-menu"}>
                        Rạp
                    </div>
                    <div id='dichvuDropDown' className={this.state.dropdown=='dichvu'?"dropdown open":"dropdown-menu"} >
                        Dịch vụ
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<CustomHeader></CustomHeader>,dom)
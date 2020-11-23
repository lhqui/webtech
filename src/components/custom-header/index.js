const dom = document.querySelector('custom-header')
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
                        <button id='rap' style={this.style.font} onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Rạp
                        </button>
                        <button id='dichvu' style={this.style.font} onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Dịch vụ
                        </button>
                    </div>
                    <div>
                        <button onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} style={this.style.font} className={buttonClassName} data-toggle='modal' data-target='#userModal'>Đăng nhập</button>
                    </div>
                </div>
                
                <div id="content" className="container-fluid bg-primary" >
                    <div id='phimDropDown' className={this.state.dropdown=='phim'?"dropdown open":"dropdown-menu close"}>
                        Phim
                    </div>
                    <div id='rapDropDown' className={this.state.dropdown=='rap'?"dropdown open":"dropdown-menu"}>
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
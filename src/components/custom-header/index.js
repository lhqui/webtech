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
            backgroundColor:'red'
        }
    }
    
    handleMouseIn(e) {
        const id = e.target.id
        // hover change color
        e.target.classList.add('bg-primary')
        this.setState({dropdown:id})
    }
    handleMouseOut(e) {
        this.setState({dropdown:''})
        e.target.classList.remove('bg-primary')
    }
    handleOnClick(e) {
        const goto = e.target.getAttribute('goto')
        const redirect = window.location.hostname + "/" + goto
        window.location.assign("/./"+goto) 
    }
    render() {
        const buttonClassName = "btn-primary-outline btn color-white text-white"
        return(
            <div style={this.style}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <button goto="" onClick={(e)=>{this.handleOnClick(e)}} className={buttonClassName}>VGC</button>
                    </div>
                    <div id="button">
                        <button goto="phim" onClick={(e)=>{this.handleOnClick(e)}} id='phim' onMouseOut={this.handleMouseOut} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Phim
                        </button>
                        <button id='rap' onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Rạp
                        </button>
                        <button id='dichvu' onMouseOut={(e)=>this.handleMouseOut(e)} onMouseEnter={(e)=>{this.handleMouseIn(e)}} className={buttonClassName}>
                            Dịch vụ
                        </button>
                    </div>
                    <div>
                        User
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
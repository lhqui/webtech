class MovieList extends React.Component {
    constructor(props)
    {
        super(props)
        this.style = {
            normal: {
                cursor: "pointer",
                filter:'brightness(1.15)',
                transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"

            },
            active:{
                transform: "scale(1,1.01)",
                boxShadow: "0px 0px 0px 10px black, 1px 11px 15px 10px rgba(0,0,0,0.8)",
                zIndex: "100",
                opacity: "1",
                cursor: "pointer",
                filter:'brightness(1.5)',
                transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"
            },
            blur:{
                transform: "scale(0.9)",
                boxShadow: "0px 0px 20px 10px black",
                zIndex: "100",
                opacity: "0.5",
                transition:"opacity 0.4s linear, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"
            },
        }
        this.state = {
            hover:false,
            currentHover:0
        }
    }
    createMovieList() {
        this.movies = this.props.phim.map((i,elem)=>{
            return(
                <div className="m-3 col-2 " style={{textAlign:'center'}} onMouseLeave={(e)=>{this.handleMouseOut(e)}} onMouseOver={(e) => {this.handleMouseIn(e)}} key={i} style={!this.state.hover?this.style.normal:this.state.currentHover==i?this.style.active:this.style.blur}>
                    <img  onClick={()=>{window.location.href='./phim/'+elem.id+''}}  width={200} height={280} src={elem.querySelector('img#phim_anh').src} key={i} data-key={i}></img>
                    <div className="text-white mt-3 d-flex justify-content-center">
                        <h4>
                            {elem.querySelector('#phim_ten').innerHTML}
                        </h4>
                    </div>
                </div>
            )
        })
    }
    handleMouseIn(e) {
        this.setState({currentHover:e.target.getAttribute('data-key')})
        this.setState({hover:true})
    }
    handleMouseOut(e) {
        this.setState({hover:false})
        this.setState({currentHover:null})
    }
    render() {
        this.createMovieList()
        return(
            this.props.phim.length!=0 ? 
            <div className='row'>
                {this.movies}
            </div> : 
            <div>
                <h1 style={{color:'white'}}>Currently no movies</h1>
            </div>
        )
    }
}

const dom = document.querySelector('movie-picker')
const template = dom.children[0].content
const phimdangchieu = $("div.phim[data-dangchieu='1']",template)
const phimsapchieu = $("div.phim[data-dangchieu='0']",template)
export default class MoviePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dangchieu:true,
        }
        this.style = {
            buttonClassName:"btn-primary-outline btn",
            header: {
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white'
            },
            activeButton:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'#34b4eb',
                fontSize:"20px"
            },
            inactiveButton:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:"20px"
            }

        }
    }
    
    render() {
        return(
            <div className="m-5 p-5">
                <div className='title row'>
                    <h2 style={this.style.header}>
                        Phim tại VGC
                    </h2>
                    <div className='ml-auto'>
                        <button onClick={()=>this.setState({dangchieu:true})} className={this.style.buttonClassName} style={this.state.dangchieu?this.style.activeButton:this.style.inactiveButton}>  Đang chiếu </button>
                        <button onClick={()=>this.setState({dangchieu:false})} className={this.style.buttonClassName} style={!this.state.dangchieu?this.style.activeButton:this.style.inactiveButton}>  Sắp chiếu </button>
                        {/* <button onClick={()=>{this.setState({dangchieu:false}); console.log(this)}}>test</button> */}
                    </div>
                </div>
                <hr style={{border:'0'},{clear:'both'},{backgroundColor:'white'}}></hr>
                <div className='mt-5'>
                    <MovieList phim={this.state.dangchieu?phimdangchieu:phimsapchieu}></MovieList>
                </div>
            </div>
            )
    }
}

ReactDOM.render(<MoviePicker></MoviePicker>,dom)
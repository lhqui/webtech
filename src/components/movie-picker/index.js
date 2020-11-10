class MovieList extends React.Component {
    constructor(props)
    {
        super(props)
        this.movies = this.props.phim.map(function(i,elem){
            return(
                <img onClick={()=>{window.location.href='./phim/'+elem.id+''}} onMouseLeave={(e)=>{e.target.style.transform='scale(1)'}} onMouseOver={(e)=> { e.target.style.cursor='pointer'; e.target.style.transform='scale(1.3)' }} width={150} height={200} className='img-fluid' src={elem.querySelector('img').src} key={i}></img>
            )
        })
    }
    render() {
        return(
            this.props.phim.length!=0 ? 
            <div className='row'>
                {this.movies}
            </div> : 
            <div>
                <h1>Currently no movies</h1>
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
            dangchieu:true
        }
    }
    render() {
        return(
            <div className='container'>
                <div className='title row'>
                    <h1 style={{color:'white'}}>
                        Phim
                    </h1>
                    <div className='ml-auto'>
                        <button onClick={()=>this.setState({dangchieu:true})}>  Đang chiếu </button>
                        <button onClick={()=>this.setState({dangchieu:false})}>  Sắp chiếu </button>
                        {/* <button onClick={()=>{this.setState({dangchieu:false}); console.log(this)}}>test</button> */}
                    </div>
                </div>
                <hr style={{border:'0'},{clear:'both'},{backgroundColor:'white'}}></hr>
                <div className='mt-5'>
                    {this.state.dangchieu?(<MovieList phim={phimdangchieu}/>):(<MovieList phim={phimsapchieu}/>)}
                </div>
            </div>
            )
    }
}

ReactDOM.render(<MoviePicker></MoviePicker>,dom)
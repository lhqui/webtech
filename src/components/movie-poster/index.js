const dom = document.querySelectorAll('movie-poster')
const imstyleOut = {width:"1200px", height:"500px" }
const imstyleDe = {width:"90%", height:"500px", opacity:"0.5" }
const btnstyle = {position:"absolute",top:"70%", left:"20%", width:"150px" }
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.template)
    //   this.idphim = this.props.template.children[0].id
    //     console.log(this.idphim)
    }
    render() {
        const outsideView = (   
                    <span >
                        <img style={imstyleOut} className="responsive" src={this.props.template.querySelector('img#phim_anhbia').src}></img>
                        <button className="btn btn-primary" style={btnstyle} onClick={()=>{window.location.href='./phim/'+ this.props.template.id}}>Xem chi tiet</button>
                    </span>
                    )

        const detailView = (
                    <span>
                        <img style={imstyleDe} className="responsive" src={this.props.template.querySelector('img#phim_anhbia').src}></img>
                    </span>
        )
        return(
            <div className="text-center">
                {!this.props.detail?outsideView:detailView}
            </div>
        )
    }
}

const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            frame: {
                width: "100%",
                height: "50%",
                position: "relative",
                backgroundColor:'white',
                opacity:'1'
            },
            fade: {
                height: "100%",
                opacity:'1.2',
                width: "100%",
                position:"absolute",
                background: "-webkit-linear-gradient(left, rgba(0,0,0,1.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100% ) "
            }
        }
    }
    render() {
        return(
            <div style={this.style.frame}>
                <div style={this.style.fade}></div>
                <img className={"h-100 w-100 d-block"} src={this.props.template.querySelector('img#phim_anhbia').src}></img>
            </div>
        )
    }
}

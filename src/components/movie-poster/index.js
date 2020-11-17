const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            frame: {
                width: "100%",
                height: "100%",
                position: "relative",
            },
            fade: {
                height: "100%",
                width: "100%",
                position:"absolute",
                background: "-webkit-linear-gradient(left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.65) 100% ) "
            }
        }
    }
    render() {
        return(
            <div style={this.style.frame}>
                <div style={this.style.fade}></div>
                <img className={!this.props.class?"img-fluid":this.props.class}   src={this.props.template.querySelector('img#phim_anhbia').src}></img>
            </div>
        )
    }
}

const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
                <img className={!this.props.class?"d-block w-100 h-50":this.props.class}   src={this.props.template.querySelector('img#phim_anhbia').src}></img>
        )
    }
}

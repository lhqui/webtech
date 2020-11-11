const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <span style={{position:'relative'},{display:'inline-block'},{color:'black'},{boxShadow:'inset 0 0 40px 40px'}}>
                <img className={this.props.class!=null?this.props.class:'d-block w-100 h-50'} src={this.props.template.querySelector('img#phim_anhbia').src}></img>
            </span>
        )
    }
}

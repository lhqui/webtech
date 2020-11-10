const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>
                <img  className={this.props.class!=null?this.props.class:'d-block w-100 h-50'} src={this.props.template.querySelector('img').src}></img>
            </div>
        )
    }
}

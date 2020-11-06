const dom = document.querySelectorAll('movie-poster')
export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <img className='d-block w-100' src={this.props.template.querySelector('img').src}>

            </img>
        )
    }
}

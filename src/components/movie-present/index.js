import MoviePoster from '../movie-poster/index'
const dom = document.querySelector('movie-present')
const template = document.querySelector('template#phim')

export class MoviePresent extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return(
            <MoviePoster template={template}></MoviePoster>
        )
    }
}

ReactDOM.render(<MoviePresent></MoviePresent>,dom)
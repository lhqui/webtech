import MoviePoster from '../movie-poster/index.js'
const dom = document.querySelector('movie-present')
const template = dom.children[0].content.children[0]

 class MoviePresent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>
                
                <MoviePoster detail={true} template={template}></MoviePoster>
            </div>
        )
    }
}

ReactDOM.render(<MoviePresent></MoviePresent>,dom)
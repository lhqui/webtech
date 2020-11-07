const dom = document.querySelector('movie-picker')

export default class MoviePicker extends React.Component {
    constructor(props) {

    }
    render() {
        return(
            <div>
                <h1>Phim tại rạp</h1>
            </div>
            )
    }
}

ReactDOM.render(<MoviePicker></MoviePicker>,dom)
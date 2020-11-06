import MoviePoster from '../movie-poster/index'
const domContainer = document.querySelector('movie-carousel')
const template = domContainer.querySelector('template').content
const movies = template.querySelectorAll('.phim')
// img list
const imgList = []
movies.forEach(function(elem,i){
    imgList.push(
        <div key={i} className={i==0?'carousel-item active':'carousel-item'}>
            <MoviePoster template={this}></MoviePoster>
        </div>
    )
})
//  indicator 
const indicators = []
movies.forEach((elem,i)=>{
    indicators.push(
        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className={i==0?'active':' '}></li>
    )
})
class MovieCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        // $('.carousel-indicator:first-child',this).addClass('active')
        // $('.carousel-inner:first-child',this).addClass('active')
    }
    render() {
        return (
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {indicators}
                    </ol>
                    <div className="carousel-inner">
                        {imgList}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<MovieCarousel></MovieCarousel>, domContainer);

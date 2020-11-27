export default class MovieCard extends React.Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return(
            <div className="m-3 col-2 " style={{textAlign:'center'}} onMouseLeave={(e)=>{this.props.handleMouseOut(e)}} onMouseOver={(e) => {this.props.handleMouseIn(e)}} key={i} style={!this.state.hover?this.style.normal:this.state.currentHover==i?this.style.active:this.style.blur}>
                    <img  onClick={()=>{window.location.href='./phim/'+this.props.template.id+''}}  width={200} height={280} src={this.props.template.querySelector('img#phim_anh').src} key={i} data-key={i}></img>
                    <div className="text-white mt-3 d-flex justify-content-center">
                        <h4>
                            {this.props.template.querySelector('#phim_ten').innerHTML}
                        </h4>
                    </div>
            </div>
        )
    }
}
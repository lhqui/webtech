const domContainer =  document.querySelector('footer')
class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className='container-fluid'>
              
               <hr style={{border:'0'},{clear:'both'},{backgroundColor:'white'}}></hr>
                
                <div className="row">
                    <h4 className='col-md-4'>Lien he</h4>
                    <h4 className='col-md-4'>Mang xa Hoi</h4>
                    <h4 className='col-md-4'>Dieu Khoan su Dung  </h4>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Footer></Footer>,domContainer)
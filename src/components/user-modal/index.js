const dom = document.querySelector('user-modal')
class UserModal extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            general:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:'18px',
                backgroundColor:'#262626'
            }
        }
    }
    onMouseEnter(e) {
        e.target.style.color = '#34b4eb'
    }
    onMouseOut(e) {
        e.target.style.color = 'white'
    }
    handleSubmit(e) {
        e.preventDefault()
        
    }
    render() {
        return(
            <div  className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="userModal" aria-hidden="true">
                <div className="modal-dialog"  role="document">
                    <div className="modal-content" style={this.style.general}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Đăng nhập</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span style={{color:'white'}} aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='container-fluid' onSubmit={this.handleSubmit()}>
                                <div className='row m-3 p-0'>
                                    <label className='col-3 my-auto  p-0'>Tài khoản</label>
                                    <input className="form-control col-7" name='username'></input>
                                </div>
                                <div className='row m-3 p-0'>
                                    <label className='col-3 my-auto p-0'>Mật khẩu</label> 
                                    <input className="form-control col-7" name='password' type='password'></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" style={{color:'white'}} onMouseOut={(e)=>this.onMouseOut(e)} onMouseEnter={(e)=>this.onMouseEnter(e)} className="btn btn-primary-outline mr-auto" data-dismiss="modal">Đóng</button>
                            <button type="button" style={{color:'white'}} onMouseOut={(e)=>this.onMouseOut(e)} onMouseEnter={(e)=>this.onMouseEnter(e)} className="btn btn-primary-outline">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

ReactDOM.render(<UserModal></UserModal>,dom)
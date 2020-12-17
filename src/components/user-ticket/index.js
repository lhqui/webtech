
const dom = document.querySelector('user-ticket')

class UserTicket extends React.Component {
    constructor(props) {
        super(props)
        this.getVe = this.getVe.bind(this)
        this.createDsMuaVe = this.createDsMuaVe.bind(this)
        this.style = {
            general:{
                fontFamily:"monaco, Consolas, Lucida Console",
                color:'white',
                fontSize:'18px',
                backgroundColor:'#262626'
            }
        }
        this.state = {
            data:null,
            active:true
        }
        this.getVe()
    }
    componentDidMount() {
        this.getVe()
        this.interval = setInterval(this.getVe,5000)

    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    getVe() {
        console.log('called getVe()')
        $.ajax({
            url:'/functions/get_ve.php',
            method:'get',
        }).done(data=>{
            this.setState({data:JSON.parse(data)})
        })
    }
    createDsMuaVe(boolean = false) {
        this.ds_muave = 
        <table className='table' style={{overflowY:'scroll',color:'white',width:'100%',border:'1px solid white'}}>
            <thead>
            <tr>
                <th>
                    Phim
                </th>
                <th>
                    Số lượng
                </th>
                <th>
                    Danh sách ghế
                </th>
                <th>
                    Tổng tiền
                </th>
                <th>
                    Thời điểm mua
                </th>
                <th>
                    Địa điểm
                </th>
            </tr>
            </thead>
            <tbody>
            {this.state.data.map((e,i)=>{
                if(!e._suatchieu._isPassed!=boolean) {
                    return null;
                }
                else
            return(
                    <tr key={i} className={!e._suatchieu._isPassed?"bg-success":"bg-secondary"}>
                        <td>
                            {e._suatchieu._phim._data.phim_ten}
                        </td>
                        <td>
                            {e._ds_ghe.length}
                        </td>
                        <td>
                            {e._ds_ghe.map((e,i)=>{
                                return(
                                    e.ghe_hang + e.ghe_stt + " "
                                )
                            })}
                        </td>
                        <td>
                            {e._data.muave_tongtien}
                        </td>
                        <td>
                            {e._data.muave_thoidiem}
                        </td>
                        <td>
                            {e._suatchieu._viTri}
                        </td>
                    </tr>
            )
        }) || "Không có"}
        </tbody>
        </table>
    }
    componentDidUpdate(oldProp,oldState) {
        if(this.state.data!=oldState.data) {
            this.createDsMuaVe(this.state.active)
        }
    }
    render() {
        return(
            <div className="modal fade" id="userTicket" tabIndex="-1" role="dialog" aria-labelledby="userModal" aria-hidden="true">
                <div className="modal-dialog modal-lg"  role="document">
                    <div className="modal-content" style={this.style.general}>
                        <div className="modal-header p-0 pt-3 pl-3">
                            <p>Thông tin vé</p>
                            <div className="custom-control custom-switch row w-25 m-0 p-0">
                                <input onChange={e=>{ this.createDsMuaVe(!this.state.active) ; this.setState({active:!this.state.active});}} defaultChecked={true} type="checkbox" className="col-2 col-push-2 custom-control-input" id="customSwitch1"></input>
                                <label className="custom-control-label col-10 " htmlFor="customSwitch1">{this.state.active?"Sắp tới":"Đã cũ"}</label>
                            </div>
                        </div>
                        <div className="modal-body">
                            {this.ds_muave}
                        </div>
                        <div className="modal-footer">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<UserTicket></UserTicket>,dom)
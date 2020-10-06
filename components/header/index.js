import {include_tool} from '../../functions.js'
// const tool = include_tool()
customElements.define('header-button',class HeaderButton extends HTMLElement{
    constructor() {
        super()
        const container = document.createElement('div')
        include_tool(container)
        const content = this.getAttribute('content')
        const src = document.createElement('button')
        src.className = "btn bg-dark text-white"
        src.innerText = content
        container.appendChild(src)
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
    }
    
    connectedCallback() {
        

    }
})

customElements.define('custom-header', class Header extends HTMLElement {
    constructor() {
        super()
        const container = document.createElement('div')
        include_tool(container)
        // container.insertAdjacentHTML('beforeend',`  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script> <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/> <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>`)
        container.insertAdjacentHTML('afterbegin',`
            <div class='d-flex justify-content-between bg-dark text-white align-items-center'>
                <div>LOGO</div>
                <div>
                    <header-button id='1' content="ABC"></header-button>
                </div>
                <div>BUY TICKET</div>
            </div>

            
        `)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
       }
    connectedCallback() {

    }
})

    
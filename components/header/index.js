import {include_tool} from '../../functions.js'

customElements.define('custom-dropdown',class extends HTMLElement{
    constructor() {
        super()
        const container = document.createElement('div')
        container.className = "bg-primary"
        include_tool(container)
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
    }
    connectedCallback() {

    }

})

customElements.define('header-button',class HeaderButton extends HTMLElement{
    constructor() {
        super()
        // container
        const container = document.createElement('div')
        include_tool(container)
        // attributes
        const content = this.getAttribute('content')
        const goto = this.getAttribute('goto')
        const src = document.createElement('a')
        // src
        src.href = "./"+goto+".html"
        src.className = "btn bg-dark text-white"
        src.innerText = content

        container.appendChild(src)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
    }
    
    connectedCallback() {
        this.shadowRoot.addEventListener('mouseover',function(event){
            this.querySelector('div').className += "border-bottom border-primary"
            this.querySelector('a').classList.add('text-primary')
        })
        this.shadowRoot.addEventListener('mouseout',function(){
            this.querySelector('div').classList.remove('border-bottom')
            this.querySelector('div').classList.remove('border-primary')
            this.querySelector('a').classList.remove('text-primary')
        })
    }

})

customElements.define('custom-logo',class Logo extends HTMLElement{
    constructor() {
        super()
        const container = document.createElement('div')
        const src = document.createElement('img')
        const button = document.createElement('header-button')
        button.goto = "index"
        const logo = this.getAttribute('logo')
        src.src = "./assets/pics/" + logo
        include_tool(container)   
        container.appendChild(src)
        container.appendChild(button)
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
            <div class='navbar bg-dark navbar-dark'>
                <div>
                    <header-button goto='index' content='logo'/>
                </div>
                <div class='nav'>
                    <header-button goto='buy_ticket' content="Phim">
                    </header-button>
                    <header-button goto='buy_ticket' content="Rạp">
                    </header-button>
                    <header-button goto='buy_ticket' content="Thức ăn & nước uống">
                    </header-button>
                </div>
                <div>
                    <header-button goto='buy_ticket' content='Mua vé ngay'/>
                </div>
            </div>

            
        `)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
       }
    connectedCallback() {

    }
})

    
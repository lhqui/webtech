import {include_tool} from '../functions.js'

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
        src.style.fontFamily = '"Times New Roman", "Lucida Grande", sans-serif'
        src.style.fontSize = '20px'
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
        this.dropdown = this.dropdown.bind(this)
        this.unDropdown = this.unDropdown.bind(this)

        const container = document.createElement('div')
        include_tool(container)
        container.insertAdjacentHTML('afterbegin',`
            <div class='navbar bg-dark navbar-dark'>
                <div>
                    <header-button goto='index' content='logo'/>
                </div>
                <div class='nav'>
                    <header-button dropdown='movie' goto='buy_ticket' content="Phim">
                    </header-button>
                    <header-button dropdown='theater' goto='buy_ticket' content="Rạp">
                    </header-button>
                    <header-button dropdown='food' goto='buy_ticket' content="Thức ăn & nước uống">
                    </header-button>
                </div>
                <div>
                    <header-button goto='buy_ticket' content='Mua vé ngay'/>
                </div>
            </div>
            <div id='dropdown'>
                <div id='theater' style='display:none' class='bg-danger'>
                    Rap dropdown
                </div>
                <div id='food' style='display:none' class='bg-warning'>
                    Food drop down
                </div>
                <div id='movie' style='display:none' class='bg-primary'>
                    Movie drop down
                </div>
            </div>
        `)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
       }
    dropdown(e) {
        const dropdown = e.currentTarget.attributes.dropdown.value
        const query = '#dropdown div#'+dropdown
        $(query,this.shadowRoot).show()
    }
    unDropdown(e) {
        const dropdown = e.currentTarget.attributes.dropdown.value
        const query = '#dropdown div#'+dropdown
        $(query,this.shadowRoot).hide()
    }
    connectedCallback() {
        $('.nav header-button',this.shadowRoot).each( (value,item) => {
            item.addEventListener('mouseover',this.dropdown)
        })
        $('.nav header-button',this.shadowRoot).each( (value,item) => {
            item.addEventListener('mouseout',this.unDropdown)
        })
    }
})

    
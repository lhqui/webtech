import {include_tool} from '../functions.js'

customElements.define('custom-test2',class extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        include_tool(this)
        this.shadowRoot.innerHTML = "<h1>HOVER ME</h1>"    
    }
    connectedCallBack() {
        
    }
})

customElements.define('custom-test',class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        this.func = this.func.bind(this)
        this.func2 = this.func2.bind(this)
        include_tool(this)
        
        this.shadowRoot.innerHTML = `
            <custom-test2></custom-test2>
            <h1>HEY</h1>
        `
    }
    func() {
        this.shadowRoot.querySelector('h1').style.color = 'red'
    }
    func2() {
        this.shadowRoot.querySelector('h1').style.color= 'black'
    }
    connectedCallback() {
       this.shadowRoot.querySelector('custom-test2').addEventListener('click',this.func)
    }
})
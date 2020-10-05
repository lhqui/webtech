class Header extends HTMLElement {
    constructor() {
        super()
        
       }
    connectedCallback() {
        const src = document.createElement('h1')
        src.innerHTML = "<h1>HEY</h1>"
        const clone = document.importNode(src, true);
        this.attachShadow({ mode: 'open' }); 
        this.shadowRoot.appendChild(clone); 
    }
}
customElements.define('custom-header', Header);
    
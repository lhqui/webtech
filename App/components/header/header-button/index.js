class HeaderButton extends HTMLElement {
    constructor() {
        super()
       }
    connectedCallback() {
        const src = document.createElement('div')
        src.innerHTML = `<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/>
        <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>    `
        const content=this.getAttribute('content')
        src.innerHTML = src.innerHTML+ `
            <button class='btn btn-primary'>`+content+`</button>
        `
        this.innerHTML=src
        const clone = document.importNode(src, true);
        this.attachShadow({ mode: 'open' }); 
        this.shadowRoot.appendChild(clone); 
    }
}
customElements.define('header-button', HeaderButton)

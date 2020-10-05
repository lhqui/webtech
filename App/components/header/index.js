customElements.define('custom-header', class Header extends HTMLElement {
    constructor() {
        super()
        const src = document.createElement('div')
        src.insertAdjacentHTML('beforeend',`  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script> <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/> <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>`)
        src.insertAdjacentHTML('afterbegin',`
            <div id='container' class='d-flex justify-content-between navbar navbar-dark'>
                <div>LOGO</div>
                <div>buttons</div>
                <div>BUY TICKET</div>
            </div>

            <style>
                #container {
                    background-color:#1A1A2E;
                    color:white;
                }
            </style>
        `)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(src)
       }
    connectedCallback() {
       
    }
})

    
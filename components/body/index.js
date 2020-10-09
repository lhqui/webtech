import {include_tool} from '../../functions.js'
customElements.define('carousel-body', class carousel extends HTMLElement{
    constructor() {
        super()
        // div bao carousel 
        const container = document.createElement('div')
        container.className= "carousel slide w-100 mx-auto"
        // ol bao indicators
        const ol = document.createElement('ol')
        ol.className = "carousel-indicators"
        // li chua cac data taget
        const li = document.createElement('li')
        const numberslide = this.getAttribute("numberslide")
        li.setAttribute("data-target", ".carousel")
        li.setAttribute("data-slide-to",numberslide)


        container.appendChild(ol)
        ol.appendChild(li)
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(coontainer)
    }
    connectedCallback() {

    }
})
customElements.define('custom-body', class Body extends HTMLElement {
    constructor() {
        super()
        const container = document.createElement('div')
        include_tool(container)
        container.insertAdjacentHTML('afterbegin',`
            

            
        `)

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(container)
       }
    connectedCallback() {

    }
})

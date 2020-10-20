import {include_tool} from '../functions.js'

customElements.define('movie-carousel',class MovieCarousel extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        const container = document.createElement('div')
        $('.movie',this.children[0].content).each(function(elem,value) {
            
            $(container).html("<img src='"+$('img',this).attr('src')+"'></img>")
            // console.log($('img',this).attr('src'))
        })
        this.shadowRoot.append(container)
    }
    connectedCallback() {

    }

})
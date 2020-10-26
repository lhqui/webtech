import {include_tool} from '../functions.js'

customElements.define('movie-carousel',class MovieCarousel extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        const container = document.createElement('div')
        
        container.className = "carousel slide w-100 mx-auto"
        container.setAttribute('data-ride','carousel')
        container.setAttribute('id','carousel')
        
        const indicators = document.createElement('ol')
        indicators.className = "carousel-indicators"
        const inner = document.createElement('div')
        inner.className = "carousel-inner"
        
        let i = 0;
        $('.movie',this.children[0].content).each(function(elem,value) {
            let img_src= $('img',this).attr('src')
            
            $(indicators).append(`<li class='' data-target='#carousel' data-slide-to='${i}'> </li>`)
            
            const div= document.createElement('div')
            div.className='carousel-item'
            $(div).append(`<img class='d-block w-100 img-fluid' src=`+ img_src +` tyle='height: 420px;' />`)
            inner.appendChild(div)
            i++;
            // console.log($('img',this).attr('src'))
        })
        //make class active
        $('li:first',indicators).addClass('active')
        $('div:first',inner).addClass('active')
        //apend to container
        container.appendChild(indicators)
        container.appendChild(inner)
        $(container).append(`<a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carousel" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>`)
        include_tool(container)
        this.shadowRoot.append(container)
    }
    connectedCallback() {

    }

})
customElements.define('movie-carousel',class MovieCarousel extends HTMLElement{
    constructor() {
        super()
        const container = document.createElement('div')
        container.className = 'carousel slide'
        container.setAttribute('data-ride','carousel')
        const indicator = document.createElement('ol')
            indicator.className = 'carousel-indicators'
        const inner = document.createElement('div')
        inner.className = 'carousel-inner'
        $('.phim',this.children[0].content).each(function(i){
            // make active class
            const isActive = i==0?' active':' '
            //  indicator
            $(indicator).append("<li data-target='.carousel' data-slide-to='"+i+"' class='"+isActive+"'> </li>")
            // create an item
            const item = document.createElement('div')
            item.className = 'carousel-item' + isActive
            // item caption
            const caption = document.createElement('div')
            caption.className = 'carousel-caption w-25 bg-primary h-25' 
            const phim_ten = this.querySelector('h4')
                phim_ten.style.fontFamily = 'gordita,Helvetica,sans-serif;'
                phim_ten.style.size = '30px'
                phim_ten.style.marginRight = '75%'
            caption.append(phim_ten)
            // item 's children
            const img = this.querySelector('img')
            img.setAttribute('class','img-fluid mx-auto d-block w-75 h-50')
            item.appendChild(img)
            item.appendChild(caption)
            // add the new item
            inner.appendChild(item)

        })
        container.appendChild(indicator)
        container.appendChild(inner)
        // control button
        container.insertAdjacentHTML('beforeend',`<a class="carousel-control-prev" href=".carousel" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href=".carousel" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>`)
        this.appendChild(container)
    }
    connectedCallback() {

    }

})
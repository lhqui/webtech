export function attachShadow(selector)
{
    const template = 
    document.querySelector(selector);
    
    const clone = document.importNode(template.content, true);
    
    this.attachShadow({ mode: 'open' });         
    this.shadowRoot.appendChild(clone); 
}

// include bootstrap + jquery
export function include_tool(src) {
    src.insertAdjacentHTML('beforeend',`  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script> <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/> <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>`)
}

export function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function(script) { 
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        }); 
    });
}

// export function include_tool(src) {
//     console.log(src)
//     var jquery = document.createElement('script');
//     jquery.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
//     jquery.onload = function() {
//         console.log('sadsadsadsadsad')
//     }
//     jquery.type = 'text/javascript';
//     jquery.crossOrigin = "anonymous"
//     var bs = document.createElement('script');
//     bs.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
//     bs.type = 'text/javascript';
//     var bs_css = document.createElement('link')
//     bs_css.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
//     bs_css.rel = 'stylesheet'
//     bs.onload=function()  {
//         src.innerHTML = 'sadsad'
//         console.log('sad')
//     }
//     bs.onerror = function() {
//         console.log('clmmm')
//     }
//     // src.insertAdjacentElement('afterbegin',jquery)
//     //     // src.insertAdjacentElement('afterbegin',jquery)
//     //     bs.onload=function() {
//     //         src.style.backgroundColor = 'red'
//     //         src.insertAdjacentElement('beforeend',bs)
//     //         bs_css.onload = function() {
//     //             // src.insertAdjacentElement('beforeend',jquery)
//     //             // src.insertAdjacentElement('beforeend',bs)
//     //             src.style.backgroundColor = 'blue'
//     //             // src.insertAdjacentElement('beforeend',bs_css)
//     //         }
//     //     }
// }
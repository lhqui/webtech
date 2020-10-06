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
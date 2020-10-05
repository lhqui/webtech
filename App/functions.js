export function attachShadow(selector)
{
    const template = 
    document.querySelector(selector);
    
    const clone = document.importNode(template.content, true);
    
    this.attachShadow({ mode: 'open' });         
    this.shadowRoot.appendChild(clone); 
}
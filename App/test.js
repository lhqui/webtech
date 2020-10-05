class Test extends HTMLElement {
    constructor () {
        super()
    }
    connectedCallback() {
        this.innerHTML="<h1>HEY YOU MTFER</h1>"
        const template = 
   document.querySelector('template');
    
  const clone =    
  document.
  importNode(template.content, true);
   
  //this.appendChild(clone);
this.attachShadow({ mode: 'open' });         
  this.shadowRoot.appendChild(clone); 
    }
}
customElements.define('test',Test)
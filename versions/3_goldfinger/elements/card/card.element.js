class CardElement extends HTMLElement {    
    static observedAttributes = ['disabled', 'selected', 'text', 'errored'];
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'elements/card/card.element.css';

        this.label = document.createElement('label');
        this.label.className = 'card-label';
        this.label.onclick = this.toggleCard.bind(this);

        this.shadowRoot.append(link, this.label);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected') {
            this.label.classList.toggle('card-label-selected', this.getAttribute('selected') === 'true');
        }
        
        if (name === 'disabled') {
            this.label.classList.toggle('card-label-disabled', this.getAttribute('disabled') === 'true');
        }

        if (name === 'text') {
            this.label.innerText = newValue;
        }

        if (name === 'errored') {
            this.label.classList.toggle('card-label-errored', newValue === 'true');
            setTimeout(() => this.setAttribute('errored', false), 2000);
        }
    }

    toggleCard() {
        this.setAttribute('selected', !(this.getAttribute('selected') === 'true'));
        document.dispatchEvent(new CustomEvent('card-toggle'), {
            bubbles: true,
            composed: true
        });
    }
}

customElements.define('sl-card', CardElement);
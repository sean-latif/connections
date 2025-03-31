class GameCreatorCardElement extends HTMLElement {        
    static observedAttributes = ['category-id'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const categoryId = this.getAttribute('category-id') ?? 1;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game-creator-card/game-creator-card.element.css">
        <label class="card-label" style="background-color: var(--category-${categoryId}-color)">
            <input type="text" class="card-input" />
        </label>
        `;
        this.shadowRoot.querySelector('.card-input').onchange = this.onValueChange.bind(this);
    }

    onValueChange(event) {
        document.dispatchEvent(new CustomEvent('card-value-changed', {
            bubbles: true,
            composed: true,
            detail: {
                categoryId: this.getAttribute('category-id'),
                categoryItemIndex: this.getAttribute('category-item-index'),
                value: event.srcElement.value
            }
        }));
    }
}

customElements.define('sl-game-creator-card', GameCreatorCardElement);
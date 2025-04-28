class GameCreatorCardElement extends HTMLElement {        
    static observedAttributes = ['group-id', 'is-group-label'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const groupId = this.getAttribute('group-id') ?? 1;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game-creator-card/game-creator-card.element.css">
        <label class="card-label" style="background-color: var(--group-${groupId}-color)">
            <input type="text" class="card-input" />
        </label>
        `;
        const input = this.shadowRoot.querySelector('.card-input');
        input.onchange = this.onValueChange.bind(this);

        if (this.getAttribute('is-group-label') === 'true') {
            input.placeholder = `group ${groupId}`;
        }
    }

    onValueChange(event) {
        document.dispatchEvent(new CustomEvent('card-value-changed', {
            bubbles: true,
            composed: true,
            detail: {
                groupId: this.getAttribute('group-id'),
                groupItemIndex: parseInt(this.getAttribute('group-item-index')),
                isGroupLabel: this.getAttribute('is-group-label') === 'true',
                value: event.srcElement.value
            }
        }));
    }
}

customElements.define('sl-game-creator-card', GameCreatorCardElement);
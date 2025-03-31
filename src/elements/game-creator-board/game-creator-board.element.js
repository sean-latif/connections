class GameCreatorBoardElement extends HTMLElement {
    _board = {
        Categories: [
            {
                CategoryId: 1,
                Label: '1',
                Items: [{}, {}, {}, {}]
            },
            {
                CategoryId: 2,
                Label: '2',
                Items: [{}, {}, {}, {}]
            },
            {
                CategoryId: 3,
                Label: '3',
                Items: [{}, {}, {}, {}]
            },
            {
                CategoryId: 4,
                Label: '4',
                Items: [{}, {}, {}, {}]
            }
        ]
    };
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game-creator-board/game-creator-board.element.css">
        <form class="board">
            <h3>Create four groups of four!</h3>
            <fieldset class="board-container">
                <div id="cards-container" class="cards-container"></div>
            </fieldset>
        </form>
        `;

        const cardsContainer = this.shadowRoot.getElementById('cards-container');
        for (let i = 0; i < 16; i++) {
            const categoryId = Math.floor(i / 4) + 1;
            const card = document.createElement('sl-game-creator-card');
            card.setAttribute('category-id', categoryId);
            card.setAttribute('category-item-index', i % 4);
            cardsContainer.appendChild(card);
        }

        document.addEventListener('card-value-changed', (event) => this.cardValueChanged(event.detail));
    }

    cardValueChanged(detail) {
        const categoryIndex = this._board.Categories.findIndex(x => x.CategoryId == detail.categoryId);
        this._board.Categories[categoryIndex].Items[parseInt(detail.categoryItemIndex)].Label = detail.value;

        document.dispatchEvent(new CustomEvent('game-creator-board-changed', {
            bubbles: true,
            composed: true,
            detail: {
                board: this._board
            }
        }));
    }
}

customElements.define('sl-game-creator-board', GameCreatorBoardElement);
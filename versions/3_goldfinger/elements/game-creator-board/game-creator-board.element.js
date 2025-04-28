class GameCreatorBoardElement extends HTMLElement {
    _board = {
        Groups: [
            {
                GroupId: 1,
                Label: '1',
                Items: [{}, {}, {}, {}]
            },
            {
                GroupId: 2,
                Label: '2',
                Items: [{}, {}, {}, {}]
            },
            {
                GroupId: 3,
                Label: '3',
                Items: [{}, {}, {}, {}]
            },
            {
                GroupId: 4,
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
        for (let i = 0; i < 20; i++) {
            const groupId = Math.floor(i / 5) + 1;
            const card = document.createElement('sl-game-creator-card');
            card.setAttribute('group-id', groupId);

            const itemIndexInRow = i % 5;
            card.setAttribute('is-group-label', itemIndexInRow == 0);
            card.setAttribute('group-item-index', itemIndexInRow - 1);
            cardsContainer.appendChild(card);
        }

        document.addEventListener('card-value-changed', (event) => this.cardValueChanged(event.detail));
    }

    cardValueChanged(detail) {
        const groupIndex = this._board.Groups.findIndex(x => x.GroupId == detail.groupId);
        if (detail.isGroupLabel) {
            this._board.Groups[groupIndex].Label = detail.value;
        } else {
            this._board.Groups[groupIndex].Items[parseInt(detail.groupItemIndex)].Label = detail.value;
        }

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
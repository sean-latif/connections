class GameCreatorElement extends HTMLElement {
    _board = {};
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game-creator/game-creator.element.css">
        
        <sl-game-creator-board></sl-game-creator-board>
        <div class="buttons-container">
            <button id="create-button" class="button" data-is-disabled="true">Create</button>
        </div>
        `;

        this.shadowRoot.getElementById('create-button').onclick = () => this.create();

        document.addEventListener('game-creator-board-changed', (event) => this.onBoardChanged(event.detail));
    }

    onBoardChanged(detail) {
        this._board = detail.board;
        this.shadowRoot.querySelector('#submit-button').dataset.isDisabled = !this.isBoardValid(this._board);
    }

    isBoardValid(board) {
        return board.Categories.filter(category => 
            category.Label.trim() &&
            category.Items.length == 4 &&
            category.Items.filter(item => item.Label && item.Label.trim()).length == 4
        ).length == 4;
    }

    create() {
        const boardId = BoardService.createBoard(this._board);
        document.dispatchEvent(new CustomEvent('board-created', {
            bubbles: true,
            composed: true,
            detail: {
                boardId: boardId
            }
        }));
    }
}

customElements.define('sl-game-creator', GameCreatorElement);
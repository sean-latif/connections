class GameCreatorElement extends HTMLElement {
    _board = {};
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game-creator/game-creator.element.css">
        <div id="snackbar"></div>
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
        this.shadowRoot.querySelector('#create-button').dataset.isDisabled = !this.isBoardReady(this._board);
    }

    isBoardReady(board) {
        return board.Groups.filter(group => 
            group.Label.trim() &&
            group.Items.length == 4 &&
            group.Items.filter(item => item.Label && item.Label.trim()).length == 4
        ).length == 4;
    }

    validateBoard(board) {
        const groupLabels = new Set(board.Groups.map(x => x.Label));
        if (groupLabels.size < 4) {
            return { isValid: false, message: 'Groups must be unique' };
        }

        const itemLabels = new Set();
        board.Groups.forEach(c => {
            c.Items.forEach(i => {
                itemLabels.add(i.Label);
            })
        });
        if (itemLabels.size < 16) {
            return { isValid: false, message: 'All cards must be unique' };
        }

        return { isValid: true, message: 'Board is valid!' };
    }

    create() {
        const validationResult = this.validateBoard(this._board);
        this.showMessage(validationResult.message);
        if (!validationResult.isValid) {
            return;
        }

        const boardId = BoardService.createBoard(this._board);
        document.dispatchEvent(new CustomEvent('board-created', {
            bubbles: true,
            composed: true,
            detail: {
                boardId: boardId
            }
        }));
    }

    showMessage(message) {
        const $snackBar = this.shadowRoot.getElementById('snackbar');
        $snackBar.innerText = message;
        $snackBar.className = 'show';
        setTimeout(() => $snackBar.className = $snackBar.className.replace("show", ""), 2700);
    }
}

customElements.define('sl-game-creator', GameCreatorElement);
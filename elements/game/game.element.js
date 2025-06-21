class GameElement extends HTMLElement {
    static observedAttributes = ['board-id'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/game/game.element.css">
        
        <div id="snackbar"></div>
        <sl-board></sl-board>
        <span id="mistakes-container" class="mistakes-container">
            <p class="mistakes-count-container">
                Mistakes Remaining: <span id="mistakes-bubbles" class="mistakes-bubbles"></span>
            </p>
        </span>
        <div class="buttons-container">
            <button id="shuffle-button" class="button" data-is-disabled="false">Shuffle</button>
            <button id="deselect-all-button" class="button" data-is-disabled="true">Deselect All</button>
            <button id="submit-button" class="button" data-is-disabled="true">Submit</button>
        </div>`;

        this.shadowRoot.getElementById('shuffle-button').onclick = () => this.shuffle();
        this.shadowRoot.getElementById('deselect-all-button').onclick = () => this.deselectAll();
        this.shadowRoot.getElementById('submit-button').onclick = () => this.submit();

        document.addEventListener('board-change', (event) => this.onBoardChange(event));
        document.addEventListener('board-submission-evaluated', event => this.onBoardSubmissionEvaluated(event));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'board-id') {
            this.boardId = newValue;
            this.shadowRoot.querySelector('sl-board').setAttribute('board-id', this.boardId);

            this.sessionId = SessionService.startSession();

            const $mistakesBubbles = this.shadowRoot.getElementById('mistakes-bubbles');
            for (let i = 0; i < 4; i++) {
                const $bubble = document.createElement('span');
                $bubble.className = 'mistake-bubble';
                $mistakesBubbles.appendChild($bubble);
            }
        }
    }

    shuffle() {
        document.dispatchEvent(new CustomEvent('shuffle-board'));
    }

    deselectAll() {
        document.dispatchEvent(new CustomEvent('deselect-all'));
    }

    submit() {
        SessionService.addSubmission(this.sessionId, this.selectedItems);
        document.dispatchEvent(new CustomEvent('submit'));
    }

    onBoardChange(event) {
        this.selectedItems = event.detail.selectedItems;
        this.shadowRoot.getElementById('submit-button').dataset.isDisabled =  this.selectedItems.length !== 4;
        this.shadowRoot.getElementById('deselect-all-button').dataset.isDisabled =  this.selectedItems.length === 0;
        this.shadowRoot.getElementById('shuffle-button').dataset.isDisabled =  this.selectedItems.length > 0;
    }

    onBoardSubmissionEvaluated(event) {
        if (event.detail.isBoardComplete) {
            this.displayEndBlocks(true);
            return;
        }
        
        if (event.detail.result.isSuccess) {
            return;
        }
    
        const mistakesBubbles = this.shadowRoot.getElementById('mistakes-bubbles');
        mistakesBubbles.removeChild(mistakesBubbles.firstElementChild);
        
        if (mistakesBubbles.childElementCount == 0) {
            document.dispatchEvent(new CustomEvent('game-over'));
            setTimeout(() => this.displayEndBlocks(false), 2000);
            return;
        }
    
        if (event.detail.result.message) {
            this.showMessage(event.detail.result.message);
        }
    }

    displayEndBlocks(isSuccess)
    {
        const $results = document.createElement('sl-results');
        $results.setAttribute('board-id', this.boardId);
        $results.setAttribute('session-id', this.sessionId);
        $results.setAttribute('success', isSuccess);
        document.querySelector('body').appendChild($results);
    }
    
    showMessage(message) {
        const $snackBar = this.shadowRoot.getElementById('snackbar');
        $snackBar.innerText = message;
        $snackBar.className = 'show';
        setTimeout(() => $snackBar.className = $snackBar.className.replace("show", ""), 2700);
    }
}

customElements.define('sl-game', GameElement);
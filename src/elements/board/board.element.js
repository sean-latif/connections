class BoardElement extends HTMLElement {    
    static observedAttributes = ['board-id'];

    _boardId;
    GROUP_COUNT = 4;
    GROUP_ITEM_COUNT = 4;

    constructor() {
        super();
        this.boardService = new BoardService();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/board/board.element.css">
        <form class="board">
            <h3>Create four groups of four!</h3>
            <fieldset class="board-container">
                <div id="answers-container" class="answers-container"></div>
                <div id="cards-container" class="cards-container"></div>
            </fieldset>
        </form>`;

        document.addEventListener('card-toggle', () => this.onCardToggle());
        document.addEventListener('shuffle-board', () => this.shuffle());
        document.addEventListener('deselect-all', () => this.deselectAll());
        document.addEventListener('submit', () => this.submit());
        document.addEventListener('game-over', () => this.gameOver());
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'board-id') {
            this._boardId = newValue;
            const items = BoardService.getBoardItems(newValue);
            const cardsContainer = this.shadowRoot.getElementById('cards-container');
            this.shuffleItems(items.map(item => item.Label)).forEach(item => {
                const card = document.createElement('sl-card');
                card.setAttribute('text', item);
                cardsContainer.appendChild(card);
            });
        }
    }

    shuffleItems(items) {
        const shuffledItems = [];
        items.forEach(item => {
            shuffledItems.splice(Math.random() * items.length, 0, item);
        });
        return shuffledItems;
    }

    onCardToggle() {
        const cards = this.getCards();
        const selectedCards = cards.filter(this.isCardSelected);
        const areAllSelectionsMade = selectedCards.length === this.GROUP_ITEM_COUNT;
        const unselectedCards = cards.filter(card => !this.isCardSelected(card));
        unselectedCards.forEach(card => card.setAttribute('disabled', areAllSelectionsMade));

        document.dispatchEvent(new CustomEvent('board-change', {
            bubbles: true,
            composed: true,
            detail: {
                selectedItems: selectedCards.map(x => x.getAttribute('text'))
            }
        }));
    }

    submit() {
        const selectedCards = this.getCards().filter(this.isCardSelected);
        const submission = selectedCards.map($card => $card.getAttribute('text'));
        const result = BoardService.evaluateGuess(this._boardId, submission);
        let isBoardComplete = false;

        if (result.isSuccess) {
            isBoardComplete = this.onGroupComplete(result.group, true);
        } else {
            selectedCards.forEach($card => $card.setAttribute('errored', true));
        }

        document.dispatchEvent(new CustomEvent('board-submission-evaluated', {
            bubbles: true,
            composed: true,
            detail: {
                result,
                isBoardComplete
            }
        }));
    }

    onGroupComplete(group, isSuccess) {
        const completedGroupSection = document.createElement('section');
        completedGroupSection.className = 'answers-container-group';
        completedGroupSection.style['background-color'] = `var(--group-${group.GroupId}-color)`;
        const completedGroupSectionLabel = document.createElement('h3');
        completedGroupSectionLabel.innerText = group.Label;
        const completedGroupSectionCards = document.createElement('label');
        completedGroupSectionCards.innerText = group.Items.map(item => item.Label).join(', ');
        completedGroupSection.appendChild(completedGroupSectionLabel);
        completedGroupSection.appendChild(completedGroupSectionCards);
        const answersContainer = this.shadowRoot.getElementById('answers-container');
        answersContainer.appendChild(completedGroupSection);
        const groupsCompletedCount = this.shadowRoot.querySelectorAll('.answers-container-group').length;
        answersContainer.style.height = (3 * 8) + ((groupsCompletedCount) * 80) + 'px';
        answersContainer.style['grid-template-rows'] = `repeat(${groupsCompletedCount}, 1fr)`;
    
        this.getCards().filter(this.isCardSelected).forEach($card => $card.remove());
    
        const groupsIncompletedCount = this.GROUP_COUNT - groupsCompletedCount;
        const cardsContainer = this.shadowRoot.getElementById('cards-container');
        cardsContainer.style['grid-template-rows'] = `repeat(${groupsIncompletedCount}, 1fr)`;
        cardsContainer.style.height = (3 * 8) + (groupsIncompletedCount * 80) + 'px';
    
        this.onCardToggle();
    
        return isSuccess && groupsIncompletedCount == 0;
    }
    
    shuffle() {
        const cards = this.getCards();
        const shuffledItems = this.shuffleItems(cards.map($card => $card.getAttribute('text')));
    
        shuffledItems.forEach((item, i) => {
            cards[i].setAttribute('text', item);
        });
    }

    deselectAll() {
        this.getCards().forEach($card => $card.setAttribute('selected', false));
        this.onCardToggle();
    }

    gameOver() {
        const groupsByItem = BoardService.getGroupsByItem(this.getAttribute('board-id'));
        const remainingItems = this.getCards().map(x => x.getAttribute('text'));
        const remainingGroups = {};
        remainingItems.forEach(x => {
            const group = groupsByItem[x];
            remainingGroups[group.GroupId] = group;
        });

        Object.keys(remainingGroups).forEach(x => {
            this.onGroupComplete(remainingGroups[x], false);
        });
        this.getCards().forEach($card => $card.remove());
    }

    getCards() {
        return [...this.shadowRoot.querySelectorAll(`sl-card`)];
    }

    isCardSelected($card) {
        return $card.getAttribute('selected') === 'true';
    }
}

customElements.define('sl-board', BoardElement);
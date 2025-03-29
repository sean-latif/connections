class BoardElement extends HTMLElement {    
    static observedAttributes = ['board-id'];

    CATEGORY_COUNT = 4;
    CATEGORY_ITEM_COUNT = 4;

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
        const areAllSelectionsMade = selectedCards.length === this.CATEGORY_ITEM_COUNT;
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
        const result = BoardService.evaluateGuess(_boardId, submission);
        let isBoardComplete = false;

        if (result.isSuccess) {
            isBoardComplete = this.onCategoryComplete(result.category, true);
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

    onCategoryComplete(category, isSuccess) {
        const completedCategorySection = document.createElement('section');
        completedCategorySection.className = 'answers-container-category';
        completedCategorySection.style['background-color'] = `var(--category-${category.CategoryId}-color)`;
        const completedCategorySectionLabel = document.createElement('h3');
        completedCategorySectionLabel.innerText = category.Label;
        const completedCategorySectionCards = document.createElement('label');
        completedCategorySectionCards.innerText = category.Items.map(item => item.Label).join(', ');
        completedCategorySection.appendChild(completedCategorySectionLabel);
        completedCategorySection.appendChild(completedCategorySectionCards);
        const answersContainer = this.shadowRoot.getElementById('answers-container');
        answersContainer.appendChild(completedCategorySection);
        const categoriesCompletedCount = this.shadowRoot.querySelectorAll('.answers-container-category').length;
        answersContainer.style.height = (3 * 8) + ((categoriesCompletedCount) * 80) + 'px';
        answersContainer.style['grid-template-rows'] = `repeat(${categoriesCompletedCount}, 1fr)`;
    
        this.getCards().filter(this.isCardSelected).forEach($card => $card.remove());
    
        const categoriesIncompletedCount = this.CATEGORY_COUNT - categoriesCompletedCount;
        const cardsContainer = this.shadowRoot.getElementById('cards-container');
        cardsContainer.style['grid-template-rows'] = `repeat(${categoriesIncompletedCount}, 1fr)`;
        cardsContainer.style.height = (3 * 8) + (categoriesIncompletedCount * 80) + 'px';
    
        this.onCardToggle();
    
        return isSuccess && categoriesIncompletedCount == 0;
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
        const categoriesByItem = BoardService.getCategoriesByItem(this.getAttribute('board-id'));
        const remainingItems = this.getCards().map(x => x.getAttribute('text'));
        const remainingCategories = {};
        remainingItems.forEach(x => {
            const category = categoriesByItem[x];
            remainingCategories[category.CategoryId] = category;
        });

        Object.keys(remainingCategories).forEach(x => {
            this.onCategoryComplete(remainingCategories[x], false);
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
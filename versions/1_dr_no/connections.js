const CATEGORY_COUNT = 4;
const CATEGORY_ITEM_COUNT = 4;
const MAX_GUESS_COUNT = 4;
const CSS_CARD_LABEL_CLASS = 'card-label';

const _boardService = new BoardService(new BoardRepository());
const _sessionService = new SessionService(new SessionRepository());

let _boardId = 0;
let _sessionId = 0;

document.addEventListener('DOMContentLoaded', function() {
    _boardId = new URLSearchParams(window.location.search).get('boardId') ?? 0;
    _sessionId = _sessionService.startSession();
    loadUI(_boardId);
}, false);

function loadUI(boardId) {
    const items = _boardService.getBoardItems(boardId);
    this.loadCards(items);
    this.loadGuesses();
}

function loadCards(items) {
    const shuffledItems = shuffleItems(items.map(item => item.Label));
    const $cardsContainer = document.getElementById('cards-container');
    shuffledItems.forEach(item => {
        const $card = document.createElement('label');
        $card.innerText = item;
        $card.dataset.item = item;
        $card.className = CSS_CARD_LABEL_CLASS;
        $card.onclick = toggleCard;
        $cardsContainer.appendChild($card);
    });
}

function loadGuesses() {
    const $mistakesBubbles = document.getElementById('mistakes-bubbles');
    for (let i = 0; i < MAX_GUESS_COUNT; i++) {
        const $bubble = document.createElement('span');
        $bubble.className = 'mistake-bubble';
        $mistakesBubbles.appendChild($bubble);
    }
}

function toggleCard($event) {
    $event.srcElement.dataset.isSelected = $event.srcElement.dataset.isSelected === true.toString() ? false.toString() : true.toString();
    onCardToggled();
}

function onCardToggled() {
    const $cards = getCards();
    const $selectedCards = $cards.filter(isCardSelected);
    const areAllSelectionsMade = $selectedCards.length === CATEGORY_ITEM_COUNT;
    const $unselectedCards = $cards.filter($card => !isCardSelected($card));
    $unselectedCards.forEach($card =>$card.dataset.isDisabled = areAllSelectionsMade);

    document.getElementById('submit-button').dataset.isDisabled = !areAllSelectionsMade;
    document.getElementById('deselect-all-button').dataset.isDisabled = $selectedCards.length === 0;
    document.getElementById('shuffle-button').dataset.isDisabled = $selectedCards.length > 0;
}

function submit() {
    const $selectedCards = getCards().filter(isCardSelected);
    const submission = $selectedCards.map($card => $card.dataset.item);
    _sessionService.addSubmission(_sessionId, submission);
    const result = _boardService.evaluateGuess(_boardId, submission);

    if (result.isSuccess) {
        onCategoryComplete(result.category, true);
        return;
    }

    const $mistakesBubbles = document.getElementById('mistakes-bubbles');
    $mistakesBubbles.removeChild($mistakesBubbles.firstElementChild);
    
    if ($mistakesBubbles.childElementCount == 0) {
        const categoriesByItem = _boardService.getCategoriesByItem(_boardId);
        const remainingItems = getCards().map(x => x.dataset.item);
        const remainingCategories = {};
        remainingItems.forEach(x => {
            const category = categoriesByItem[x];
            remainingCategories[category.CategoryId] = category;
        });

        Object.keys(remainingCategories).forEach(x => {
            onCategoryComplete(remainingCategories[x], false);
        });
        getCards().forEach($card => $card.remove());
        setTimeout(() => displayEndBlocks(false), 2000);
        return;
    }

    $selectedCards.forEach($card => $card.dataset.isError = 'true');
    setTimeout(() => $selectedCards.forEach($card => $card.dataset.isError = 'false'), 2000);

    if (result.message) {
        showMessage(result.message);
    }
}

function onCategoryComplete(category, isSuccess) {
    const $completedCategorySection = document.createElement('section');
    $completedCategorySection.className = 'answers-container-category';
    $completedCategorySection.style['background-color'] = `var(--category-${category.CategoryId}-color)`;
    const $completedCategorySectionLabel = document.createElement('h3');
    $completedCategorySectionLabel.innerText = category.Label;
    $completedCategorySectionCards = document.createElement('label');
    $completedCategorySectionCards.innerText = category.Items.map(item => item.Label).join(', ');
    $completedCategorySection.appendChild($completedCategorySectionLabel);
    $completedCategorySection.appendChild($completedCategorySectionCards);
    const $answersContainer = document.getElementById('answers-container');
    $answersContainer.appendChild($completedCategorySection);
    const categoriesCompletedCount = document.querySelectorAll('.answers-container-category').length;
    $answersContainer.style.height = (3 * 8) + ((categoriesCompletedCount) * 80) + 'px';
    $answersContainer.style['grid-template-rows'] = `repeat(${categoriesCompletedCount}, 1fr)`;

    getCards().filter(isCardSelected).forEach($card => $card.remove());

    const categoriesIncompletedCount = CATEGORY_COUNT - categoriesCompletedCount;
    const $cardsContainer = document.getElementById('cards-container');
    $cardsContainer.style['grid-template-rows'] = `repeat(${categoriesIncompletedCount}, 1fr)`;
    $cardsContainer.style.height = (3 * 8) + (categoriesIncompletedCount * 80) + 'px';

    onCardToggled();

    if (isSuccess && categoriesIncompletedCount == 0) {
        displayEndBlocks(true);
    }
}

function displayEndBlocks(isSuccess)
{
    const submissions = _sessionService.getSubmissions(_sessionId);
    const categoriesByItem = _boardService.getCategoriesByItem(_boardId);
    $endModalContent = document.getElementById('blocks-container');
    submissions.forEach(x => {
        $blocksRow = document.createElement('span');
        $blocksRow.className = 'blocks-row';
        x.forEach(y => {
            $block = document.createElement('span');
            $block.className = 'block';
            $block.style['background-color'] = `var(--category-${categoriesByItem[y].CategoryId}-color)`;
            $blocksRow.appendChild($block);
        });
        $endModalContent.appendChild($blocksRow);
    });

    $modalText = document.getElementById('modal-text');
    $modalText.innerText = isSuccess ? 'SUCCESS!' : 'FAILURE!'

    $endModal = document.getElementById('end-modal');
    $endModal.style.display = 'block';
}

function getCards() {
    return [...document.querySelectorAll(`.${CSS_CARD_LABEL_CLASS}`)];
}

function isCardSelected($card) {
    return $card.dataset.isSelected === 'true';
}

function shuffle() {
    const $cards = getCards();
    const shuffledItems = shuffleItems($cards.map($card => $card.dataset.item));

    shuffledItems.forEach((item, i) => {
        $cards[i].dataset.item = item;
        $cards[i].innerText = item;
    });
}

function deselectAll() {
    getCards().forEach($card => $card.dataset.isSelected = false);
    onCardToggled();
}

function shuffleItems(items) {
    const shuffledItems = [];
    items.forEach(item => {
        shuffledItems.splice(Math.random() * items.length, 0, item);
    });
    return shuffledItems;
}

function showMessage(message) {
    const $snackBar = document.getElementById('snackbar');
    $snackBar.innerText = message;
    $snackBar.className = 'show';
    setTimeout(() => $snackBar.className = $snackBar.className.replace("show", ""), 2700);
}

function closeModal() {
    $endModal = document.getElementById('end-modal');
    $endModal.style.display = 'none';
}
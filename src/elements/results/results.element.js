class ResultsElement extends HTMLElement {        
    constructor() {
        super();
        this.sessionService = new SessionService(new SessionRepository());
        this.boardService = new BoardService(new BoardRepository());
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="elements/results/results.element.css">
        <div id="end-modal" class="end-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <span id="modal-text"></span>
                <div id="blocks-container" class="blocks-container"></div>
            </div>
        </div>`;

        const submissions = SessionService.getSubmissions(this.getAttribute('session-id'));
        const categoriesByItem = BoardService.getCategoriesByItem(this.getAttribute('board-id'));
        const endModalContent = this.shadowRoot.getElementById('blocks-container');
        submissions.forEach(x => {
            const blocksRow = document.createElement('span');
            blocksRow.className = 'blocks-row';
            x.forEach(y => {
                const block = document.createElement('span');
                block.className = 'block';
                block.style['background-color'] = `var(--category-${categoriesByItem[y].CategoryId}-color)`;
                blocksRow.appendChild(block);
            });
            endModalContent.appendChild(blocksRow);
        });
    
        this.shadowRoot.getElementById('modal-text').innerText = this.getAttribute('success') === 'true' ? 'SUCCESS!' : 'FAILURE!'
        this.shadowRoot.querySelector('.close').onclick = this.closeModal.bind(this);
        this.shadowRoot.getElementById('end-modal').style.display = 'block';
    }

    closeModal() {
        this.shadowRoot.getElementById('end-modal').style.display = 'none';
    }
}

customElements.define('sl-results', ResultsElement);
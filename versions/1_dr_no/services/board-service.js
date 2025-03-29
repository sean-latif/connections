class BoardService {
    #repo;

    constructor(repo) {
        this.#repo = repo;
    }
    
    getBoardItems(boardId) {
        const items = [];
        const board = this.#repo.getConnectionsBoard(boardId);
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                items.push(item);
            });
        });
        return items;
    }

    evaluateGuess(boardId, items) {
        const board = this.#repo.getConnectionsBoard(boardId);
        const categoriesByItem = {};
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                categoriesByItem[item.Label] = category;
            });
        });

        const selectedCategoryIds = new Set(items.map(item => categoriesByItem[item].CategoryId));
        const isSuccess = selectedCategoryIds.size === 1;
        return {
            isSuccess: isSuccess,
            category: isSuccess ? categoriesByItem[items[0]] : null,
            message: selectedCategoryIds.size === 2 ? 'One away...' : null
        };
    }

    getCategoriesByItem(boardId) {
        const board = this.#repo.getConnectionsBoard(boardId);
        const categoriesByItem = {};
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                categoriesByItem[item.Label] = category;
            });
        });

        return categoriesByItem;
    }
}
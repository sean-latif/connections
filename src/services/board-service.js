class BoardService {    
    static getBoardItems(boardId) {
        const items = [];
        const board = BoardRepository.getConnectionsBoard(boardId);
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                items.push(item);
            });
        });
        return items;
    }

    static evaluateGuess(boardId, items) {
        const board = BoardRepository.getConnectionsBoard(boardId);
        const categoriesByItem = {};
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                categoriesByItem[item.Label] = category;
            });
        });

        const selectedCategoryCounts = {};
        items.forEach(item => {
            selectedCategoryCounts[categoriesByItem[item].CategoryId] = selectedCategoryCounts[categoriesByItem[item].CategoryId] == null ?
                1 :
                selectedCategoryCounts[categoriesByItem[item].CategoryId] + 1;
        });
        const isSuccess = Object.keys(selectedCategoryCounts).length === 1;
        return {
            isSuccess: isSuccess,
            category: isSuccess ? categoriesByItem[items[0]] : null,
            message: Object.keys(selectedCategoryCounts).filter(x => selectedCategoryCounts[x] === 3).length ? 'One away...' : null
        };
    }

    static getCategoriesByItem(boardId) {
        const board = BoardRepository.getConnectionsBoard(boardId);
        const categoriesByItem = {};
        board.Categories.forEach(category => {
            category.Items.forEach((item) => {
                categoriesByItem[item.Label] = category;
            });
        });

        return categoriesByItem;
    }
}